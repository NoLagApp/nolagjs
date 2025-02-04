import { ITransport } from "../interfaces";

export interface IKeySchema {
  topicName: string;
  identifiers: string[];
}

export interface IQueueSchema {
  key: string;
  callbackFn: (error: Error, data: ITransport) => void;
}

export interface IQueues {
  sent: IQueueSchema[];
  received: IQueueSchema[];
}

export class FunctionQueue {
  private queues: IQueues = {
    sent: [],
    received: [],
  };

  addToSentQueue(
    key: string,
    callbackFn: (error: Error, data: ITransport) => void,
  ) {
    this.queues.sent.push({
      key,
      callbackFn,
    });
  }

  addToReceivedQueue(
    key: string,
    callbackFn: (error: Error, data: ITransport) => void,
  ) {
    this.queues.received.push({
      key,
      callbackFn,
    });
  }
}
