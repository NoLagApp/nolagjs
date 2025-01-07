import { CONSTANT, FConnection, FOnReceive } from "../shared/constants";
import { EConnectionStatus, EEncoding, EEnvironment } from "../shared/enum";
import { ETransportCommand } from "../shared/enum/ETransportCommand";
import { IConnectOptions, IUnifiedWebsocket } from "../shared/interfaces";
import { transportCommands } from "../shared/utils/TransportCommands";
import { NqlTransport } from "../shared/utils/transport";

interface INoLagClient {
  connect(): Promise<NoLagClient>;
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
  private environment: EEnvironment | undefined;
  public deviceTokenId: string | null = null;
  //  check connection
  private defaultCheckConnectionInterval = 100;
  private defaultCheckConnectionTimeout = 10000;
  private checkConnectionInterval: number;
  private checkConnectionTimeout: number;
  private reConnect: boolean = false;

  // callback function used to return the connection result
  private callbackOnOpen: FConnection = () => {};
  private callbackOnReceive: FOnReceive = () => {};
  private callbackOnClose: FConnection = () => {};
  private callbackOnError: FConnection = () => {};

  // status of current socket connection
  public connectionStatus: EConnectionStatus = EConnectionStatus.Idle;
  private buffer: ArrayBuffer[] = [];
  private backpressureSendInterval = 0;
  private senderInterval: any = 0;
  private unifiedWebsocket: (url: string) => IUnifiedWebsocket;

  constructor(
    unifiedWebsocket: (url: string) => IUnifiedWebsocket,
    authToken: string,
    connectOptions?: IConnectOptions,
  ) {
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
    this.unifiedWebsocket = unifiedWebsocket;
    this.startSender();
  }

  startSender() {
    this.senderInterval = setInterval(() => {
      // get the first message in the buffer
      const sendTransport = this.buffer.shift();
      if (!sendTransport) return;
      if (!this.wsInstance) return;
      // send the first message in the buffer
      this.wsInstance.send ? this.wsInstance.send(sendTransport) : undefined;
    }, this.backpressureSendInterval);
  }

  // to elevate the backpressure we increase the send interval
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
  connect(): Promise<NoLagClient> {
    this.connectionStatus = EConnectionStatus.Idle;
    this.initWebsocketConnection();
    return new Promise((resolve, reject) => {
      const checkConnection = setInterval(() => {
        if (this.connectionStatus === EConnectionStatus.Connected) {
          resolve(this);
          clearInterval(checkConnection);
        }
      }, this.checkConnectionInterval);
      setTimeout(() => {
        if (this.connectionStatus === EConnectionStatus.Idle) {
          reject(true);
          clearInterval(checkConnection);
        }
      }, this.checkConnectionTimeout);
    });
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
  initWebsocketConnection() {
    // prevent the re-initiation of a socket connection when the
    // reconnect function calls this method again
    if (this.connectionStatus === EConnectionStatus.Connected) {
      return;
    }

    this.wsInstance = this.unifiedWebsocket(
      `${this.protocol}://${this.host}${this.url}`,
    );

    if (!this.wsInstance) {
      return;
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
  }

  authenticate() {
    this.connectionStatus = EConnectionStatus.Connecting;

    const { authToken } = this;
    const commands = transportCommands().setCommand(
      ETransportCommand.Authenticate,
      authToken,
    );

    if (this.reConnect) {
      commands.setCommand(ETransportCommand.Reconnect);
    }

    this.send(NqlTransport.encode(commands));
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

  private _onOpen(event: any) {
    this.connectionStatus === EConnectionStatus.Idle;
    this.callbackOnOpen(undefined, event);
  }

  private _onReceive(event: any) {
    const data: ArrayBuffer = event ?? new ArrayBuffer(0);
    const decoded = NqlTransport.decode(data);
    if (data.byteLength === 0) {
      return;
    }

    if (
      decoded.getCommand(ETransportCommand.InitConnection) &&
      this.connectionStatus === EConnectionStatus.Idle
    ) {
      this.authenticate();
      return;
    }

    if (
      decoded.getCommand(ETransportCommand.Acknowledge) &&
      this.connectionStatus === EConnectionStatus.Connecting
    ) {
      this.connectionStatus = EConnectionStatus.Connected;
      this.deviceTokenId = decoded.getCommand(
        ETransportCommand.Acknowledge,
      ) as string;
      return;
    }

    if (decoded.getCommand(ETransportCommand.Error)) {
      this.connectionStatus = EConnectionStatus.Disconnected;
      this.callbackOnError(
        decoded.getCommand(ETransportCommand.Alert),
        undefined,
      );
      return;
    }

    this.callbackOnReceive(undefined, {
      topicName: decoded.getCommand(ETransportCommand.Topic) as string,
      presences: decoded.getCommand(ETransportCommand.Presence) as string[],
      identifiers: decoded.getCommand(ETransportCommand.Identifier) as string[],
      data: decoded.payload,
    });
  }

  private _onClose(event: any) {
    this.connectionStatus = EConnectionStatus.Disconnected;
    this.callbackOnClose(event, undefined);
  }

  private _onError(event: any) {
    this.connectionStatus = EConnectionStatus.Disconnected;
    this.callbackOnError(event, undefined);
  }

  public send(transport: ArrayBuffer) {
    this.addToBuffer(transport);
  }

  public heartbeat() {
    if (this.wsInstance) {
      this.send(new ArrayBuffer(0));
    }
  }
}
