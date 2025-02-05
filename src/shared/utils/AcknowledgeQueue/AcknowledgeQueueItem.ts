import { ITransport } from "../../interfaces";

export interface IAcknowledgeQueueItem {
  key: string;
}

export class AcknowledgeQueueItem {
  private _expirePeriodInMs = 180000; // 3min
  public timestamp: number;

  constructor(properties: IAcknowledgeQueueItem, expirePeriodInMs?: number) {
    this.timestamp = Date.now();
    this._expirePeriodInMs = expirePeriodInMs || this._expirePeriodInMs;
  }

  public set expirePeriodInMs(periodInMs: number) {
    this._expirePeriodInMs = periodInMs;
  }

  public get expirePeriodInMs() {
    return this._expirePeriodInMs;
  }

  public get isExpired() {
    return this.timestamp + this.expirePeriodInMs <= Date.now();
  }

  public expire() {
    this.timestamp = Date.now() - this.expirePeriodInMs;
  }
}

export interface IAcknowledgeQueueSentItem extends IAcknowledgeQueueItem {
  callbackFn?: (error: Error | null, data: ITransport | null) => void;
}

export class AcknowledgeQueueSentItem extends AcknowledgeQueueItem {
  public callbackFn?: (error: Error | null, data: ITransport | null) => void;

  constructor(properties: IAcknowledgeQueueSentItem, expirePeriodInMs?: number) {
    super(properties, expirePeriodInMs);
    this.callbackFn = properties?.callbackFn;
  }
}

export interface IAcknowledgeQueueReceivedItem extends IAcknowledgeQueueItem {
  error: Error | null;
  data: ITransport;
}

export class AcknowledgeQueueReceivedItem extends AcknowledgeQueueItem {
  public error: Error | null;
  public data: ITransport;

  constructor(properties: IAcknowledgeQueueReceivedItem, expirePeriodInMs?: number) {
    super(properties, expirePeriodInMs);
    this.error = properties?.error;
    this.data = properties?.data;
  }
}
