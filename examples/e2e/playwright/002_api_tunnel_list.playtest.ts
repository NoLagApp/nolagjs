import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { ITunnelQuery } from "nolagjs";
import { queryForASpecificTunnel, shouldRetrieveAListOfTunnels } from "../procedures/002_api_tunnel_list";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const tunnelQuery: ITunnelQuery = {};

test.describe("Playwright Api List Tunnels", () => {
  test("BROWSER: Should retrieve a list of tunnels", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName: globalVars.tunnelName,
    };

    await page.goto(globalVars.viteHostUrl);

    const { records, pagination } = await page.evaluate((args) => {
      return shouldRetrieveAListOfTunnels(args);
    }, args);

    const foundTunnel = records.find((i) => i.name === globalVars.tunnelName);

    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundTunnel?.name).toBe(globalVars.tunnelName);
  });

  test("NODE: Should retrieve a list of tunnels", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName: globalVars.tunnelName,
    };

    const { records, pagination } = await shouldRetrieveAListOfTunnels(args);

    const foundTunnel = records.find((i) => i.name === globalVars.tunnelName);

    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundTunnel?.name).toBe(globalVars.tunnelName);
  });

  test("BROWSER: Query for a specific tunnel name", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName: globalVars.tunnelName,
    };

    await page.goto(globalVars.viteHostUrl);

    const foundTunnel = await page.evaluate((args) => {
      return queryForASpecificTunnel(args);
    }, args);

    if (!foundTunnel) {
      expect(false).toBeTruthy();
      return;
    }

    // WE HAVE TO set the tunnelId for the rest of the e2e tests to work
    if (foundTunnel.tunnelId) {
      globalVars.setTunnel(foundTunnel);
    }

    expect(foundTunnel?.name).toBe(globalVars.tunnelName);
  });

  test("NODE: Query for a specific tunnel name", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName: globalVars.tunnelName,
    };

    const foundTunnel = await queryForASpecificTunnel(args);

    if (!foundTunnel) {
      expect(false).toBeTruthy();
      return;
    }

    expect(foundTunnel?.name).toBe(globalVars.tunnelName);
  });
});
