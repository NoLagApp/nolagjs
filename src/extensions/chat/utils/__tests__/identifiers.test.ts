import { uuid, regenerateUuid } from "../uuid";
import { findIdentifierId, setIdentifierId } from "../identifiers";

const key = "some:key:";
const value = "someValue";

describe("Identifiers", () => {
  test("Find key ID", () => {
    const foundKeyValue = findIdentifierId(key, `${key}${value}`)

    expect(value).toBe(foundKeyValue);
  });

  test("Set key ID", () => {
    const foundKeyValue = setIdentifierId(key, value)

    expect(`${key}${value}`).toBe(foundKeyValue);
  });
});
