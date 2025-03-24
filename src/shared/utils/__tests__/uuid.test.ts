import { UUID, regenerateUUID } from "../uuid";

describe("UUID Generator", () => {
  test("should generate a valid UUID v4", () => {
    const uuid = UUID();

    // UUID v4 regex pattern
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(uuid).toMatch(uuidV4Regex);
  });

  test("should generate unique UUIDs", () => {
    const UUIDList: string[] = [];
    for (let i = 0; i < 1000; i++) {
      UUIDList.push(UUID());
    }

    const regeneratedUUID = regenerateUUID(UUIDList);

    expect(UUIDList.includes(regeneratedUUID)).toBeFalsy();
  });
});
