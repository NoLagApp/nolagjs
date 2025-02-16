import { AcknowledgeQueueIdentifier } from "./AcknowledgeQueueIdentifier";
import {
  AcknowledgeQueueItem,
  AcknowledgeQueueReceivedItem,
  AcknowledgeQueueSentItem,
} from "./AcknowledgeQueueItem";
import { ITransport } from "../../interfaces";

export interface IQueues {
  sent: Record<string, AcknowledgeQueueSentItem>;
  received: Record<string, AcknowledgeQueueReceivedItem>;
}

export class AcknowledgeQueueManager {
  private queues: IQueues = {
    sent: {},
    received: {},
  };
  private _expirePeriodInMs: number | undefined;

  private matchSentQueueWithReceiveQueue() {
    Object.keys(this.queues.sent).forEach((key) => {
      const item = this.queues.sent[key];
      const foundReceiveQueueItem = this.queues.received[key];
      if (item?.callbackFn && foundReceiveQueueItem) {
        item.callbackFn(
          foundReceiveQueueItem.error,
          foundReceiveQueueItem.data,
        );
        item.expire();
      }

      if (item?.isExpired) {
        // delete the references before we delete the item entries
        this.queues.sent[key] = null as any;
        delete this.queues.sent[key];
        this.queues.received[key] = null as any;
        delete this.queues.received[key];
      }
    });
  }

  /**
   * Remove any received expired items
   * This should never run, but just in case
   * @private
   */
  private cleanUpReceivedQueue() {
    Object.keys(this.queues.received).forEach((key) => {
      const item = this.queues.received[key];
      if (item?.isExpired) {
        // delete the references before we delete the item entries
        this.queues.received[key] = null as any;
        delete this.queues.received[key];
      }
    });
  }

  /**
   * Non-blocking long-running process
   * This process is responsible for matching the sent queue with the received queue
   * also doing a bit of cleanup
   */
  private runQueue() {
    setTimeout(() => {
      // we stop the interval here
      this.matchSentQueueWithReceiveQueue();
      this.cleanUpReceivedQueue();
      this.runQueue();
    }, 0);
    return this;
  }

  constructor() {
    this.runQueue();
  }

  public expirePeriodInMs(periodInMs: number) {
    this._expirePeriodInMs = periodInMs;
    return this;
  }

  /**
   * All subscriptions require an ACK to say that all is good to go
   * We place all these sent subscriptions in this queue to match up later with
   * a received ACK
   * @param key
   * @param callbackFn
   */
  public async addToSentQueue(key: AcknowledgeQueueIdentifier, callbackFn?: (error: Error | null, data: ITransport | null) => void) {
    return new Promise((resolve, reject) => {
      const generatedKey = key.generateKey();
      this.queues.sent[generatedKey] = new AcknowledgeQueueSentItem(
        {
          key: generatedKey,
          callbackFn: (error: Error | null, data: ITransport | null) => {
            if(callbackFn) {
              callbackFn(error, data);
            }
            if (error) {
              reject(error);
              return;
            }
            resolve(data);
          },
        },
        this._expirePeriodInMs,
      );
    });
  }

  /**
   * All received ACK messages from the broker will be queued here
   * we will cycle through them to find its friend int he sent queue
   * @param key
   * @param error
   * @param data
   */
  public addToReceivedQueue(
    key: AcknowledgeQueueIdentifier,
    error: Error | null,
    data: ITransport,
  ) {
    const generatedKey = key.generateKey();
    this.queues.received[generatedKey] = new AcknowledgeQueueReceivedItem(
      {
        key: generatedKey,
        error,
        data,
      },
      this._expirePeriodInMs,
    );
  }

  public getSentQueue(): AcknowledgeQueueSentItem[] {
    return Object.values(this.queues.sent).filter((i) => i);
  }

  public getReceivedQueue(): AcknowledgeQueueReceivedItem[] {
    return Object.values(this.queues.received).filter((i) => i);
  }
}
