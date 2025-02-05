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

  public expirePeriodInMs(periodInMs: number) {
    this._expirePeriodInMs = periodInMs;
    return this;
  }

  /**
   * Non-blocking long-running process
   * This process is responsible for matching the sent queue with the received queue
   * also doing a bit of cleanup
   */
  public runQueue() {
    setTimeout(() => {
      // we stop the interval here
      this.matchSentQueueWithReceiveQueue();
      this.cleanUpReceivedQueue();
      this.runQueue();
    }, 0);
    return this;
  }

  /**
   * Add
   * @param key
   * @param callbackFn
   */
  addToSentQueue(
    key: AcknowledgeQueueIdentifier,
    callbackFn: (error: Error | null, data: ITransport | null) => void,
  ) {
    const generatedKey = key.generateKey();
    this.queues.sent[generatedKey] = new AcknowledgeQueueSentItem({
      key: generatedKey,
      callbackFn,
    }, this._expirePeriodInMs);
  }

  addToReceivedQueue(
    key: AcknowledgeQueueIdentifier,
    error: Error | null,
    data: ITransport,
  ) {
    const generatedKey = key.generateKey();
    this.queues.received[generatedKey] = new AcknowledgeQueueReceivedItem({
      key: generatedKey,
      error,
      data,
    }, this._expirePeriodInMs);
  }

  getSentQueue(): AcknowledgeQueueSentItem[] {
    return Object.values(this.queues.sent).filter((i) => i);
  }

  getReceivedQueue(): AcknowledgeQueueReceivedItem[] {
    return Object.values(this.queues.received).filter((i) => i);
  }
}
