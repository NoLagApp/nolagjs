import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import { example_api_tunnel_list } from "../../SDK/API/tunnels/example_api_tunnel_list";
import type { ITunnelQuery } from "nolagjs";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;
const tunnelQuery: ITunnelQuery = {};

test.describe("Playwright Api List Tunnels", () => {
  test("should retrieve a list of tunnels", async ({ page }) => {
    const response = await example_api_tunnel_list({
      tunnelQuery,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
    });

    const { records, pagination } = response;

    const foundTunnel = records.find((i) => i.name === globalVars.tunnelName);
    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundTunnel?.name).toBe(globalVars.tunnelName);
  });

  test("query for a specific tunnel name", async ({ page }) => {
    tunnelQuery.search = globalVars.tunnelName;

    const response = await example_api_tunnel_list({
      tunnelQuery,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
    });

    const foundTunnel = response.records?.[0];

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
});
