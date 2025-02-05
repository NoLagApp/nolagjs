import { AcknowledgeQueueIdentifier } from "../AcknowledgeQueueIdentifier";
import { AcknowledgeQueueManager } from "../AcknowledgeQueueManager";
import { ITransport } from "../../../interfaces";
import { delay } from "../../../../../examples/constants/util/delay";

describe("FunctionQueueManager", () => {
  test("match sent and received queues", async () => {
    const topicNameBase = "topicName";
    const identifiersBase = ["identifierTwo", "identifierOne"];
    const queueManager = new AcknowledgeQueueManager();

    queueManager.runQueue();

    [1, 2, 3, 4, 5].forEach((key) => {
      const topicName = `${topicNameBase}${key}`;
      const identifiers = identifiersBase.map(
        (identifier) => `${identifier}${key}`,
      );

      const identifier = new AcknowledgeQueueIdentifier({
        topicName,
        identifiers,
      });

      queueManager.addToSentQueue(identifier, () => {
        return `function_${key}`;
      });

      queueManager.addToReceivedQueue(identifier, null, {
        topicName,
        identifiers,
      } as ITransport);
    });

    await delay(1);

    expect(queueManager.getSentQueue()).toMatchObject([]);
    expect(queueManager.getReceivedQueue()).toMatchObject([]);
  });

  test("expire sent queue", async () => {
    const topicNameBase = "topicName";
    const identifiersBase = ["identifierTwo", "identifierOne"];
    const queueManager = new AcknowledgeQueueManager();

    queueManager.expirePeriodInMs(100).runQueue();

    [1, 2, 3, 4, 5].forEach((key) => {
      const topicName = `${topicNameBase}${key}`;
      const identifiers = identifiersBase.map(
        (identifier) => `${identifier}${key}`,
      );

      const identifier = new AcknowledgeQueueIdentifier({
        topicName,
        identifiers,
      });

      queueManager.addToSentQueue(identifier, () => {
        return `function_${key}`;
      });
    });

    await delay(200);

    expect(queueManager.getSentQueue()).toMatchObject([]);
    expect(queueManager.getReceivedQueue()).toMatchObject([]);
  });

  test("expire receive queue", async () => {
    const topicNameBase = "topicName";
    const identifiersBase = ["identifierTwo", "identifierOne"];
    const queueManager = new AcknowledgeQueueManager();

    queueManager.expirePeriodInMs(100).runQueue();

    [1, 2, 3, 4, 5].forEach((key) => {
      const topicName = `${topicNameBase}${key}`;
      const identifiers = identifiersBase.map(
        (identifier) => `${identifier}${key}`,
      );

      const identifier = new AcknowledgeQueueIdentifier({
        topicName,
        identifiers,
      });

      queueManager.addToReceivedQueue(identifier, null, {
        topicName,
        identifiers,
      } as ITransport);
    });

    await delay(200);

    expect(queueManager.getSentQueue()).toMatchObject([]);
    expect(queueManager.getReceivedQueue()).toMatchObject([]);
  });
});
