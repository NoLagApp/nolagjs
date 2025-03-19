import { dataType, FConnection, publishData } from "../shared/constants";
import {
  IConnectOptions,
  IErrorMessage,
  INqlIdentifiers,
  ITransport,
  ITunnelOptions,
  IUnifiedWebsocket,
} from "../shared/interfaces";

import { ITopic, Topic } from "../shared/models/Topic";

import { ESendAction, EVisibilityState } from "../shared/enum";
import { ETransportCommand } from "../shared/enum/ETransportCommand";
import { transportCommands } from "../shared/utils/TransportCommands";
import { NqlTransport } from "../shared/utils";
import { NoLagClient } from "./NoLagClient";
import { AcknowledgeQueueManager } from "../shared/utils/AcknowledgeQueue/AcknowledgeQueueManager";

export interface ITunnel {
  /**
   * Connect to NoLag
   */
  connect(callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<this>;
  /**
   * Retrieve instanciated topic
   * @param topicName Topic name regisrered in NoLag Portal
   * @param callbackFn
   * @return Topic | undefined
   */
  getTopic(
    topicName: string,
    callbackFn?: (error: Error | null, topic: ITopic | null) => void,
  ): ITopic;

  /**
   * Delete instantiated topic
   * @param topicName Topic name regisrered in NoLag Portal
   * @param callbackFn
   * @return boolean
   */
  unsubscribe(
    topicName: string,
    callbackFn?: (error: Error | null, data: ITransport | null) => void,
  ): Promise<boolean>;

  /**
   * Set a new topic that is attached to tunnel
   * @param topicName Topic name regisrered in NoLag Portal
   * @param identifiers Set if reverse query identifiers which the topic will listen two
   * @param callbackFn
   */
  subscribe(
    topicName: string,
    identifiers?: INqlIdentifiers,
    callbackFn?: (error: Error | null, topic: ITransport | null) => void,
  ): Promise<ITopic>;

  /**
   * Publish data before setting a Topic
   * @param topicName string - Topic name regisrered in NoLag Portal
   * @param data ArrayBuffer - Data to send to the Topic
   * @param identifiers string[] - Set if reverse query identifiers which the topic will listen two
   */
  publish(topicName: string, data: publishData, identifiers?: string[]): void;

  onReceive(callbackFn: ((data: ITransport) => void) | undefined): void;

  /**
   * Disconnect from NoLag
   */
  disconnect(): void;

  /**
   * Triggered when device disconnects form Message Broker
   * @param callbackFn
   */
  onDisconnect(
    callbackFn: ((errorMessage: IErrorMessage) => void) | undefined,
  ): void;

  /**
   * Triggered when there is a reconnect attempt
   * @param callbackFn
   */
  onReconnect(callbackFn: ((data: ITransport) => void) | undefined): void;

  /**
   * Triggered when any errors are sent from the Message Broker
   * @param callbackFn
   */
  onErrors(
    callbackFn: ((errorMessage: IErrorMessage) => void) | undefined,
  ): void;

  /**
   * Unique device id
   */
  deviceTokenId: string | null | undefined;
}

/**
 * To get access NoLag message broker you need access to a Tunnel
 * This class initiates a Tunnel connection and gives you the ability to subscribe to a
 * Topic instance and publish to a topic
 */
export class Tunnel implements ITunnel {
  // the WS connection to NoLag
  private noLagClient: NoLagClient;
  private connectOptions?: IConnectOptions;

  private authToken: string;

  // topics
  private topics: dataType<ITopic> = {};

  private heartbeatTimer: any;

  private defaultCheckConnectionInterval = 10000;
  private checkConnectionInterval: number;
  private heartBeatInterval = 20000;
  private visibilityState: string = EVisibilityState.Visible;

  private callbackOnReceive: ((data: ITransport) => void) | undefined;
  private callbackOnDisconnect: FConnection = () => {
    //
  };
  private callbackOnReconnect: FConnection = () => {
    //
  };
  private callbackOnReceivedError: FConnection = () => {
    //
  };
  private acknowledgeQueueManager = new AcknowledgeQueueManager();
  private connectionOptions?: ITunnelOptions;

  constructor(
    unifiedWebsocket: (url: string) => IUnifiedWebsocket,
    authToken: string,
    options?: ITunnelOptions,
    connectOptions?: IConnectOptions,
  ) {
    this.connectionOptions = options;
    this.checkConnectionInterval =
      connectOptions?.checkConnectionInterval ??
      this.defaultCheckConnectionInterval;
    this.connectOptions = { ...connectOptions, ...options };
    this.authToken = authToken;

    // initiate NoLag client connection
    this.noLagClient = new NoLagClient(
      unifiedWebsocket,
      this.authToken,
      this.acknowledgeQueueManager,
      this.connectOptions,
    );

    this.onClose();
    this.onError();
    this.onReceiveMessage();

    // disconnect from NoLag when you move away from the screen
    if (options?.disconnectOnNoVisibility) {
      this.onVisibilityChange();
    }
  }

  public get deviceTokenId() {
    return this.noLagClient?.deviceTokenId;
  }

  private startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      this.noLagClient.heartbeat();
    }, this.heartBeatInterval);
  }

  private stopHeartbeat() {
    clearInterval(this.heartbeatTimer);
  }

  // connect to NoLag with Tunnel credentials
  public async initiate(reconnect?: boolean, callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<this> {
    this.noLagClient.setReConnect(reconnect);
    await this.noLagClient.connect(callbackFn);
    console.log("boom");
    this.noLagClient.setReConnect(false);
    this.startHeartbeat();
    return this;
  }

  connect(callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<this> {
    return this.initiate(false, callbackFn);
  }

  private onVisibilityChange() {
    if (document.addEventListener) {
      document.addEventListener("visibilitychange", async () => {
        this.visibilityState = document.visibilityState;
        switch (this.visibilityState) {
          case EVisibilityState.Hidden:
            this.noLagClient?.disconnect();
            this.stopHeartbeat();
            break;
          case EVisibilityState.Visible:
            await this.initiate(true);
            break;
        }
      });
    }
  }

  private onReceiveMessage() {
    const tunnelInstance: Tunnel = this;
    this.noLagClient?.onReceiveMessage((err: any, data: ITransport) => {
      const { topicName, identifiers } = data;
      if (this.noLagClient && !this.topics[topicName]) {
        this.topics[topicName] = new Topic(
          tunnelInstance,
          this.noLagClient,
          topicName,
          {
            OR: identifiers,
          },
          this.acknowledgeQueueManager,
        );
      }
      if (topicName && this.topics[topicName]) {
        this.topics[topicName]?._onReceiveMessage(data);
      }
      if (typeof this.callbackOnReceive === "function") {
        this.callbackOnReceive(data);
      }
    });
  }

  private reconnect(): void {
    this.stopHeartbeat();
    setTimeout(async () => {
      // this.reconnectAttempts++;
      await this.initiate(true);
      if (typeof this.callbackOnReconnect === "function") {
        this.callbackOnReconnect();
      }
    }, this.checkConnectionInterval);
  }

  private canReconnect(): boolean {
    return this.visibilityState !== EVisibilityState.Hidden;
  }

  private doReconnect(): void {
    if (this.canReconnect()) {
      this.reconnect();
    } else {
      this.stopHeartbeat();
      if (typeof this.callbackOnDisconnect === "function") {
        this.callbackOnDisconnect("connection retry timeout.");
      }
    }
  }

  private onClose() {
    this.noLagClient.onClose((err: any, data: ITransport) => {
      this.doReconnect();
      if (typeof this.callbackOnReceivedError === "function") {
        this.callbackOnReceivedError(err);
      }
    });
  }

  private onError() {
    this.noLagClient.onError((err: IErrorMessage, data: ITransport) => {
      if (typeof this.callbackOnReceivedError === "function") {
        this.callbackOnReceivedError(err);
      }
    });
  }

  public onReceive(callback: (data: ITransport) => void): void {
    this.callbackOnReceive = callback;
  }

  public disconnect(): void {
    this.visibilityState = EVisibilityState.Hidden;
    this.noLagClient?.disconnect();
  }

  public onDisconnect(callback: FConnection): void {
    this.callbackOnDisconnect = callback;
  }

  public onReconnect(callback: FConnection): void {
    this.callbackOnReconnect = callback;
  }

  public onErrors(callback: FConnection): void {
    this.callbackOnReceivedError = callback;
  }

  public getTopic(
    topicName: string,
    callbackFn?: (error: Error | null, topic: ITopic | null) => void,
  ): ITopic {
    // check if topic is already instantiated
    // if not, subscribe
    if (!this.topics[topicName]) {
      const topic = new Topic(
        this,
        this.noLagClient,
        topicName,
        {},
        this.acknowledgeQueueManager,
      );
      topic.subscribe((error, data) => {
        if (callbackFn) {
          callbackFn(error, topic);
        }
      });
      this.topics[topicName] = topic;
    }

    return this.topics[topicName];
  }

  public async unsubscribe(
    topicName: string,
    callbackFn?: (error: Error | null, data: ITransport | null) => void,
  ): Promise<boolean> {
    if (this.topics[topicName]) {
      this.topics[topicName]?.unsubscribe(callbackFn);
      return true;
    }
    return false;
  }

  public async subscribe(
    topicName: string,
    identifiers: INqlIdentifiers = {},
    callbackFn?: (error: Error | null, topic: ITransport | null) => void,
  ): Promise<ITopic> {
    if (!this.noLagClient) {
      throw new Error(
        "NoLag client is not set. Please connect to NoLag before attempting to subscribe.",
      );
    }
    if (this.topics[topicName]) {
      const topic = this.topics[topicName];
      if (identifiers?.OR?.length && identifiers?.OR?.length !== 0)
        await topic.addIdentifiers(identifiers);
      return topic;
    } else {
      const topic = (this.topics[topicName] = new Topic(
        this,
        this.noLagClient,
        topicName,
        identifiers,
        this.acknowledgeQueueManager,
      ));

      await topic.subscribe(callbackFn);

      return this.topics[topicName];
    }
  }

  public publish(
    topicName: string,
    data: publishData,
    identifiers: string[] = [],
  ): void {
    if (this.noLagClient && this.noLagClient.send) {
      this.stopHeartbeat();
      const commands = transportCommands().setCommand(
        ETransportCommand.Topic,
        topicName,
      );

      if (identifiers?.length > 0)
        commands.setCommand(ETransportCommand.Identifier, identifiers);

      const encodedBuffer = NqlTransport.encode(commands, data);
      this.noLagClient.send(ESendAction.TunnelPublish, encodedBuffer);
      this.startHeartbeat();
    }
  }

  public get status() {
    return this.noLagClient?.connectionStatus ?? null;
  }
}
