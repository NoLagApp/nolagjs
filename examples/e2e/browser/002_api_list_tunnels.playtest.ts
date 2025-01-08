/**
 * List Tunnels attached to a Project
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */
import { test, expect } from "@playwright/test";

import globalVars from "../../constants/globalVars";

import { Api } from "nolagjs";
import { example_api_tunnel_list, example_api_tunnel_search_name } from "../../SDK/API/tunnels/example_api_tunnel_list";

// setup connection to NoLag API
// we only need to supply the API KEY obtained from the NoLag portal
// https://developer.nolag.app/#api
const apiTunnel = Api(globalVars.yourProjectApiKey, globalVars.noLagDeveloperTestConfigIgnore);

test.describe("Playwright Api List Tunnels", () => {
  // happy path, retrieve a list of tunnels
  test("should retrieve a list of tunnels", async ({ page }) => {
    const response = await example_api_tunnel_list();

    const { records, pagination } = response;

    const foundTunnel = records.find((i) => i.name === globalVars.tunnelName);
    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundTunnel?.name).toBe(globalVars.tunnelName);
  });

  test("query for a specific tunnel name", async ({ page }) => {
    const foundTunnel = await example_api_tunnel_search_name();

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
