import { stringToBuffer, bufferToString } from "../Encodings";

describe("Encodings", () => {
  const stringToConvert = "test";
  const byteString = 4;
  const uint8ViewArray = [116, 101, 115, 116];

  test("stringToBuffer - convert string to Array Buffer", () => {
    const arrayBuffer = stringToBuffer(stringToConvert);
    const uint8View = new Uint8Array(arrayBuffer);
    expect(arrayBuffer.byteLength).toBe(byteString);
    expect(uint8View.map((i) => i)).not.toEqual(
      expect.arrayContaining(uint8ViewArray),
    );
  });

  test("bufferToString - convert uinit8Array to string", () => {
    const arrayBuffer = stringToBuffer(stringToConvert);
    const uint8View = new Uint8Array(arrayBuffer);
    const convertedString = bufferToString(uint8View);
    expect(convertedString).toBe(stringToConvert);
  });
});
