import { expect, test } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { IDeviceQuery } from "nolagjs";
import { example_api_tunnel_device_list } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_list";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const tunnelId = globalVars.topic?.tunnelId ?? "";

const deviceQuery: IDeviceQuery = {};

test.describe("Playwright Api list Devices", () => {
  test("should see a list of devices", async ({ page }) => {

    const response = await example_api_tunnel_device_list({
      deviceQuery,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
    });

    const { records, pagination } = response;

    const foundDevice = records.find((i) => i.name === globalVars.device.name);

    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundDevice?.name).toBe(globalVars.device.name);
  });

  test("should see a list of search results for devices", async ({ page }) => {

    deviceQuery.search = globalVars.device.name;

    const response = await example_api_tunnel_device_list({
      deviceQuery,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
    });

    const { records, pagination } = response;

    const foundDevice = records.find((i) => i.name === globalVars.device.name);

    expect(foundDevice?.name).toBe(globalVars.device.name);
    expect(foundDevice?.deviceTokenId).toBe(globalVars.device.deviceTokenId);
  });
});
