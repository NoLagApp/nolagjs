import { generateQueryString } from "../generateQueryString";

describe("Generate Query String", () => {
  const deviceListQuery = {
    deviceAccessToken: "1",
    expireFromDate: 2,
    expireToDate: 3,
    name: "4",
    search: "5",
    size: 6,
    page: 7,
  };

  const queryStringExample =
    "?deviceAccessToken=1&expireFromDate=2&expireToDate=3&name=4&search=5&size=6&page=7";

  test("generateQueryString - convert object to query string", () => {
    const queryString = generateQueryString(deviceListQuery);
    expect(queryString).toBe(queryStringExample);
  });

  test("generateQueryString - pass now data in object", () => {
    const queryString = generateQueryString({});
    expect(queryString).toBe("");
  });
});
