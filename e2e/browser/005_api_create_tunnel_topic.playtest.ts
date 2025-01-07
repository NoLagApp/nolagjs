/**
 * Create Tunnel Topic
 * Can read more about this here: https://developer.nolag.app/#tunnel-topics
 */
import { test, expect } from "@playwright/test";

import { env, getTunnel, topicName, setTopic, getTopic } from "../globalVars";

import { Api } from "nolagjs";

const tunnel = getTunnel();
const topicNameWithTimestamp = topicName();

// setup connection to NoLag API
// we only need to supply the API KEY obtained from the NoLag portal
// https://developer.nolag.app/#api
const apiTunnel = Api(env.PROJECT_API_KEY, {
  host: "localhost:5001",
  protocol: "http",
  devMode: true,
});

test.describe("Playwright Api Create Tunnel Topic", () => {
  // happy path, retrieve a list of tunnels
  test("create tunnel topic using tunnelID", async ({ page }) => {
    if (!tunnel) return;

    const response = await apiTunnel
      .tunnel(tunnel?.tunnelId ?? "")
      .topics.createTopic({
        name: topicNameWithTimestamp,
      });

    if (response) {
      setTopic(response);
    }

    expect(response?.name).toBe(topicNameWithTimestamp);
    expect(response?.name).toBe(getTopic()?.name);
    expect(response?.noEcho).toBe(getTopic()?.noEcho);
  });
});
