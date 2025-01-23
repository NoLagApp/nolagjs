import { NoLagClient } from "../../client/NoLagClient";
import { INqlIdentifiers, ITransport } from "../interfaces";
import { ITunnel } from "../../client";
export interface ITopic {
    /**
     * Add NQL identifers to the Topic
     * @param identifiers
     */
    addIdentifiers(identifiers: INqlIdentifiers): Topic;
    /**
     * Remove saved NQL identifiers
     * @param identifiers
     */
    removeIdentifiers(identifiers: string[]): Topic;
    /**
     * Unsubscribe from current Topic. You will not onReceive messages from this
     * Topic in the future
     */
    unsubscribe(): boolean;
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
    publish(data: ArrayBuffer, identifiers?: string[]): Topic;
    /**
     * PRIVATE Inject messages into the Topic instance
     * @param data
     */
    _onReceiveMessage(data: ITransport): ITopic;
    /**
     * Set presence data on this topic. Presence data could be anything that identifies this device.
     * Updated list of shared data is shared with all devices subscribed to the same Topic and Identifiers when a devices
     * connect and disconnects.
     * @param presence
     * @returns
     */
    setPresence(presence: string): Topic;
}
export declare class Topic implements ITopic {
    private connection;
    private readonly topicName;
    private onReceiveCallback;
    private identifiers;
    private presence;
    private tunnel;
    constructor(tunnel: ITunnel, connection: NoLagClient, topicName: string, identifiers: INqlIdentifiers);
    private saveIdentifiers;
    private deleteSavedIdentifiers;
    private subscribe;
    setPresence(presence: string): Topic;
    setConnection(connection: NoLagClient): Topic;
    _onReceiveMessage(data: ITransport): ITopic;
    onReceive(callbackFn: ((data: ITransport) => void) | undefined): Topic;
    addIdentifiers(identifiersList: INqlIdentifiers): Topic;
    removeIdentifiers(identifiers: string[]): Topic;
    unsubscribe(): boolean;
    publish(data: ArrayBuffer, identifiers?: string[]): Topic;
    private send;
}
//# sourceMappingURL=Topic.d.ts.map