import { AcknowledgeQueueIdentifier } from "./AcknowledgeQueueIdentifier";
import { AcknowledgeQueueReceivedItem, AcknowledgeQueueSentItem } from "./AcknowledgeQueueItem";
import { ITransport } from "../../interfaces";
export interface IQueues {
    sent: Record<string, AcknowledgeQueueSentItem>;
    received: Record<string, AcknowledgeQueueReceivedItem>;
}
export declare class AcknowledgeQueueManager {
    private queues;
    private _expirePeriodInMs;
    private matchSentQueueWithReceiveQueue;
    /**
     * Remove any received expired items
     * This should never run, but just in case
     * @private
     */
    private cleanUpReceivedQueue;
    /**
     * Non-blocking long-running process
     * This process is responsible for matching the sent queue with the received queue
     * also doing a bit of cleanup
     */
    private runQueue;
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
    getReceivedQueue(): AcknowledgeQueueReceivedItem[];
}
//# sourceMappingURL=AcknowledgeQueueManager.d.ts.map