import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { IDeviceModel, ITopic } from "nolagjs";
import { EAccessPermission } from "nolagjs";
import { example_api_tunnel_device_update } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_update";
import dayjs from "dayjs";
import { example_client_tunnel_connect } from "../../SDK/Client/tunnel_instance/example_client_tunnel_connect";
import { example_client_tunnel_publish } from "../../SDK/Client/tunnel_instance/example_client_tunnel_publish";
import { example_client_tunnel_subscribe } from "../../SDK/Client/tunnel_instance/example_client_tunnel_subscribe";
import { example_client_tunnel_callback_on_receive } from "../../SDK/Client/tunnel_instance/example_client_tunnel_callback_on_receive";
import { example_api_tunnel_device_create } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_create";
import { example_client_topic_set_presence } from "../../SDK/Client/topic_instance/example_client_topic_set_presence";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const noLagDeveloperTestConfigIgnoreWs =
  globalVars.noLagDeveloperTestConfigIgnoreWs;
const tunnelId = globalVars.tunnel?.tunnelId ?? "";

test.describe("Playwright client pub/sub", () => {
  test("publish/subscribe standard NO Identifier set and NO presences set", async ({
    page,
  }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const topicName = globalVars.topic?.name ?? "";
    const identifiers = undefined;
    const data = {
      prop1: "data1",
    };

    // reset device
    const payload: IDeviceModel = {
      name: globalVars.deviceName,
      accessPermission: EAccessPermission.PubSub,
      staticTopics: [],
      lockTopics: false,
      expireIn: 0,
    };

    const resetResponse = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (resetResponse) {
      globalVars.setDevice(resetResponse);
    }

    const { deviceAccessToken } = resetResponse;

    const tunnelInstance = await example_client_tunnel_connect({
      noLagDeveloperTestConfigIgnoreWs,
      deviceToken: deviceAccessToken ?? "",
    });

    await example_client_tunnel_subscribe({
      tunnelInstance,
      topicName,
      identifiers,
    });

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers,
      data,
    });

    const response = await example_client_tunnel_callback_on_receive({
      tunnelInstance,
    });

    expect(data).toMatchObject(response?.data);
    expect(topicName).toBe(response?.topicName);
    expect(0).toBe(response?.identifiers.length);
    expect(0).toBe(response?.presences.length);
  });

  test("publish/subscribe standard with Identifiers set and NO presences set", async ({
    page,
  }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const topicName = globalVars.topic?.name ?? "";
    const identifiers = ["identifier1", "identifier2"];
    const data = {
      prop1: "data1",
    };

    // reset device
    const payload: IDeviceModel = {
      name: globalVars.deviceName,
      accessPermission: EAccessPermission.PubSub,
      staticTopics: [],
      lockTopics: false,
      expireIn: 0,
    };

    const resetResponse = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (resetResponse) {
      globalVars.setDevice(resetResponse);
    }

    const { deviceAccessToken } = resetResponse;

    const tunnelInstance = await example_client_tunnel_connect({
      noLagDeveloperTestConfigIgnoreWs,
      deviceToken: deviceAccessToken ?? "",
    });

    await example_client_tunnel_subscribe({
      tunnelInstance,
      topicName,
      identifiers,
    });

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers,
      data,
    });

    const response = await example_client_tunnel_callback_on_receive({
      tunnelInstance,
    });

    expect(data).toMatchObject(response?.data);
    expect(topicName).toBe(response?.topicName);
    expect(identifiers).toMatchObject(response?.identifiers);
    expect(0).toBe(response?.presences.length);
  });

  test("publish/subscribe standard set presences", async ({ page }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const topicName = globalVars.topic?.name ?? "";
    const identifiers = ["identifier1", "identifier2"];
    const data = {
      prop1: "data1",
    };
    const presenceData = {
      prop1: "presenceData1",
    };

    // reset device
    const payload: IDeviceModel = {
      name: globalVars.deviceName,
      accessPermission: EAccessPermission.PubSub,
      staticTopics: [],
      lockTopics: false,
      expireIn: 0,
    };

    const resetResponse = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (resetResponse) {
      globalVars.setDevice(resetResponse);
    }

    payload.name = `${globalVars.deviceName}_presence_1`;

    const { deviceAccessToken: secondDeviceAccessToken } =
      await example_api_tunnel_device_create({
        payload,
        yourProjectApiKey,
        noLagDeveloperTestConfigIgnore,
        tunnelId,
        deviceName: payload.name,
      });

    const { deviceAccessToken } = resetResponse;

    const tunnelInstanceOne = await example_client_tunnel_connect({
      noLagDeveloperTestConfigIgnoreWs,
      deviceToken: deviceAccessToken ?? "",
    });

    const tunnelInstanceTwo = await example_client_tunnel_connect({
      noLagDeveloperTestConfigIgnoreWs,
      deviceToken: secondDeviceAccessToken ?? "",
    });

    await example_client_tunnel_subscribe({
      tunnelInstance: tunnelInstanceOne,
      topicName,
      identifiers,
    });

    await example_client_tunnel_subscribe({
      tunnelInstance: tunnelInstanceTwo,
      topicName,
      identifiers,
    });

    const topicInstanceTwo = tunnelInstanceTwo.getTopic(topicName);
    
    await example_client_topic_set_presence({
      topicInstance: topicInstanceTwo as ITopic,
      presenceData: presenceData,
    });

    const response = await example_client_tunnel_callback_on_receive({
      tunnelInstance: tunnelInstanceTwo,
    });

    expect(topicName).toBe(response?.topicName);
    expect(identifiers).toMatchObject(response?.identifiers);
    expect(JSON.stringify(presenceData)).toBe(response?.presences.shift());
  });
});
