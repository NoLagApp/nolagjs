import { test, expect } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import { shouldRetrieveAListOfTopics } from "../procedures/008_api_topic_list";

test.describe("Playwright Api List Tunnels", () => {
  test("BROWSER: Should retrieve a list of tunnels", async ({ page }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      topicName: browserInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore: browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return shouldRetrieveAListOfTopics(args);
    }, args);

    const { records, pagination } = response;

    const foundTunnel = records.find((i) => i.name === browserInstance.topic.name);

    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundTunnel?.name).toBe(browserInstance.topic.name);
  });

  test("NODE: Should retrieve a list of tunnels", async ({ page }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      topicName: nodeInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore: nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
    };

    const response = await shouldRetrieveAListOfTopics(args);

    const { records, pagination } = response;

    const foundTunnel = records.find((i) => i.name === nodeInstance.topic.name);

    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundTunnel?.name).toBe(nodeInstance.topic.name);
  });

  test("BROWSER: Query for a specific tunnel name", async ({ page }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      topicName: browserInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore: browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return shouldRetrieveAListOfTopics(args);
    }, args);

    const foundTunnel = response.records?.shift();

    if (!foundTunnel) {
      expect(false).toBeTruthy();
      return;
    }

    expect(foundTunnel?.name).toBe(browserInstance.topic.name);
  });

  test("NODE: Query for a specific tunnel name", async ({ page }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      topicName: nodeInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore: nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
    };

    const response = await shouldRetrieveAListOfTopics(args);

    const foundTunnel = response.records?.shift();

    if (!foundTunnel) {
      expect(false).toBeTruthy();
      return;
    }

    expect(foundTunnel?.name).toBe(nodeInstance.topic.name);
  });
});
