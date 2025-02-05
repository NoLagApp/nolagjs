import { AcknowledgeQueueSentItem } from "../AcknowledgeQueueItem";
import { ITransport } from "../../../interfaces";

describe("AcknowledgeQueueItem", () => {
  test("Check if expired", () => {
    const queueItem = new AcknowledgeQueueSentItem({
      key: "1",
      callbackFn: (error: Error | null, data: ITransport | null) => {
        return "Callback Function";
      },
    });

    expect(queueItem.isExpired).toBeFalsy();
  });
  test("Set expired to now", () => {
    const queueItem = new AcknowledgeQueueSentItem({
      key: "1",
      callbackFn: (error: Error | null, data: ITransport | null) => {
        return "Callback Function";
      },
    });

    queueItem.expire();

    expect(queueItem.isExpired).toBeTruthy();
  });
});
