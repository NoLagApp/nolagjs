import { IConnectOptions, IErrorMessage, INqlIdentifiers, IResponse, ITunnelOptions } from "../shared/interfaces";
import { FConnection } from "../shared/constants";
import { ITopic } from "./topic";
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
    subscribe(topicName: string, identifiers?: INqlIdentifiers): ITopic | undefined;
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
    onDisconnect(callbackFn: ((errorMessage: IErrorMessage) => void) | undefined): void;
    /**
     * Triggered when there is a reconnect attempt
     * @param callbackFn
     */
    onReconnect(callbackFn: ((data: IResponse) => void) | undefined): void;
    /**
     * Triggered when any errors are sent from the Message Broker
     * @param callbackFn
     */
    onErrors(callbackFn: ((errorMessage: IErrorMessage) => void) | undefined): void;
}
/**
 * To get access NoLag message broker you need access to a Tunnel
 * This class initiates a Tunnel connection and gives you the ability to subscribe to a
 * Topic instance and publish to a topic
 */
export declare class Tunnel implements ITunnel {
    private noLagClient;
    private connectOptions?;
    private authToken;
    private topics;
    private heartbeatTimer;
    private defaultCheckConnectionInterval;
    private checkConnectionInterval;
    private reconnectAttempts;
    private maxReconnectAttempts;
    private heartBeatInterval;
    private visibilityState;
    private callbackOnReceive;
    private callbackOnDisconnect;
    private callbackOnReconnect;
    private callbackOnReceivedError;
    constructor(authToken: string, options?: ITunnelOptions, connectOptions?: IConnectOptions);
    get deviceTokenId(): string | null | undefined;
    private startHeartbeat;
    private stopHeartbeat;
    private reSubscribe;
    initiate(): Promise<this>;
    private resetConnectAttempts;
    private onVisibilityChange;
    private onReceiveMessage;
    private reconnect;
    private canReconnect;
    private doReconnect;
    private onClose;
    private onError;
    onReceive(callback: (data: IResponse) => void): void;
    disconnect(): void;
    onDisconnect(callback: FConnection): void;
    onReconnect(callback: FConnection): void;
    onErrors(callback: FConnection): void;
    getTopic(topicName: string): ITopic | undefined;
    unsubscribe(topicName: string): boolean;
    subscribe(topicName: string, identifiers?: INqlIdentifiers): ITopic | undefined;
    publish(topicName: string, data: ArrayBuffer, identifiers?: string[]): void;
    get status(): string | null;
}
export declare const WebSocketClient: (authToken: string, options?: ITunnelOptions, connectOptions?: IConnectOptions) => Promise<ITunnel>;
