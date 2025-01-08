/**
 * Create Tunnel Topic
 * Can read more about this here: https://developer.nolag.app/#tunnel-topics
 */
import { test, expect } from "@playwright/test";

import globalVars from "../../constants/globalVars";

import { Api } from "nolagjs";

// setup connection to NoLag API
// we only need to supply the API KEY obtained from the NoLag portal
// https://developer.nolag.app/#api
const apiTunnel = Api(globalVars.yourProjectApiKey, globalVars.noLagDeveloperTestConfigIgnore);

test.describe("Playwright Api Create Tunnel Topic", () => {
  // happy path, retrieve a list of tunnels
  test("create tunnel topic using tunnelID", async ({ page }) => {
    if (!globalVars.tunnel) {
      expect(false).toBeTruthy()
      return;
    }

    const response = await apiTunnel
      .tunnel(globalVars.tunnel?.tunnelId ?? "")
      .topics.createTopic({
        name: globalVars.topicName,
      });

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.name).toBe(globalVars.topicName);
    expect(response?.name).toBe(globalVars.topic?.name);
    expect(response?.noEcho).toBe(globalVars.topic?.noEcho);
  });
});
