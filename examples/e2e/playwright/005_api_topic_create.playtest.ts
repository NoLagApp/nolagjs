import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { ITopicModel } from "nolagjs";
import { example_api_tunnel_topic_create } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_create";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const tunnelName = globalVars.tunnelName;
const tunnelId = globalVars.tunnel?.tunnelId ?? "";

const payload: ITopicModel = {
  name: globalVars.topicName,
};

test.describe("Playwright Api Create Tunnel Topic", () => {
  // happy path, retrieve a list of tunnels
  test("create tunnel topic using tunnelID", async ({ page }) => {
    if (!globalVars.tunnel) {
      expect(false).toBeTruthy();
      return;
    }

    const response = await example_api_tunnel_topic_create({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelName,
      tunnelId,
    });

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.name).toBe(globalVars.topicName);
    expect(response?.name).toBe(globalVars.topic?.name);
    expect(response?.noEcho).toBe(globalVars.topic?.noEcho);
  });
});
