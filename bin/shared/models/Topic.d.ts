import { NoLagClient } from "../../client/NoLagClient";
import { INqlIdentifiers, ITransport } from "../interfaces";
import { Tunnel } from "../../client";
import { AcknowledgeQueueManager } from "../utils/AcknowledgeQueue/AcknowledgeQueueManager";
import { publishData } from "../constants";
export interface ITopic {
    subscribe(callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<ITopic>;
    /**
     * Add NQL identifers to the Topic
     * @param identifiers
     * @param callbackFn
     */
    addIdentifiers(identifiers: INqlIdentifiers, callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<ITopic>;
    /**
     * Remove saved NQL identifiers
     * @param identifiers
     * @param callbackFn
     */
    removeIdentifiers(identifiers: string[], callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<ITopic>;
    /**
     * Unsubscribe from current Topic. You will not onReceive messages from this
     * Topic in the future
     */
    unsubscribe(callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<boolean>;
    /**
     * Fire callback function after any data send to the Topic from the Message Broker with matching NQL identifiers
     * is onReceive
     * @param callbackFn
     */
    onReceive(callbackFn: ((data: ITransport) => void) | undefined): Topic;
    /**
     * Publish topic data with optional attached identifiers
     * @param data Data being sent is an ArrayBuffer
     * @param identifiers List of identifiers used to send targeted messages
     * @returns
     */
    publish(data: publishData, identifiers?: string[]): Topic;
    /**
     * PRIVATE Inject messages into the Topic instance
     * @param data
     */
    _onReceiveMessage(data: ITransport): Topic;
    /**
     * Set presence data on this topic. Presence data could be anything that identifies this device.
     * Updated list of shared data is shared with all devices subscribed to the same Topic and Identifiers when a devices
     * connect and disconnects.
     * @param presence
     * @param callbackFn
     * @returns
     */
    setPresence(presence: string, callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<ITopic>;
}
export interface ICallbackQueue {
    topicName: string;
    identifiers: string[];
    callbackFn: (error: Error, data: ITransport) => void;
}
export declare class Topic implements ITopic {
    private connection;
    private readonly topicName;
    private onReceiveCallback;
    private identifiers;
    private presence;
    private tunnel;
    private acknowledgeQueueManager;
    constructor(tunnel: Tunnel, connection: NoLagClient, topicName: string, identifiers: INqlIdentifiers, acknowledgeQueueManager: AcknowledgeQueueManager);
    private saveIdentifiers;
    private deleteSavedIdentifiers;
    private _subscribeAction;
    subscribe(callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<ITopic>;
    setPresence(presence: string, callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<ITopic>;
    setConnection(connection: NoLagClient): Topic;
    _onReceiveMessage(data: ITransport): Topic;
    onReceive(callbackFn: ((data: ITransport) => void) | undefined): Topic;
    addIdentifiers(identifiersList: INqlIdentifiers, callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<ITopic>;
    removeIdentifiers(identifiers: string[], callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<ITopic>;
    unsubscribe(callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<boolean>;
    publish(data: publishData, identifiers?: string[]): Topic;
    private send;
}
//# sourceMappingURL=Topic.d.ts.map