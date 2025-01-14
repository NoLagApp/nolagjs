import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { ITopicQuery } from "nolagjs";
import { example_api_tunnel_topic_list } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_list";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const tunnelId = globalVars.topic?.tunnelId ?? "";
const topicQuery: ITopicQuery = {};

test.describe("Playwright Api List Tunnels", () => {
  test("should retrieve a list of tunnels", async ({ page }) => {
    const response = await example_api_tunnel_topic_list({
      topicQuery,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
    });

    const { records, pagination } = response;

    const foundTunnel = records.find((i) => i.name === globalVars.topic.name);

    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundTunnel?.name).toBe(globalVars.topic.name);
  });

  test("query for a specific tunnel name", async ({ page }) => {
    topicQuery.search = globalVars.topic.name;

    const response = await example_api_tunnel_topic_list({
      topicQuery,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
    });

    const foundTunnel = response.records?.[0];

    if (!foundTunnel) {
      expect(false).toBeTruthy();
      return;
    }

    expect(foundTunnel?.name).toBe(globalVars.topic.name);
  });
});
