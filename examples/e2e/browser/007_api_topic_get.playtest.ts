import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import { example_api_tunnel_topic_get } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_get";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const tunnelId = globalVars.topic?.tunnelId ?? "";
const topicId = globalVars.topic?.topicId ?? "";

test.describe("Playwright Api Get Tunnel Topic", () => {
  test("get tunnel topic using topicID", async ({ page }) => {
    if (!globalVars.topic) {
      expect(false).toBeTruthy();
      return;
    }

    const response = await example_api_tunnel_topic_get({
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      topicId,
    });

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response).toMatchObject(globalVars.topic as Record<any, any>);
  });
});
