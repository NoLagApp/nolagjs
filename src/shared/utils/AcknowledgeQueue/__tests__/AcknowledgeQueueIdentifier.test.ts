import { AcknowledgeQueueIdentifier } from "../AcknowledgeQueueIdentifier";
import { EConnectionStatus } from "../../../enum";

describe("FunctionQueueIdentifier", () => {
  test("Generate ID from topic name and identifiers", () => {
    const topicName = "topicName";
    const identifiers = ["identifierTwo", "identifierOne"];
    const queueIdentifier = new AcknowledgeQueueIdentifier({
      topicName,
      identifiers,
    });

    expect(`${topicName}_${identifiers[1]}_${identifiers[0]}`).toEqual(
      queueIdentifier.generateKey(),
    );
  });

  test("Generate ID from topic name", () => {
    const topicName = "topicName";
    const queueIdentifier = new AcknowledgeQueueIdentifier({
      topicName,
    });

    expect(`${topicName}`).toEqual(queueIdentifier.generateKey());
  });

  test("Generate ID from topic name and identifiers", () => {
    const queueIdentifier = new AcknowledgeQueueIdentifier({
      initiate: EConnectionStatus.Initiate,
    });

    expect(queueIdentifier.generateKey()).toEqual(
      EConnectionStatus.Initiate
    );
  });
});
