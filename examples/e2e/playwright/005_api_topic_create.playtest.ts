import { test, expect } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import { createTunnelTopicUsingTunnelID } from "../procedures/005_api_topic_create";

test.describe("Playwright Api Create Tunnel Topic", () => {
  test("BROWSER: Create tunnel topic using tunnelID", async ({ page }) => {
    const args = {
      topicName: browserInstance.topicName,
      tunnelName: browserInstance.tunnelName,
      noLagDeveloperTestConfigIgnore: browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return createTunnelTopicUsingTunnelID(args);
    }, args);

    if (response) {
      browserInstance.setTopic(response);
    }

    expect(response?.name).toBe(browserInstance.topicName);
    expect(response?.name).toBe(browserInstance.topic?.name);
    expect(response?.noEcho).toBe(browserInstance.topic?.noEcho);
  });

  test("NODE: Create tunnel topic using tunnelID", async ({ page }) => {
    const args = {
      topicName: nodeInstance.topicName,
      tunnelName: nodeInstance.tunnelName,
      noLagDeveloperTestConfigIgnore: nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
    };

    args.topicName = `${nodeInstance.topicName}_node`;

    const response = await createTunnelTopicUsingTunnelID(args);

    if (response) {
      nodeInstance.setTopic(response);
    }

    expect(response?.name).toBe(args.topicName);
    expect(response?.noEcho).toBe(nodeInstance.topic?.noEcho);
  });
});
