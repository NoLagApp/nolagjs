import { expect, test } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { IDeviceModel, IErrorMessage } from "nolagjs";
import { EAccessPermission } from "nolagjs";
import { example_api_tunnel_topic_list } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_list";
import { example_api_tunnel_device_create } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_create";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const tunnelId = globalVars.topic?.tunnelId ?? "";

const payload: IDeviceModel = {
  name: globalVars.deviceName,
  accessPermission: EAccessPermission.PubSub
};

test.describe("Playwright Api Create Device", () => {
  test("should create a new device", async ({ page }) => {

    const response = await example_api_tunnel_device_create({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      deviceName: globalVars.deviceName,
      tunnelId,
    });

    expect(response?.name).toBe(globalVars.deviceName);
  });

  test("can not create duplicate device name", async ({ page }) => {
    const response = await example_api_tunnel_device_create({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      deviceName: globalVars.deviceName,
      tunnelId,
    });

    const { code, msg } = response as IErrorMessage;

    expect(code).toBe(409);
    expect(msg).toBe("Duplicate resource found");
  });

  test("can not create empty device name", async ({ page }) => {
    payload.name = "";

    const response = await example_api_tunnel_device_create({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      deviceName: "",
      tunnelId,
    });

    const { code, errors } = response as IErrorMessage;
    const NameProperty = errors?.find((i) => i.property === "name");

    expect(code).toBe(400);
    expect(NameProperty?.descriptions?.[0]).toBe("should not be empty");
  });
});
