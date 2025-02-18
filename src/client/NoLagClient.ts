import { CONSTANT, FConnection, FOnReceive } from "../shared/constants";
import { EConnectionStatus, ESendAction } from "../shared/enum";
import { ETransportCommand } from "../shared/enum/ETransportCommand";
import {
  IConnectOptions,
  ITransport,
  IUnifiedWebsocket,
} from "../shared/interfaces";
import { transportCommands } from "../shared/utils/TransportCommands";
import { IDecode, NqlTransport } from "../shared/utils";
import { AcknowledgeQueueManager } from "../shared/utils/AcknowledgeQueue/AcknowledgeQueueManager";
import { AcknowledgeQueueIdentifier } from "../shared/utils/AcknowledgeQueue/AcknowledgeQueueIdentifier";

interface INoLagClient {
  connect(): Promise<void>;
  setReConnect(): void;
  onOpen(callback: FConnection): void;
  onReceiveMessage(callback: FConnection): void;
  onClose(callback: FConnection): void;
  onError(callback: FConnection): void;
}

export class NoLagClient implements INoLagClient {
  private host: string;
  private authToken: string;
  public wsInstance: IUnifiedWebsocket | undefined;
  private protocol: string;
  private url: string;
  private deviceConnectionId: string | undefined = undefined;
  public deviceTokenId: string | null = null;
  //  check connection
  private defaultCheckConnectionInterval = 100;
  private defaultCheckConnectionTimeout = 10000;
  private checkConnectionInterval: number;
  private checkConnectionTimeout: number;
  private reConnect = false;
  private debug = false;

  // callback function used to return the connection result
  private callbackOnOpen: FConnection = () => {
    //
  };
  private callbackOnReceive: FOnReceive = () => {
    //
  };
  private callbackOnClose: FConnection = () => {
    //
  };
  private callbackOnError: FConnection = () => {
    //
  };

  // status of current socket connection
  public connectionStatus: EConnectionStatus = EConnectionStatus.Idle;
  private buffer: ArrayBuffer[] = [];
  private backpressureSendInterval = 0;
  private senderInterval: any = 0;
  private unifiedWebsocket: (url: string) => IUnifiedWebsocket;
  private acknowledgeQueueManager: AcknowledgeQueueManager;
  private bufferOnDisconnect = false;

  constructor(
    unifiedWebsocket: (url: string) => IUnifiedWebsocket,
    authToken: string,
    acknowledgeQueueManager: AcknowledgeQueueManager,
    connectOptions?: IConnectOptions,
  ) {
    this.acknowledgeQueueManager = acknowledgeQueueManager;
    this.authToken = authToken ?? "";
    this.host = connectOptions?.host ?? CONSTANT.DefaultWsHost;
    this.protocol = connectOptions?.protocol ?? CONSTANT.DefaultWsProtocol;
    this.url = CONSTANT.DefaultWsUrl;
    this.checkConnectionInterval =
      connectOptions?.checkConnectionInterval ??
      this.defaultCheckConnectionInterval;
    this.checkConnectionTimeout =
      connectOptions?.checkConnectionTimeout ??
      this.defaultCheckConnectionTimeout;
    this.bufferOnDisconnect =
      connectOptions?.bufferOnDisconnect ?? this.bufferOnDisconnect;
    this.debug = connectOptions?.debug ?? this.debug;

    this.unifiedWebsocket = unifiedWebsocket;
    this.startSender();
  }

  startSender() {
    this.senderInterval = setInterval(() => {
      if (
        !this.bufferOnDisconnect &&
        this.connectionStatus === EConnectionStatus.Disconnected
      )
        return;
      // get the first message in the buffer
      const sendTransport = this.buffer.shift();
      if (!sendTransport) return;
      if (!this.wsInstance) return;
      // send the first message in the buffer
      this.wsInstance.send ? this.wsInstance.send(sendTransport) : undefined;
    }, this.backpressureSendInterval);
  }

  // to alleviate the backpressure, we increase the send interval
  slowDownSender(backpressureInterval: number) {
    clearInterval(this.senderInterval);
    this.backpressureSendInterval = backpressureInterval;
    this.startSender();
  }

  addToBuffer(buffer: ArrayBuffer) {
    this.buffer.push(buffer);
  }

  setReConnect(reConnect?: boolean) {
    if (reConnect) this.reConnect = reConnect;
  }

  /**
   * Promise - Setup the connection process, code will detect if the code is being used in the front-end or backend
   * @param callbackMain used as a event trigger
   * @returns NoLagClient instance
   */
  async connect(): Promise<void> {
    this.connectionStatus = EConnectionStatus.Idle;
    await this.initWebsocketConnection();
    await this.authenticate();
    // return new Promise((resolve, reject) => {
    //   const checkConnection = setInterval(() => {
    //     if (this.connectionStatus === EConnectionStatus.Connected) {
    //       resolve(this);
    //       clearInterval(checkConnection);
    //     }
    //   }, this.checkConnectionInterval);
    //   setTimeout(() => {
    //     if (this.connectionStatus === EConnectionStatus.Idle) {
    //       reject(true);
    //       clearInterval(checkConnection);
    //     }
    //   }, this.checkConnectionTimeout);
    // });
  }

  disconnect() {
    if (this.wsInstance && this.wsInstance.close) {
      this.wsInstance.close();
      this.wsInstance = undefined;
    }
  }

  /**
   * Initiate browser WebSocket instance and set it to
   * wsInstance
   */
  async initWebsocketConnection(): Promise<boolean> {
    // prevent the re-initiation of a socket connection when the
    // reconnect function calls this method again
    if (this.connectionStatus === EConnectionStatus.Connected) {
      return true;
    }

    this.wsInstance = this.unifiedWebsocket(
      `${this.protocol}://${this.host}${this.url}`,
    );

    if (!this.wsInstance) {
      return true;
    }

    this.wsInstance.onOpen = (event: any) => {
      this._onOpen(event);
    };

    this.wsInstance.onMessage = (event: any) => {
      this._onReceive(event);
    };

    this.wsInstance.onClose = (event: any) => {
      this._onClose(event);
    };

    this.wsInstance.onError = (event: any) => {
      this._onError(event);
    };

    await this.acknowledgeQueueManager.addToSentQueue(
      new AcknowledgeQueueIdentifier({
        initiate: EConnectionStatus.Initiate,
      }),
    );

    return true;
  }

  async authenticate() {
    this.connectionStatus = EConnectionStatus.Connecting;

    const { authToken } = this;
    const commands = transportCommands().setCommand(
      ETransportCommand.Authenticate,
      authToken,
    );

    if (this.reConnect) {
      commands.setCommand(ETransportCommand.Reconnect);
    }

    this.send(ESendAction.TunnelAuthenticate, NqlTransport.encode(commands));

    await this.acknowledgeQueueManager.addToSentQueue(
      new AcknowledgeQueueIdentifier({
        authentication: EConnectionStatus.Authentication,
      }),
    );
  }

  public onOpen(callback: FConnection) {
    this.callbackOnOpen = callback;
  }

  public onReceiveMessage(callback: FConnection) {
    this.callbackOnReceive = callback;
  }

  public onClose(callback: FConnection) {
    this.callbackOnClose = callback;
  }

  public onError(callback: FConnection) {
    this.callbackOnError = callback;
  }

  private ackCommand(decoded: IDecode): boolean {
    if (
      // we receive a command saying we have successfully connected to the message broker
      // we can now send the authentication request
      decoded.getCommand(ETransportCommand.InitConnection) &&
      this.connectionStatus === EConnectionStatus.Idle
    ) {
      this.acknowledgeQueueManager.addToReceivedQueue(
        new AcknowledgeQueueIdentifier({
          initiate: EConnectionStatus.Initiate,
        }),
        null,
        {} as ITransport,
      );
      if (this.debug) {
        console.log(`${ESendAction.AcknowledgeConnected}:`, decoded);
      }
      return true;
    } else if (
      // response to authentication request
      decoded.getCommand(ETransportCommand.Acknowledge) &&
      this.connectionStatus === EConnectionStatus.Connecting
    ) {
      // TODO: message broker should s
      this.connectionStatus = EConnectionStatus.Connected;
      this.deviceTokenId = decoded.getCommand(
        ETransportCommand.Acknowledge,
      ) as string;

      let error: Error | null = null;

      if (decoded.getCommand(ETransportCommand.Error)) {
        error = new Error(
          decoded.getCommand(ETransportCommand.Error) as string,
        );
      }

      this.acknowledgeQueueManager.addToReceivedQueue(
        new AcknowledgeQueueIdentifier({
          authentication: EConnectionStatus.Authentication,
        }),
        error,
        {} as ITransport,
      );
      if (this.debug) {
        console.log(`${ESendAction.AcknowledgeAuthenticated}:`, decoded);
      }
      return true;
    } else if (decoded.getCommand(ETransportCommand.Acknowledge)) {
      const ackIdentifier = new AcknowledgeQueueIdentifier({
        topicName: decoded.getCommand(ETransportCommand.Topic) as string,
        identifiers: decoded.getCommand(
          ETransportCommand.Identifier,
        ) as string[],
        presence: decoded.getCommand(ETransportCommand.Presence) as string,
      })
      this.acknowledgeQueueManager.addToReceivedQueue(
        ackIdentifier,
        null,
        {} as ITransport,
      );
      if (this.debug) {
        console.log(`${ESendAction.AcknowledgeGeneral}:`, ackIdentifier);
        console.log(`${ESendAction.AcknowledgeGeneral} generated KEY:`, ackIdentifier.generateKey());
      }
      return true;
    } else if (decoded.getCommand(ETransportCommand.Error)) {
      const ackErrorIdentifier = new AcknowledgeQueueIdentifier({
        topicName: decoded.getCommand(ETransportCommand.Topic) as string,
        identifiers: decoded.getCommand(
          ETransportCommand.Identifier,
        ) as string[],
        presence: decoded.getCommand(ETransportCommand.Presence) as string,
      })
      this.acknowledgeQueueManager.addToReceivedQueue(ackErrorIdentifier,
        null,
        {} as ITransport,
      );
      if (this.debug) {
        console.log(`${ESendAction.AcknowledgeError}:`, ackErrorIdentifier);
      }
      return true;
    }

    return false;
  }

  private _onOpen(event: any) {
    this.connectionStatus === EConnectionStatus.Idle;
    this.callbackOnOpen(undefined, event);
    if (this.debug) {
      console.log(`${ESendAction.OnOpen}:`, event);
    }
  }

  private _onReceive(event: any) {
    const data: ArrayBuffer = event ?? new ArrayBuffer(0);
    const decoded = NqlTransport.decode(data);
    if (data.byteLength === 0) {
      return;
    }

    // check to see if there were any ACK or ERROR messages received
    if (this.ackCommand(decoded)) return;

    const identifier = decoded.getCommand(ETransportCommand.Identifier);
    const presences = decoded.getCommand(ETransportCommand.Presence);

    const transportResponse = {
      topicName: decoded.getCommand(ETransportCommand.Topic) as string,
      presences: presences === true ? [] : (presences as string[]),
      identifiers: identifier === true ? [] : (identifier as string[]),
      data: decoded.payload,
    };
    this.callbackOnReceive(undefined, transportResponse);
    if (this.debug) {
      console.log(`${ESendAction.OnReceive}:`, transportResponse);
    }
  }

  private _onClose(event: any) {
    this.connectionStatus = EConnectionStatus.Disconnected;
    this.callbackOnClose(event, undefined);
    if (this.debug) {
      console.log(`${ESendAction.OnClose}:`, event);
    }
  }

  private _onError(event: any) {
    this.connectionStatus = EConnectionStatus.Disconnected;
    this.callbackOnError(event, undefined);
    if (this.debug) {
      console.log(`${ESendAction.OnError}:`, event);
    }
  }

  public send(sendAction: ESendAction, transport: ArrayBuffer) {
    this.addToBuffer(transport);
    if (this.debug) {
      console.log(`${sendAction}:`, NqlTransport.decode(transport));
    }
  }

  public heartbeat() {
    if (this.wsInstance) {
      this.send(ESendAction.TunnelHeartbeat, new ArrayBuffer(0));
    }
  }
}
