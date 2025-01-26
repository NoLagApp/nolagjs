import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { ITopicModel } from "nolagjs";
import { example_api_tunnel_topic_create } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_create";
import { getTunnelUsingTunnelId } from "../procedures/004_api_tunnel_get";
import { createTunnelTopicUsingTunnelID } from "../procedures/005_api_topic_create";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const tunnelName = globalVars.tunnelName;
const tunnelId = globalVars.tunnel?.tunnelId ?? "";

const payload: ITopicModel = {
  name: globalVars.topicName,
};

test.describe("Playwright Api Create Tunnel Topic", () => {
  test("BROWSER: Create tunnel topic using tunnelID", async ({ page }) => {
    const args = {
      topicName: globalVars.topicName,
      tunnelName: globalVars.tunnelName,
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelId: globalVars.tunnel.tunnelId ?? ""
    };

    await page.goto(globalVars.viteHostUrl);

    const response = await page.evaluate((args) => {
      return createTunnelTopicUsingTunnelID(args);
    }, args);

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.name).toBe(globalVars.topicName);
    expect(response?.name).toBe(globalVars.topic?.name);
    expect(response?.noEcho).toBe(globalVars.topic?.noEcho);
  });

  test("NODE: Create tunnel topic using tunnelID", async ({ page }) => {
    const args = {
      topicName: globalVars.topicName,
      tunnelName: globalVars.tunnelName,
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelId: globalVars.tunnel.tunnelId ?? ""
    };

    args.topicName = `${globalVars.topicName}_node`;

    const response = await createTunnelTopicUsingTunnelID(args);

    expect(response?.name).toBe(args.topicName);
    expect(response?.noEcho).toBe(globalVars.topic?.noEcho);
  });
});
