import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { ITopicModel } from "nolagjs";
import { EStatus } from "nolagjs";
import { example_api_tunnel_topic_update } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_update";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const tunnelId = globalVars.topic?.tunnelId ?? "";
const topicId = globalVars.topic?.topicId ?? "";

test.describe("Playwright Api Edit Tunnel Topic", () => {
  test("edit tunnel topic using topicID", async ({ page }) => {
    if (!globalVars.topic) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: ITopicModel = {
      name: `${globalVars.topicName}_edited`,
    };

    const response = await example_api_tunnel_topic_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      topicId,
    });

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.name).toBe(globalVars.topic.name);
  });

  test("set noEcho to false", async ({ page }) => {
    const topic = globalVars.topic;

    if (!topic) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: ITopicModel = {
      noEcho: false,
    };

    const response = await example_api_tunnel_topic_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      topicId,
    });

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.noEcho).toBeFalsy();
    expect(response?.name).toBe(globalVars.topic?.name);
  });

  test("set Trigger webhook", async ({ page }) => {
    const topic = globalVars.topic;

    if (!topic) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: ITopicModel = {
      triggerApi: {
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
        },
      },
    };

    const response = await example_api_tunnel_topic_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      topicId,
    });

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response.triggerApi).toMatchObject(
      globalVars.topic?.triggerApi as Record<any, any>,
    );
  });

  test("set Hydration webhook", async ({ page }) => {
    const topic = globalVars.topic;

    if (!topic) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: ITopicModel = {
      hydrateApi: {
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
        },
      },
    };

    const response = await example_api_tunnel_topic_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      topicId,
    });

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response.hydrateApi).toMatchObject(
      globalVars.topic?.hydrateApi as Record<any, any>,
    );
  });

  test("set status to Inactive", async ({ page }) => {
    const topic = globalVars.topic;

    if (!topic) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: ITopicModel = {
      status: EStatus.Inactive,
    };

    const response = await example_api_tunnel_topic_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      topicId,
    });

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.status).toBe(EStatus.Inactive);
  });

  test("set status to Active", async ({ page }) => {
    const topic = globalVars.topic;

    if (!topic) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: ITopicModel = {
      status: EStatus.Active,
    };

    const response = await example_api_tunnel_topic_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      topicId,
    });

    if (response) {
      globalVars.setTopic(response);
    }

    expect(response?.status).toBe(EStatus.Active);
  });
});
