/**
 * Edit Tunnel Topic using topic ID
 * Can read more about this here: https://developer.nolag.app/#tunnel-topics
 */
import { test, expect } from "@playwright/test";

import { env, getTunnel, topicName, setTopic, getTopic } from "../globalVars";

import { Api, EStatus } from "nolagjs";

const tunnel = getTunnel();
const topicNameWithTimestamp = topicName();
const topic = getTopic();

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
  test("edit tunnel topic using topicID", async ({ page }) => {
    if (!topic) return;

    // just edit the name
    topic.name = `${topicNameWithTimestamp}_edited`;

    const response = await apiTunnel
      .tunnel(tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);

    if (response) {
      setTopic(response);
    }

    expect(response?.name).toBe(topic.name);
    expect(response?.name).toBe(getTopic()?.name);
  });

  /**
   * If a device is publishing to a topic name it is also subscribed to. With "noEcho" the publisher will not receive the message it sent.
   * noEcho is set to true by default
   */
  test("set noEcho to false", async ({ page }) => {
    const topic = getTopic();

    if (!topic) return;

    // just edit the name
    topic.noEcho = false;

    const response = await apiTunnel
      .tunnel(tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);

    if (response) {
      setTopic(response);
    }

    expect(response?.noEcho).toBeFalsy();
    expect(response?.name).toBe(getTopic()?.name);
  });

  /**
   * Refer to documentation here: https://developer.nolag.app/#triggers-webhook
   */
  test("set Trigger webhook", async ({ page }) => {
    const topic = getTopic();

    if (!topic) return;

    // just edit the name
    topic.triggerApi = {
      url: "http://localhost:3000/api/trigger",
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
      .tunnel(tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);
    console.log("response2", response);

    if (response) {
      setTopic(response);
    }

    expect(response?.triggerApi).toBe(getTopic()?.triggerApi);
  });

  test("set Hydration webhook", async ({ page }) => {
    const topic = getTopic();

    if (!topic) return;

    // just edit the name
    topic.hydrateApi = {
      url: "http://localhost:3000/api/hydration",
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
      .tunnel(tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);
    console.log("response2", response);
    if (response) {
      setTopic(response);
    }

    expect(response?.triggerApi).toBe(getTopic()?.triggerApi);
  });

  test("set status to Inactive", async ({ page }) => {
    const topic = getTopic();

    if (!topic) return;

    // just edit the name
    topic.status = EStatus.Inactive;

    const response = await apiTunnel
      .tunnel(tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);
console.log(response);
    if (response) {
      setTopic(response);
    }

    expect(response?.status).toBe(EStatus.Inactive);
  });

  test("set status to Active", async ({ page }) => {
    const topic = getTopic();

    if (!topic) return;

    // just edit the name
    topic.status = EStatus.Active;

    const response = await apiTunnel
      .tunnel(tunnel?.tunnelId ?? "")
      .topics.updateTopic(topic.topicId ?? "", topic);

    if (response) {
      setTopic(response);
    }

    expect(response?.status).toBe(EStatus.Active);
  });
});
