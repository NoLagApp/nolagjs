import { ITransport } from "../../interfaces";
export interface IAcknowledgeQueueItem {
    key: string;
}
export declare class AcknowledgeQueueItem {
    private _expirePeriodInMs;
    expireTimestamp: number;
    key: string;
    constructor(properties: IAcknowledgeQueueItem, expirePeriodInMs?: number);
    set expirePeriodInMs(periodInMs: number);
    get expirePeriodInMs(): number;
    get isExpired(): boolean;
    expire(): void;
}
export interface IAcknowledgeQueueSentItem extends IAcknowledgeQueueItem {
    callbackFn?: (error: Error | null, data: ITransport | null) => void;
}
export declare class AcknowledgeQueueSentItem extends AcknowledgeQueueItem {
    callbackFn?: (error: Error | null, data: ITransport | null) => void;
    constructor(properties: IAcknowledgeQueueSentItem, expirePeriodInMs?: number);
}
export interface IAcknowledgeQueueReceivedItem extends IAcknowledgeQueueItem {
    error: Error | null;
    data: ITransport;
}
export declare class AcknowledgeQueueReceivedItem extends AcknowledgeQueueItem {
    error: Error | null;
    data: ITransport;
    constructor(properties: IAcknowledgeQueueReceivedItem, expirePeriodInMs?: number);
}
//# sourceMappingURL=AcknowledgeQueueItem.d.ts.map