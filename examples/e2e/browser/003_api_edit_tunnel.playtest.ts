/**
 * Edit Tunnel details attached to a Project using tunnelID
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */
import { test, expect } from "@playwright/test";

import globalVars from "../../constants/globalVars";

import { Api } from "nolagjs";

import { example_api_tunnel_edit_name } from "../../SDK/API/tunnels/example_api_tunnel_edit";

// setup connection to NoLag API
// we only need to supply the API KEY obtained from the NoLag portal
// https://developer.nolag.app/#api
const apiTunnel = Api(globalVars.yourProjectApiKey, globalVars.noLagDeveloperTestConfigIgnore);

test.describe("Playwright Api Edit Tunnel", () => {
  // happy path, retrieve a list of tunnels
  test("edit tunnel name using tunnel ID", async ({ page }) => {
    const response = await example_api_tunnel_edit_name();

    globalVars.setTunnel(response);

    expect(response?.name).toBe(globalVars.tunnel.name);
  });
});
