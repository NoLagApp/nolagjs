import { NoLagClient } from "../../client/NoLagClient";
import { TData } from "../constants";
import { INqlIdentifiers, IResponse } from "../interfaces";
export interface ITopic {
    /**
     * Add NQL identifers to the Topic
     * @param INqlIdentifiers identifiers - List of reverse NQL query items
     */
    addIdentifiers(identifiers: INqlIdentifiers): Topic;
    /**
     * Remove saved NQL identifiers
     * @param INqlIdentifiers identifiers - List of reverse NQL query items
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
     * @param IResponse data - Received data published by another device
     */
    onReceive(callbackFn: ((data: IResponse) => void) | undefined): Topic;
    /**
     * Publish topic data with optional attached identifiers
     * @param ArrayBuffer data - Data being sent is an ArrayBuffer
     * @param string[] identifiers - List of identifiers used to send targeted messages
     * @returns
     */
    publish(data: TData, identifiers: string[]): Topic;
    /**
     * PRIVATE Inject messages into the Topic instance
     * @param data
     */
    _onReceiveMessage(data: IResponse): ITopic;
}
export declare class Topic implements ITopic {
    private connection;
    private topicName;
    private callbackFn;
    private identifiers;
    constructor(connection: NoLagClient, topicName: string, identifiers: INqlIdentifiers);
    private findSavedIdentifier;
    private saveIdentifiers;
    private deleteSavedIdentifiers;
    private subscribe;
    setConnection(connection: NoLagClient): Topic;
    _onReceiveMessage(data: IResponse): ITopic;
    onReceive(callbackFn: ((data: IResponse) => void) | undefined): Topic;
    addIdentifiers(identifiersList: INqlIdentifiers): Topic;
    removeIdentifiers(identifiers: string[]): Topic;
    unsubscribe(): boolean;
    publish(data: ArrayBuffer, identifiers: string[]): Topic;
    private send;
}
