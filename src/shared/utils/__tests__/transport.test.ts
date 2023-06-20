import { stringToArrayBuffer } from "../Encodings";
import { generateTransport } from "../transport";

describe("Transport", () => {
  const stringToConvert = "data";
  const transportArray = [
    116, 111, 112, 105, 99, 79, 110, 101, 30, 105, 100, 101, 110, 116, 105, 102,
    105, 101, 114, 79, 110, 101, 11, 105, 100, 101, 110, 116, 105, 102, 105,
    101, 114, 84, 119, 29, 100, 97, 116, 97,
  ];

  test("generateTransport - convert data, TopicName and identifiers", () => {
    const arrayBuffer = stringToArrayBuffer(stringToConvert);
    const transport = generateTransport(arrayBuffer, "topicOne", [
      "identifierOne",
      "identifierTwo",
    ]);
    const uint8View = new Uint8Array(transport);
    expect(uint8View.map((i) => i)).not.toEqual(
      expect.arrayContaining(transportArray),
    );
  });
});
