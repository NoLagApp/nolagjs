import { test, expect } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import { example_api_tunnel_device_update } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_update";
import dayjs from "dayjs";
import { shouldSeeAListOfDevices } from "../procedures/010_api_device_list";
import {
  editTunnelDeviceSetAccessPermissionsPublish,
  editTunnelDeviceSetAccessPermissionsPubSub,
  editTunnelDeviceSetAccessPermissionsSubscribe,
  editTunnelDeviceUsingDeviceTokenId, lockDeviceTopics, setExpireInSeconds, setStaticTopics,
} from "../procedures/011_api_device_edit";
import { EAccessPermission } from "nolagjs";

test.describe("Playwright Api Edit Tunnel Device", () => {
  test("BROWSER: Edit tunnel device using deviceTokenId", async ({ page }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      deviceTokenId: browserInstance.device.deviceTokenId ?? "",
      topicName: browserInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"]
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return editTunnelDeviceUsingDeviceTokenId(args);
    }, args);

    if (response) {
      browserInstance.setDevice(response);
    }

    expect(response?.name).toBe(browserInstance.device.name);
  });

  test("NODE: Edit tunnel device using deviceTokenId", async ({ page }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.device.name ?? "",
      deviceTokenId: nodeInstance.device.deviceTokenId ?? "",
      topicName: nodeInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"]
    };

    const response = await editTunnelDeviceUsingDeviceTokenId(args);

    if (response) {
      nodeInstance.setDevice(response);
    }

    expect(response?.name).toBe(nodeInstance.device.name);
  });

  test("BROWSER: Edit tunnel device set access permissions - subscribe", async ({
    page,
  }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      deviceTokenId: browserInstance.device.deviceTokenId ?? "",
      topicName: browserInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"]
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return editTunnelDeviceSetAccessPermissionsSubscribe(args);
    }, args);

    if (response) {
      browserInstance.setDevice(response);
    }

    expect(response?.accessPermission).toBe(EAccessPermission.Subscribe);
  });

  test("NODE: Edit tunnel device set access permissions - subscribe", async ({
    page,
  }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.device.name ?? "",
      deviceTokenId: nodeInstance.device.deviceTokenId ?? "",
      topicName: nodeInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"]
    };

    const response = await editTunnelDeviceSetAccessPermissionsSubscribe(args);

    if (response) {
      nodeInstance.setDevice(response);
    }

    expect(response?.accessPermission).toBe(EAccessPermission.Subscribe);
  });

  test("BROWSER: Edit tunnel device set access permissions - publish", async ({
    page,
  }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      deviceTokenId: browserInstance.device.deviceTokenId ?? "",
      topicName: browserInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"]
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return editTunnelDeviceSetAccessPermissionsPublish(args);
    }, args);

    if (response) {
      browserInstance.setDevice(response);
    }

    expect(response?.accessPermission).toBe(EAccessPermission.Publish);
  });

  test("NODE: Edit tunnel device set access permissions - publish", async ({
    page,
  }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      deviceTokenId: browserInstance.device.deviceTokenId ?? "",
      topicName: browserInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"]
    };

    const response = await editTunnelDeviceSetAccessPermissionsPublish(args);

    if (response) {
      browserInstance.setDevice(response);
    }

    expect(response?.accessPermission).toBe(EAccessPermission.Publish);
  });

  test("BROWSER: Edit tunnel device set access permissions - pubsub", async ({
    page,
  }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      deviceTokenId: browserInstance.device.deviceTokenId ?? "",
      topicName: browserInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"]
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return editTunnelDeviceSetAccessPermissionsPubSub(args);
    }, args);

    if (response) {
      browserInstance.setDevice(response);
    }

    expect(response?.accessPermission).toBe(EAccessPermission.Publish);
  });

  test("NODE: Edit tunnel device set access permissions - pubsub", async ({
    page,
  }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.device.name ?? "",
      deviceTokenId: nodeInstance.device.deviceTokenId ?? "",
      topicName: nodeInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"]
    };

    const response = await editTunnelDeviceSetAccessPermissionsPubSub(args);

    if (response) {
      nodeInstance.setDevice(response);
    }

    expect(response?.accessPermission).toBe(EAccessPermission.Publish);
  });

  test("BROWSER: Set staticTopics", async ({ page }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      deviceTokenId: browserInstance.device.deviceTokenId ?? "",
      topicName: browserInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
      browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"],
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return setStaticTopics(args);
    }, args);

    if (response) {
      browserInstance.setDevice(response);
    }

    expect(response?.staticTopics?.[0]?.name).toBe(browserInstance.topic?.name);
    expect(response?.staticTopics?.[0]?.identifiers).toMatchObject(args.identifiers);
    expect(response?.name).toBe(browserInstance.device?.name);
  });

  test("NODE: Set staticTopics", async ({ page }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.device.name ?? "",
      deviceTokenId: nodeInstance.device.deviceTokenId ?? "",
      topicName: nodeInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
      nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"],
    };

    const response = await setStaticTopics(args);

    if (response) {
      nodeInstance.setDevice(response);
    }

    expect(response?.staticTopics?.[0]?.name).toBe(nodeInstance.topic?.name);
    expect(response?.staticTopics?.[0]?.identifiers).toMatchObject(args.identifiers);
    expect(response?.name).toBe(nodeInstance.device?.name);
  });

  test("Browser: Lock device topics", async ({ page }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      deviceTokenId: browserInstance.device.deviceTokenId ?? "",
      topicName: browserInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
      browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"],
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return lockDeviceTopics(args);
    }, args);

    if (response) {
      browserInstance.setDevice(response);
    }

    expect(response?.staticTopics?.[0]?.name).toBe(browserInstance.topic?.name);
    expect(response?.staticTopics?.[0]?.identifiers).toMatchObject(args.identifiers);
    expect(response?.lockTopics).toBeTruthy();
    expect(response?.name).toBe(browserInstance.device?.name);
  });

  test("NODE: Lock device topics", async ({ page }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.device.name ?? "",
      deviceTokenId: nodeInstance.device.deviceTokenId ?? "",
      topicName: nodeInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
      nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"],
    };

    const response = await lockDeviceTopics(args);

    if (response) {
      nodeInstance.setDevice(response);
    }

    expect(response?.staticTopics?.[0]?.name).toBe(nodeInstance.topic?.name);
    expect(response?.staticTopics?.[0]?.identifiers).toMatchObject(args.identifiers);
    expect(response?.lockTopics).toBeTruthy();
    expect(response?.name).toBe(nodeInstance.device?.name);
  });

  test("BROWSER: set expireIn seconds", async ({ page }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      deviceTokenId: browserInstance.device.deviceTokenId ?? "",
      topicName: browserInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
      browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"],
      expireIn: 14400
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return setExpireInSeconds(args);
    }, args);

    if (response) {
      browserInstance.setDevice(response);
    }

    expect(response?.staticTopics?.[0]?.name).toBe(browserInstance.topic?.name);
    expect(response?.staticTopics?.[0]?.identifiers).toMatchObject(args.identifiers);
    expect(response?.lockTopics).toBeTruthy();
    expect(response?.expireIn).toBe(args.expireIn);
    expect(
      Math.abs(
        (response?.expireDate ?? 0) - dayjs().add(args.expireIn, "seconds").unix(),
      ),
    ).toBeLessThanOrEqual(2);
    expect(response?.name).toBe(browserInstance.device?.name);
  });

  test("NODE: set expireIn seconds", async ({ page }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.device.name ?? "",
      deviceTokenId: nodeInstance.device.deviceTokenId ?? "",
      topicName: nodeInstance.topic.name ?? "",
      noLagDeveloperTestConfigIgnore:
      nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      identifiers: ["identifier1", "identifier2"],
      expireIn: 14400
    };

    await page.goto(nodeInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return setExpireInSeconds(args);
    }, args);

    if (response) {
      nodeInstance.setDevice(response);
    }

    expect(response?.staticTopics?.[0]?.name).toBe(nodeInstance.topic?.name);
    expect(response?.staticTopics?.[0]?.identifiers).toMatchObject(args.identifiers);
    expect(response?.lockTopics).toBeTruthy();
    expect(response?.expireIn).toBe(args.expireIn);
    expect(
      Math.abs(
        (response?.expireDate ?? 0) - dayjs().add(args.expireIn, "seconds").unix(),
      ),
    ).toBeLessThanOrEqual(2);
    expect(response?.name).toBe(nodeInstance.device?.name);
  });
});
