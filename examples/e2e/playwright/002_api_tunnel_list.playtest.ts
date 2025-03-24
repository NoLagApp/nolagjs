import { test, expect } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import {
  queryForASpecificTunnel,
  shouldRetrieveAListOfTunnels,
} from "../procedures/002_api_tunnel_list";

test.describe("Playwright Api List Tunnels", () => {
  test("BROWSER: Should retrieve a list of tunnels", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelName: browserInstance.tunnelName,
    };

    await page.goto(browserInstance.viteHostUrl);

    const { records, pagination } = await page.evaluate((args) => {
      return shouldRetrieveAListOfTunnels(args);
    }, args);

    const foundTunnel = records.find(
      (i) => i.name === browserInstance.tunnelName,
    );

    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundTunnel?.name).toBe(browserInstance.tunnelName);
  });

  test("NODE: Should retrieve a list of tunnels", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      tunnelName: nodeInstance.tunnelName,
    };

    const { records, pagination } = await shouldRetrieveAListOfTunnels(args);

    const foundTunnel = records.find((i) => i.name === nodeInstance.tunnelName);

    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundTunnel?.name).toBe(nodeInstance.tunnelName);
  });

  test("BROWSER: Query for a specific tunnel name", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelName: browserInstance.tunnelName,
    };

    await page.goto(browserInstance.viteHostUrl);

    const foundTunnel = await page.evaluate((args) => {
      return queryForASpecificTunnel(args);
    }, args);

    if (!foundTunnel) {
      expect(false).toBeTruthy();
      return;
    }

    // WE HAVE TO set the tunnelId for the rest of the e2e tests to work
    if (foundTunnel.tunnelId) {
      browserInstance.setTunnel(foundTunnel);
    }

    expect(foundTunnel?.name).toBe(browserInstance.tunnelName);
  });

  test("NODE: Query for a specific tunnel name", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      tunnelName: nodeInstance.tunnelName,
    };

    const foundTunnel = await queryForASpecificTunnel(args);

    if (!foundTunnel) {
      expect(false).toBeTruthy();
      return;
    }

    // WE HAVE TO set the tunnelId for the rest of the e2e tests to work
    if (foundTunnel.tunnelId) {
      nodeInstance.setTunnel(foundTunnel);
    }

    expect(foundTunnel?.name).toBe(nodeInstance.tunnelName);
  });
});
