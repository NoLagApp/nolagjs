import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import { EAccessPermission, IDeviceModel } from "nolagjs";
import { example_api_tunnel_device_update } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_update";
import dayjs from "dayjs";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const tunnelId = globalVars.tunnel?.tunnelId ?? "";

test.describe("Playwright Api Edit Tunnel Device", () => {
  test("edit tunnel device using deviceTokenId", async ({ page }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: IDeviceModel = {
      name: `${globalVars.deviceName}_edited`,
    };

    const response = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (response) {
      globalVars.setDevice(response);
    }

    expect(response?.name).toBe(globalVars.device.name);
  });

  test("edit tunnel device set access permissions - subscribe", async ({
    page,
  }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: IDeviceModel = {
      accessPermission: EAccessPermission.Subscribe,
    };

    const response = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (response) {
      globalVars.setDevice(response);
    }

    expect(response?.accessPermission).toBe(EAccessPermission.Subscribe);
  });

  test("edit tunnel device set access permissions - publish", async ({
    page,
  }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: IDeviceModel = {
      accessPermission: EAccessPermission.Publish,
    };

    const response = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (response) {
      globalVars.setDevice(response);
    }

    expect(response?.accessPermission).toBe(EAccessPermission.Publish);
  });

  test("edit tunnel device set access permissions - pubsub", async ({
    page,
  }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: IDeviceModel = {
      accessPermission: EAccessPermission.Publish,
    };

    const response = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (response) {
      globalVars.setDevice(response);
    }

    expect(response?.accessPermission).toBe(EAccessPermission.Publish);
  });

  test("set staticTopics", async ({ page }) => {
    const topic = globalVars.topic;
    const identifiers = ["identifier1", "identifier2"];

    if (!topic) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: IDeviceModel = {
      staticTopics: [
        {
          name: globalVars.topic?.name ?? "",
          identifiers,
        },
      ],
    };

    const response = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (response) {
      globalVars.setDevice(response);
    }

    expect(response?.staticTopics?.[0]?.name).toBe(globalVars.topic?.name);
    expect(response?.staticTopics?.[0]?.identifiers).toMatchObject(identifiers);
    expect(response?.name).toBe(globalVars.device?.name);
  });

  test("lock device topics", async ({ page }) => {
    const topic = globalVars.topic;
    const identifiers = ["identifier1", "identifier2"];

    if (!topic) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: IDeviceModel = {
      lockTopics: true,
    };

    const response = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (response) {
      globalVars.setDevice(response);
    }

    expect(response?.staticTopics?.[0]?.name).toBe(globalVars.topic?.name);
    expect(response?.staticTopics?.[0]?.identifiers).toMatchObject(identifiers);
    expect(response?.lockTopics).toBeTruthy();
    expect(response?.name).toBe(globalVars.device?.name);
  });

  test("set expireIn seconds", async ({ page }) => {
    const topic = globalVars.topic;
    const identifiers = ["identifier1", "identifier2"];
    const expireIn = 14400; // 4 hours in seconds

    if (!topic) {
      expect(false).toBeTruthy();
      return;
    }

    const payload: IDeviceModel = {
      expireIn,
    };

    const response = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (response) {
      globalVars.setDevice(response);
    }

    expect(response?.staticTopics?.[0]?.name).toBe(globalVars.topic?.name);
    expect(response?.staticTopics?.[0]?.identifiers).toMatchObject(identifiers);
    expect(response?.lockTopics).toBeTruthy();
    expect(response?.expireIn).toBe(expireIn);
    expect(
      Math.abs(
        (response?.expireDate ?? 0) - dayjs().add(expireIn, "seconds").unix(),
      ),
    ).toBeLessThanOrEqual(2);
    expect(response?.name).toBe(globalVars.device?.name);
  });
});
