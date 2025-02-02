import { expect, test } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import type { IErrorMessage } from "nolagjs";
import {
  canNotCreateDuplicateDeviceName,
  canNotCreateEmptyDeviceName,
  shouldCreateNewDevice,
} from "../procedures/009_api_device_create";

test.describe("Playwright Api Create Device", () => {
  test("BROWSER: Should create a new device", async ({ page }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.deviceName ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return shouldCreateNewDevice(args);
    }, args);

    if (response) {
      browserInstance.setDevice(response);
    }

    expect(response?.name).toBe(browserInstance.deviceName);
  });

  test("NODE: Should create a new device", async ({ page }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.deviceName ?? "",
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
    };

    const response = await shouldCreateNewDevice(args);

    if (response) {
      nodeInstance.setDevice(response);
    }

    expect(response?.name).toBe(nodeInstance.deviceName);
  });

  test("BROWSER: Can not create duplicate device name", async ({ page }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return canNotCreateDuplicateDeviceName(args);
    }, args);

    const { code, msg } = response as IErrorMessage;

    expect(code).toBe(409);
    expect(msg).toBe("Duplicate resource found");
  });

  test("NODE: Can not create duplicate device name", async ({ page }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.device.name ?? "",
      noLagDeveloperTestConfigIgnore:
      nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
    };

    const response = await canNotCreateDuplicateDeviceName(args);

    const { code, msg } = response as IErrorMessage;

    expect(code).toBe(409);
    expect(msg).toBe("Duplicate resource found");
  });

  test("BROWSER: Can not create empty device name", async ({ page }) => {
    const args = {
      tunnelId: browserInstance.tunnel.tunnelId ?? "",
      deviceName: browserInstance.device.name ?? "",
      noLagDeveloperTestConfigIgnore:
      browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return canNotCreateEmptyDeviceName(args);
    }, args);

    const { code, errors, msg } = response as IErrorMessage;
    const NameProperty = errors?.find((i) => i.property === "name");

    expect(code).toBe(400);
    expect(NameProperty?.descriptions?.[0]).toBe("should not be empty");
  });

  test("NODE: Can not create empty device name", async ({ page }) => {
    const args = {
      tunnelId: nodeInstance.tunnel.tunnelId ?? "",
      deviceName: nodeInstance.device.name ?? "",
      noLagDeveloperTestConfigIgnore:
      nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
    };

    const response = await canNotCreateEmptyDeviceName(args);

    const { code, errors } = response as IErrorMessage;
    const NameProperty = errors?.find((i) => i.property === "name");

    expect(code).toBe(400);
    expect(NameProperty?.descriptions?.[0]).toBe("should not be empty");
  });
});
