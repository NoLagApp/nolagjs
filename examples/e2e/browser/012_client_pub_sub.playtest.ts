import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { IDeviceModel } from "nolagjs";
import { EAccessPermission } from "nolagjs";
import { example_api_tunnel_device_update } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_update";
import dayjs from "dayjs";
import { example_client_tunnel_connect } from "../../SDK/Client/tunnel_instance/example_client_tunnel_connect";
import { example_client_tunnel_publish } from "../../SDK/Client/tunnel_instance/example_client_tunnel_publish";
import { example_client_tunnel_subscribe } from "../../SDK/Client/tunnel_instance/example_client_tunnel_subscribe";
import {
  example_client_tunnel_callback_on_receive
} from "../../SDK/Client/tunnel_instance/example_client_tunnel_callback_on_receive";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const noLagDeveloperTestConfigIgnoreWs =
  globalVars.noLagDeveloperTestConfigIgnoreWs;
const tunnelId = globalVars.tunnel?.tunnelId ?? "";

test.describe("Playwright client pub/sub", () => {
  test("publish/subscribe standard NO Identifier set", async ({ page }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const topicName = globalVars.topic?.name ?? "";
    const identifiers = undefined;
    const data = {
      "prop1": "data1"
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
    console.log(deviceAccessToken);

    const tunnelInstance = await example_client_tunnel_connect({
      noLagDeveloperTestConfigIgnoreWs,
      deviceToken: deviceAccessToken ?? "",
    });

    console.log(deviceAccessToken);

    await example_client_tunnel_subscribe({
      tunnelInstance,
      topicName,
      identifiers,
    });

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers,
      data
    });

   const response= await example_client_tunnel_callback_on_receive({tunnelInstance})

    expect(response?.data).toMatchObject(data);
    expect(response?.topicName).toBe(topicName);
    expect(response?.identifiers).toBeFalsy();
    expect(response?.presences).toBeFalsy();
  });
});
