import { expect, test } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import { shouldSeeAListOfDevices, shouldSeeAListOfSearchResultsForDevices } from "../procedures/010_api_device_list";

test.describe("Playwright Api list Devices", () => {
  test("BROWSER: Should see a list of devices", async ({ page }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      noLagDeveloperTestConfigIgnore:
      browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return shouldSeeAListOfDevices(args);
    }, args);

    const { records, pagination } = response;

    const foundDevice = records.find((i) => i.name === browserInstance.device.name);

    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundDevice?.name).toBe(browserInstance.device.name);
  });

  test("NODE: Should see a list of devices", async ({ page }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.device.name ?? "",
      noLagDeveloperTestConfigIgnore:
      nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
    };

    const response = await shouldSeeAListOfDevices(args);

    const { records, pagination } = response;

    const foundDevice = records.find((i) => i.name === nodeInstance.device.name);

    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundDevice?.name).toBe(nodeInstance.device.name);
  });

  test("BROWSER: Should see a list of search results for devices", async ({ page }) => {

    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      noLagDeveloperTestConfigIgnore:
      browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return shouldSeeAListOfSearchResultsForDevices(args);
    }, args);

    const { records, pagination } = response;

    const foundDevice = records.find((i) => i.name === browserInstance.device.name);

    expect(foundDevice?.name).toBe(browserInstance.device.name);
    expect(foundDevice?.deviceTokenId).toBe(browserInstance.device.deviceTokenId);
  });

  test("NODE: Should see a list of search results for devices", async ({ page }) => {

    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.device.name ?? "",
      noLagDeveloperTestConfigIgnore:
      nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
    };

    await page.goto(nodeInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return shouldSeeAListOfSearchResultsForDevices(args);
    }, args);

    const { records, pagination } = response;

    const foundDevice = records.find((i) => i.name === nodeInstance.device.name);

    expect(foundDevice?.name).toBe(nodeInstance.device.name);
    expect(foundDevice?.deviceTokenId).toBe(nodeInstance.device.deviceTokenId);
  });
});
