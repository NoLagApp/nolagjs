import { AcknowledgeQueueIdentifier } from "./AcknowledgeQueueIdentifier";
import { AcknowledgeQueueReceivedItem, AcknowledgeQueueSentItem } from "./AcknowledgeQueueItem";
import { ITransport } from "../../interfaces";
export interface IQueues {
    sent: Record<string, AcknowledgeQueueSentItem>;
    received: Record<string, AcknowledgeQueueReceivedItem>;
    sentIndex: [string, string][];
    receiveIndex: [string, string][];
}
export declare class AcknowledgeQueueManager {
    private queues;
    private _expirePeriodInMs;
    private matchSentQueueWithReceiveQueue;
    removeFromSentQueue(index: string, key: number): void;
    removeFromReceiveQueue(index: string, key: number): void;
    /**
     * Remove any received expired items
     * This should never run, but just in case
     * @private
     */
    private cleanUpReceivedQueue;
    private removeEmptyIndexPositions;
    /**
     * Non-blocking long-running process
     * This process is responsible for matching the sent queue with the received queue
     * also doing a bit of cleanup
     */
    private runQueue;
    private setSentIndex;
    private setReceiveIndex;
    constructor();
    expirePeriodInMs(periodInMs: number): this;
    /**
     * All subscriptions require an ACK to say that all is good to go
     * We place all these sent subscriptions in this queue to match up later with
     * a received ACK
     * @param key
     * @param callbackFn
     */
    addToSentQueue(key: AcknowledgeQueueIdentifier, callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<unknown>;
    /**
     * All received ACK messages from the broker will be queued here
     * we will cycle through them to find its friend int he sent queue
     * @param key
     * @param error
     * @param data
     */
    addToReceivedQueue(key: AcknowledgeQueueIdentifier, error: Error | null, data: ITransport): void;
    getSentQueue(): AcknowledgeQueueSentItem[];
    getSentIndex(): [string, string][];
    getReceivedQueue(): AcknowledgeQueueReceivedItem[];
    getReceiveIndex(): [string, string][];
}
//# sourceMappingURL=AcknowledgeQueueManager.d.ts.map