import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { IErrorMessage, ITunnelModel } from "nolagjs";
import { example_api_tunnel_create } from "../../SDK/API/tunnels/example_api_tunnel_create";
import {
  canNotCreateDuplicateTunnelName,
  canNotCreateEmptyTunnelName,
  shouldCreateTunnel,
} from "../procedures/001_api_tunnel_create";

const tunnelName = globalVars.tunnelName;
const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;

test.describe("Playwright Api Create a Tunnel", () => {
  test("BROWSER: Should create a new tunnel", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName,
    };

    await page.goto(globalVars.viteHostUrl);

    const { name } = await page.evaluate((args) => {
      return shouldCreateTunnel(args);
    }, args);

    expect(name).toBe(tunnelName);
  });

  test("NODE: Should create a new tunnel", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName,
    };

    args.tunnelName = `${tunnelName}_node`;

    const { name } = await shouldCreateTunnel(args);

    expect(name).toBe(args.tunnelName);
  });

  test("BROWSER: Can not create duplicate tunnel name", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName,
    };

    await page.goto(globalVars.viteHostUrl);

    const response = await page.evaluate((args) => {
      return canNotCreateDuplicateTunnelName(args);
    }, args);

    expect(response?.code).toBe(409);
    expect(response?.msg).toBe("Duplicate resource found");
  });

  test("NODE: Can not create duplicate tunnel name", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName,
    };

    const response = await canNotCreateDuplicateTunnelName(args);

    expect(response?.code).toBe(409);
    expect(response?.msg).toBe("Duplicate resource found");
  });

  test("BROWSER: Can not create empty tunnel name", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName,
    };

    await page.goto(globalVars.viteHostUrl);

    const response = await page.evaluate((args) => {
      return canNotCreateEmptyTunnelName(args);
    }, args);

    const nodeErrors = await canNotCreateEmptyTunnelName(args);

    expect(response?.code).toBe(400);
    const browserNamePropertyError = nodeErrors?.errors?.find(
      (i) => i.property === "name",
    );
    expect(browserNamePropertyError?.descriptions?.[0]).toBe(
      "should not be empty",
    );
  });

  test("NODE: Can not create empty tunnel name", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName,
    };

    const response = await canNotCreateEmptyTunnelName(args);

    expect(response?.code).toBe(400);
    const nodeNamePropertyError = response?.errors?.find(
      (i) => i.property === "name",
    );
    expect(nodeNamePropertyError?.descriptions?.[0]).toBe(
      "should not be empty",
    );
  });
});
