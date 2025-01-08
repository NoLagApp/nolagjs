/**
 * Get Tunnel Topic using topic ID
 * Can read more about this here: https://developer.nolag.app/#tunnel-topics
 */
import { test, expect } from "@playwright/test";

import globalVars from "../../constants/globalVars";

import { Api } from "nolagjs";

// setup connection to NoLag API
// we only need to supply the API KEY obtained from the NoLag portal
// https://developer.nolag.app/#api
const apiTunnel = Api(globalVars.yourProjectApiKey, globalVars.noLagDeveloperTestConfigIgnore);

test.describe("Playwright Api Get Tunnel Topic", () => {
  // happy path, retrieve a list of tunnels
  test("get tunnel topic using topicID", async ({ page }) => {
    if (!globalVars.topic) {
      expect(false).toBeTruthy()
      return;
    }

    // just edit the name
    globalVars.topic.name = `${globalVars.topicName}_edited`;

    const response = await apiTunnel
      .tunnel(globalVars.tunnel?.tunnelId ?? "")
      .topics.getTopicById(globalVars.topic.topicId ?? "");

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response).toMatchObject(globalVars.topic as Record<any, any>);
  });
});
