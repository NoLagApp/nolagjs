import { FConnection, publishData } from "../shared/constants";
import { IConnectOptions, IErrorMessage, INqlIdentifiers, ITransport, ITunnelOptions, IUnifiedWebsocket } from "../shared/interfaces";
import { ITopic } from "../shared/models/Topic";
export interface ITunnel {
    /**
     * Connect to NoLag
     */
    connect(callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<this>;
    /**
     * Retrieve instantiated topic
     * @param topicName Topic name registered in NoLag Portal
     * @param callbackFn
     * @return Topic | undefined
     */
    getTopic(topicName: string, callbackFn?: (error: Error | null, topic: ITopic | null) => void): ITopic;
    /**
     * Delete instantiated topic
     * @param topicName Topic name regisrered in NoLag Portal
     * @param callbackFn
     * @return boolean
     */
    unsubscribe(topicName: string, callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<boolean>;
    /**
     * Set a new topic that is attached to tunnel
     * @param topicName Topic name regisrered in NoLag Portal
     * @param identifiers Set if reverse query identifiers which the topic will listen two
     * @param callbackFn
     */
    subscribe(topicName: string, identifiers?: INqlIdentifiers, callbackFn?: (error: Error | null, topic: ITransport | null) => void): ITopic;
    /**
     * Publish data before setting a Topic
     * @param topicName string - Topic name registered in NoLag Portal
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
    onDisconnect(callbackFn: ((errorMessage: IErrorMessage) => void) | undefined): void;
    /**
     * Triggered when there is a re-connect attempt
     * @param callbackFn
     */
    onReconnect(callbackFn: ((data: ITransport) => void) | undefined): void;
    /**
     * Triggered when any errors are sent from the Message Broker
     * @param callbackFn
     */
    onErrors(callbackFn: ((errorMessage: IErrorMessage) => void) | undefined): void;
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
export declare class Tunnel implements ITunnel {
    private noLagClient;
    private connectOptions?;
    private authToken;
    private topics;
    private heartbeatTimer;
    private defaultCheckConnectionInterval;
    private checkConnectionInterval;
    private heartBeatInterval;
    private visibilityState;
    private callbackOnReceive;
    private callbackOnDisconnect;
    private callbackOnReconnect;
    private callbackOnReceivedError;
    private acknowledgeQueueManager;
    private connectionOptions?;
    constructor(unifiedWebsocket: (url: string) => IUnifiedWebsocket, authToken: string, options?: ITunnelOptions, connectOptions?: IConnectOptions);
    get deviceTokenId(): string | null;
    private startHeartbeat;
    private stopHeartbeat;
    initiate(reconnect?: boolean, callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<this>;
    connect(callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<this>;
    private onVisibilityChange;
    private onReceiveMessage;
    private reconnect;
    private canReconnect;
    private doReconnect;
    private onClose;
    private onError;
    onReceive(callback: (data: ITransport) => void): void;
    disconnect(): void;
    onDisconnect(callback: FConnection): void;
    onReconnect(callback: FConnection): void;
    onErrors(callback: FConnection): void;
    getTopic(topicName: string, callbackFn?: (error: Error | null, topic: ITopic | null) => void): ITopic;
    unsubscribe(topicName: string, callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<boolean>;
    subscribe(topicName: string, identifiers?: INqlIdentifiers, callbackFn?: (error: Error | null, topic: ITransport | null) => void): ITopic;
    publish(topicName: string, data: publishData, identifiers?: string[]): void;
    get status(): import("../shared/enum").EConnectionStatus;
}
//# sourceMappingURL=index.d.ts.map