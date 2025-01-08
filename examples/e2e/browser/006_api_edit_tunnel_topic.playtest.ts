/**
 * Edit Tunnel Topic using topic ID
 * Can read more about this here: https://developer.nolag.app/#tunnel-topics
 */
import { test, expect } from "@playwright/test";

import globalVars from "../../constants/globalVars";

import { Api, EStatus } from "nolagjs";

// setup connection to NoLag API
// we only need to supply the API KEY obtained from the NoLag portal
// https://developer.nolag.app/#api
const apiTunnel = Api(globalVars.yourProjectApiKey, globalVars.noLagDeveloperTestConfigIgnore);

test.describe("Playwright Api Edit Tunnel Topic", () => {
  // happy path, retrieve a list of tunnels
  test("edit tunnel topic using topicID", async ({ page }) => {
    if (!globalVars.topic) {
      expect(false).toBeTruthy()
      return;
    }

    // just edit the name
    globalVars.topic.name = `${globalVars.topicName}_edited`;

    const response = await apiTunnel
      .tunnel(globalVars.tunnel?.tunnelId ?? "")
      .topics.updateTopic(globalVars.topic.topicId ?? "", globalVars.topic);

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.name).toBe(globalVars.topic.name);
    expect(response?.name).toBe(globalVars.topic?.name);
  });

  /**
   * If a device is publishing to a topic name it is also subscribed to. With "noEcho" the publisher will not receive the message it sent.
   * noEcho is set to true by default
   */
  test("set noEcho to false", async ({ page }) => {
    const topic = globalVars.topic;

    if (!topic) {
      expect(false).toBeTruthy()
      return;
    }

    // just edit the name
    topic.noEcho = false;

    const response = await apiTunnel
      .tunnel(globalVars.tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.noEcho).toBeFalsy();
    expect(response?.name).toBe(globalVars.topic?.name);
  });

  /**
   * Refer to documentation here: https://developer.nolag.app/#triggers-webhook
   */
  test("set Trigger webhook", async ({ page }) => {
    const topic = globalVars.topic;

    if (!topic) {
      expect(false).toBeTruthy()
      return;
    }

    // just edit the name
    topic.triggerApi = {
      url: "http://your-url.com/api/trigger",
      queryParams: {
        queryParamOne: "queryParamOne",
        queryParamTwo: "queryParamTwo",
        queryParamThree: "queryParamThree",
      },
      headers: {
        headersParamOne: "headersParamOne",
        headersParamTwo: "headersParamTwo",
        headersParamThree: "headersParamThree",
      }
    };

    const response = await apiTunnel
      .tunnel(globalVars.tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response.triggerApi).toMatchObject(globalVars.topic?.triggerApi as Record<any, any>);
  });

  test("set Hydration webhook", async ({ page }) => {
    const topic = globalVars.topic;

    if (!topic) {
      expect(false).toBeTruthy()
      return;
    }

    // just edit the name
    topic.hydrateApi = {
      url: "http://your-url.com/api/hydration",
      queryParams: {
        queryParamOne: "queryParamOne",
        queryParamTwo: "queryParamTwo",
        queryParamThree: "queryParamThree",
      },
      headers: {
        headersParamOne: "headersParamOne",
        headersParamTwo: "headersParamTwo",
        headersParamThree: "headersParamThree",
      }
    };

    const response = await apiTunnel
      .tunnel(globalVars.tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response.hydrateApi).toMatchObject(globalVars.topic?.hydrateApi as Record<any, any>);
  });

  test("set status to Inactive", async ({ page }) => {
    const topic = globalVars.topic;

    if (!topic) {
      expect(false).toBeTruthy()
      return;
    }

    // just edit the name
    topic.status = EStatus.Inactive;

    const response = await apiTunnel
      .tunnel(globalVars.tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.status).toBe(EStatus.Inactive);
  });

  test("set status to Active", async ({ page }) => {
    const topic = globalVars.topic;

    if (!topic) {
      expect(false).toBeTruthy()
      return;
    }

    // just edit the name
    topic.status = EStatus.Active;

    const response = await apiTunnel
      .tunnel(globalVars.tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.status).toBe(EStatus.Active);
  });
});
