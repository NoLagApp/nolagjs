/**
 * Get Tunnel details attached to a Project using tunnelID
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */
import { test, expect } from "@playwright/test";

import { env, tunnelName, setTunnel, getTunnel } from "../globalVars";

import { Api } from "nolagjs";

const tunnelNameWithTimestamp = tunnelName();
const tunnel = getTunnel();

// setup connection to NoLag API
// we only need to supply the API KEY obtained from the NoLag portal
// https://developer.nolag.app/#api
const apiTunnel = Api(env.PROJECT_API_KEY, {
  host: "localhost:5001",
  protocol: "http",
  devMode: true,
});

test.describe("Playwright Api Get Tunnel", () => {
  // happy path, retrieve a list of tunnels
  test("get tunnel using tunnel ID", async ({ page }) => {
    if (!tunnel) return;

    const response = await apiTunnel.tunnel(tunnel?.tunnelId ?? "").getTunnel();

    expect(response?.name).toBe(tunnel.name);
    expect(response?.tunnelId).toBe(tunnel.tunnelId);
  });
});
