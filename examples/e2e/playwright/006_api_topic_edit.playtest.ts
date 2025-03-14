import { test, expect } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import { EStatus } from "nolagjs";
import {
  editTunnelTopicUsingTopicId,
  setHydrationWebhook,
  setNoEchoToFalse,
  setStatusToActive,
  setStatusToInactive,
  setTriggerWebhook,
} from "../procedures/006_api_topic_edit";

test.describe("Playwright Api Edit Tunnel Topic", () => {
  test("BROWSER: Edit tunnel topic using topicID", async ({ page }) => {
    const args = {
      topicId: browserInstance.topic.topicId ?? "",
      tunnelName: browserInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return editTunnelTopicUsingTopicId(args);
    }, args);

    if (response) {
      browserInstance.setTopic(response);
    }

    expect(response?.name).toBe(browserInstance.topic.name);
  });

  test("NODE: Edit tunnel topic using topicID", async ({ page }) => {
    const args = {
      topicId: nodeInstance.topic.topicId ?? "",
      tunnelName: nodeInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(nodeInstance.viteHostUrl);

    const response = await editTunnelTopicUsingTopicId(args);

    if (response) {
      nodeInstance.setTopic(response);
    }

    expect(response?.name).toBe(nodeInstance.topic.name);
  });

  test("BROWSER: Set noEcho to false", async ({ page }) => {
    const args = {
      topicId: browserInstance.topic.topicId ?? "",
      tunnelName: browserInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return setNoEchoToFalse(args);
    }, args);

    if (response) {
      browserInstance.setTopic(response);
    }

    expect(response?.noEcho).toBeFalsy();
    expect(response?.name).toBe(browserInstance.topic?.name);
  });

  test("NODE: Set noEcho to false", async ({ page }) => {
    const args = {
      topicId: nodeInstance.topic.topicId ?? "",
      tunnelName: nodeInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
    };

    const response = await setNoEchoToFalse(args);

    if (response) {
      nodeInstance.setTopic(response);
    }

    expect(response?.noEcho).toBeFalsy();
    expect(response?.name).toBe(nodeInstance.topic?.name);
  });

  test("BROWSER: Set Trigger webhook", async ({ page }) => {
    const args = {
      topicId: browserInstance.topic.topicId ?? "",
      tunnelName: browserInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return setTriggerWebhook(args);
    }, args);

    if (response) {
      browserInstance.setTopic(response);
    }

    expect(response.triggerApi).toMatchObject(
      browserInstance.topic?.triggerApi as Record<any, any>,
    );
  });

  test("NODE: Set Trigger webhook", async ({ page }) => {
    const args = {
      topicId: nodeInstance.topic.topicId ?? "",
      tunnelName: nodeInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
    };

    const response = await setTriggerWebhook(args);

    if (response) {
      nodeInstance.setTopic(response);
    }

    expect(response.triggerApi).toMatchObject(
      nodeInstance.topic?.triggerApi as Record<any, any>,
    );
  });

  test("BROWSER: Set Hydration webhook", async ({ page }) => {
    const args = {
      topicId: browserInstance.topic.topicId ?? "",
      tunnelName: browserInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return setHydrationWebhook(args);
    }, args);

    if (response) {
      browserInstance.setTopic(response);
    }

    expect(response.hydrateApi).toMatchObject(
      browserInstance.topic?.hydrateApi as Record<any, any>,
    );
  });

  test("NODE: Set Hydration webhook", async ({ page }) => {
    const args = {
      topicId: nodeInstance.topic.topicId ?? "",
      tunnelName: nodeInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(nodeInstance.viteHostUrl);

    const response = await setHydrationWebhook(args);

    if (response) {
      nodeInstance.setTopic(response);
    }

    expect(response.hydrateApi).toMatchObject(
      nodeInstance.topic?.hydrateApi as Record<any, any>,
    );
  });

  test("BROWSER: Set status to Inactive", async ({ page }) => {
    const args = {
      topicId: browserInstance.topic.topicId ?? "",
      tunnelName: browserInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return setStatusToInactive(args);
    }, args);

    if (response) {
      browserInstance.setTopic(response);
    }

    expect(response?.status).toBe(EStatus.Inactive);
  });

  test("NODE: Set status to Inactive", async ({ page }) => {
    const args = {
      topicId: browserInstance.topic.topicId ?? "",
      tunnelName: browserInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await setStatusToInactive(args);

    if (response) {
      browserInstance.setTopic(response);
    }

    expect(response?.status).toBe(EStatus.Inactive);
  });

  test("BROWSER: Set status to Active", async ({ page }) => {
    const args = {
      topicId: browserInstance.topic.topicId ?? "",
      tunnelName: browserInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return setStatusToActive(args);
    }, args);

    if (response) {
      browserInstance.setTopic(response);
    }

    expect(response?.status).toBe(EStatus.Active);
  });

  test("NODE: Set status to Active", async ({ page }) => {
    const args = {
      topicId: browserInstance.topic.topicId ?? "",
      tunnelName: browserInstance.tunnel.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await setStatusToActive(args);

    if (response) {
      browserInstance.setTopic(response);
    }

    expect(response?.status).toBe(EStatus.Active);
  });
});
