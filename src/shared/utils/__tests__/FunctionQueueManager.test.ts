import { FunctionQueueIdentifier } from "../FunctionQueueIdentifier";

describe("FunctionQueueIdentifier", () => {
  test("Generate ID from topic name and identifiers", () => {
    const topicName = "topicName";
    const identifiers = ["identifierTwo","identifierOne"];
    const queueIdentifier = new FunctionQueueIdentifier({
      topicName,
      identifiers,
    })

    expect(`${topicName}_${identifiers[1]}_${identifiers[0]}`).toEqual(
      queueIdentifier.generateKey(),
    );
  });

  test("Generate ID from topic name", () => {
    const topicName = "topicName";
    const queueIdentifier = new FunctionQueueIdentifier({
      topicName
    })

    expect(`${topicName}`).toEqual(
      queueIdentifier.generateKey(),
    );
  });
});
