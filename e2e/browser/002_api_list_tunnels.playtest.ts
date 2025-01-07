/**
 * List Tunnels attached to a Project
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */
import { test, expect } from "@playwright/test";

import { env, tunnelName, setTunnel } from "../globalVars";

import { Api } from "nolagjs";

const tunnelNameWithTimestamp = tunnelName();

// setup connection to NoLag API
// we only need to supply the API KEY obtained from the NoLag portal
// https://developer.nolag.app/#api
const apiTunnel = Api(env.PROJECT_API_KEY, {
  host: "localhost:5001",
  protocol: "http",
  devMode: true,
});

test.describe("Playwright Api List Tunnels", () => {
  // happy path, retrieve a list of tunnels
  test("should retrieve a list of tunnels", async ({ page }) => {
    const response = await apiTunnel.tunnels();

    const { records, pagination } = response;

    const foundTunnel = records.find((i) => i.name === tunnelNameWithTimestamp);
    expect(typeof pagination?.page === "number").toBeTruthy();
    expect(typeof pagination?.size === "number").toBeTruthy();
    expect(foundTunnel?.name).toBe(tunnelNameWithTimestamp);
  });

  test("query for a specific tunnel name", async ({ page }) => {
    const response = await apiTunnel.tunnels({
      search: tunnelNameWithTimestamp,
    });

    const { records } = response;

    const foundTunnel = records?.[0];

    if (!foundTunnel) {
      expect(false).toBeTruthy();
      return;
    }

    // WE HAVE TO set the tunnelId for the rest of the e2e tests to work
    if (foundTunnel.tunnelId) {
      setTunnel(foundTunnel);
    }

    expect(foundTunnel?.name).toBe(tunnelNameWithTimestamp);
  });
});
