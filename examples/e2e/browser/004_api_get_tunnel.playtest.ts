/**
 * Get Tunnel details attached to a Project using tunnelID
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */
import { test, expect } from "@playwright/test";

import globalVars from "../../constants/globalVars";

import { Api } from "nolagjs";

// setup connection to NoLag API
// we only need to supply the API KEY obtained from the NoLag portal
// https://developer.nolag.app/#api
const apiTunnel = Api(globalVars.yourProjectApiKey, globalVars.noLagDeveloperTestConfigIgnore);

test.describe("Playwright Api Get Tunnel", () => {
  // happy path, retrieve a list of tunnels
  test("get tunnel using tunnel ID", async ({ page }) => {
    if (!globalVars.tunnel) {
      expect(false).toBeTruthy()
      return;
    }

    const response = await apiTunnel.tunnel(globalVars.tunnel?.tunnelId ?? "").getTunnel();

    expect(response?.name).toBe(globalVars.tunnel.name);
    expect(response?.tunnelId).toBe(globalVars.tunnel.tunnelId);
  });
});
