import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import { example_api_tunnel_get } from "../../SDK/API/tunnels/example_api_tunnel_get";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;

test.describe("Playwright Api Get Tunnel", () => {
  // happy path, retrieve a list of tunnels
  test("get tunnel using tunnel ID", async ({ page }) => {
    if (!globalVars.tunnel) {
      expect(false).toBeTruthy();
      return;
    }

    const response = await example_api_tunnel_get({
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnel: globalVars.tunnel,
    });

    expect(response?.name).toBe(globalVars.tunnel.name);
    expect(response?.tunnelId).toBe(globalVars.tunnel.tunnelId);
  });
});
