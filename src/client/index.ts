import {
  IConnectOptions,
  IErrorMessage,
  INqlIdentifiers,
  IResponse,
  ITunnelOptions,
} from "../shared/interfaces";
import { dataType, FConnection, TData } from "../shared/constants";

import { ITopic, Topic } from "./topic";

import { NoLagClient } from "./NoLagClient";
import { EVisibilityState } from "../shared/enum";
import { generateTransport } from "../shared/utils/transport";
export * from "../shared/utils/Encodings";

export interface ITunnel {
  /**
   * Retrieve instanciated topic
   * @param string topicName - Topic name regisrered in NoLag Portal
   * @return Topic | undefined
   */
  getTopic(topicName: string): ITopic | undefined;
  /**
   * Delete instanciated topic
   * @param string topicName - Topic name regisrered in NoLag Portal
   * @return boolean
   */
  unsubscribe(topicName: string): boolean;
  /**
   * Set a new topic that is attached to tunnel
   * @param string topicName - Topic name regisrered in NoLag Portal
   * @param string[] identifiers - Set if reverse query identifiers which the topic will listen two
   */
  subscribe(
    topicName: string,
    identifiers?: INqlIdentifiers,
  ): ITopic | undefined;
  /**
   * Publish data before setting a Topic
   * @param string topicName - Topic name regisrered in NoLag Portal
   * @param ArrayBuffer data - Data to send to the Topic
   * @param string[] identifiers - Set if reverse query identifiers which the topic will listen two
   */
  publish(topicName: string, data: ArrayBuffer, identifiers?: string[]): void;
  onReceive(callbackFn: ((data: IResponse) => void) | undefined): void;
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
  onReconnect(callbackFn: ((data: IResponse) => void) | undefined): void;
  /**
   * Triggered when any errors are sent from the Message Broker
   * @param callbackFn
   */
  onErrors(
    callbackFn: ((errorMessage: IErrorMessage) => void) | undefined,
  ): void;
}

/**
 * To get access NoLag message broker you need access to a Tunnel
 * This class initiates a Tunnel connection and gives you the ability to subscribe to a
 * Topic instance and publish to a topic
 */
export class Tunnel implements ITunnel {
  // the WS connection to NoLag
  private noLagClient: NoLagClient | undefined;
  private connectOptions?: IConnectOptions;

  private authToken: string;

  // topics
  private topics: dataType<ITopic> = {};

  private heartbeatTimer: any;

  private defaultCheckConnectionInterval = 10000;
  private checkConnectionInterval: number;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private heartBeatInterval: number = 20000;
  private visibilityState: string = EVisibilityState.Visible;

  private callbackOnReceive: ((data: IResponse) => void) | undefined;
  private callbackOnDisconnect: FConnection = () => {};
  private callbackOnReconnect: FConnection = () => {};
  private callbackOnReceivedError: FConnection = () => {};

  constructor(
    authToken: string,
    options?: ITunnelOptions,
    connectOptions?: IConnectOptions,
  ) {
    this.checkConnectionInterval =
      connectOptions?.checkConnectionInterval ??
      this.defaultCheckConnectionInterval;
    this.connectOptions = connectOptions ?? undefined;
    this.authToken = authToken;
    this.noLagClient = new NoLagClient(this.authToken, this.connectOptions);
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
      if (this.noLagClient) {
        this.noLagClient.heartbeat();
      }
    }, this.heartBeatInterval);
  }

  private stopHeartbeat() {
    clearInterval(this.heartbeatTimer);
  }

  private reSubscribe(): void {
    Object.values(this.topics).map((topic) => {
      topic.reSubscribe();
    });
  }

  // connect to NoLag with Tunnel credentials
  public async initiate() {
    if (this.noLagClient) {
      await this.noLagClient.connect();
      this.resetConnectAttempts();
      this.startHeartbeat();
      this.reSubscribe();
    }
    return this;
  }

  private resetConnectAttempts() {
    this.reconnectAttempts = 0;
  }

  private onVisibilityChange() {
    if (document.addEventListener) {
      document.addEventListener("visibilitychange", async () => {
        this.visibilityState = document.visibilityState;
        switch (this.visibilityState) {
          case EVisibilityState.Hidden:
            this.noLagClient?.disconnect();
            break;
          case EVisibilityState.Visible:
            await this.initiate();
            break;
        }
      });
    }
  }

  private onReceiveMessage() {
    if (this.noLagClient) {
      this.noLagClient?.onReceiveMessage((err: any, data: IResponse) => {
        const { topicName } = data;
        if (topicName && this.topics[topicName]) {
          this.topics[topicName]?._onReceiveMessage(data);
        }
        if (typeof this.callbackOnReceive === "function") {
          this.callbackOnReceive(data);
        }
      });
    }
  }

  private reconnect(): void {
    this.stopHeartbeat();
    setTimeout(async () => {
      this.reconnectAttempts++;
      await this.initiate();
      if (typeof this.callbackOnReconnect === "function") {
        this.callbackOnReconnect();
      }
    }, this.checkConnectionInterval);
  }

  private canReconnect(): boolean {
    if (
      this.reconnectAttempts === this.maxReconnectAttempts ||
      this.visibilityState === EVisibilityState.Hidden
    ) {
      return false;
    }
    return true;
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
    if (this.noLagClient) {
      this.noLagClient.onClose((err: any, data: IResponse) => {
        this.doReconnect();
        if (typeof this.callbackOnReceivedError === "function") {
          this.callbackOnReceivedError(err);
        }
      });
    }
  }

  private onError() {
    if (this.noLagClient) {
      this.noLagClient.onError((err: IErrorMessage, data: IResponse) => {
        if (typeof this.callbackOnReceivedError === "function") {
          this.callbackOnReceivedError(err);
        }
      });
    }
  }

  public onReceive(callback: (data: IResponse) => void): void {
    this.callbackOnReceive = callback;
  }

  public disconnect(): void {
    this.reconnectAttempts = 5;
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

  public getTopic(topicName: string): ITopic | undefined {
    return this.topics[topicName];
  }

  public unsubscribe(topicName: string): boolean {
    if (this.topics[topicName]) {
      this.topics[topicName]?.unsubscribe();
      return true;
    }
    return false;
  }

  public subscribe(
    topicName: string,
    identifiers: INqlIdentifiers = {},
  ): ITopic | undefined {
    if (this.noLagClient) {
      if (this.topics[topicName]) {
        const topic = this.topics[topicName];
        topic?.reSubscribe();
        return topic;
      } else {
        this.topics[topicName] = new Topic(
          this.noLagClient,
          topicName,
          identifiers,
        );

        return this.topics[topicName];
      }
    }
  }

  public publish(
    topicName: string,
    data: ArrayBuffer,
    identifiers: string[] = [],
  ): void {
    if (this.noLagClient && this.noLagClient.send) {
      this.stopHeartbeat();
      const transport = generateTransport(data, topicName, identifiers);
      this.noLagClient.send(transport);
      this.startHeartbeat();
    }
  }

  public get status() {
    return this.noLagClient?.status ?? null;
  }
}

export const WebSocketClient = async (
  authToken: string,
  options?: ITunnelOptions,
  connectOptions?: IConnectOptions,
): Promise<ITunnel> => {
  const instance = new Tunnel(authToken, options, connectOptions);
  return instance.initiate();
};
