import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import { example_api_tunnel_get } from "../../SDK/API/tunnels/example_api_tunnel_get";
import { editTunnelNameUsingTunnelId } from "../procedures/003_api_tunnel_edit";
import { getTunnelUsingTunnelId } from "../procedures/004_api_tunnel_get";

const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;

test.describe("Playwright Api Get Tunnel", () => {
  test("BROWSER: Get tunnel using tunnel ID", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnel: globalVars.tunnel
    };

    await page.goto(globalVars.viteHostUrl);

    const response = await page.evaluate((args) => {
      return getTunnelUsingTunnelId(args);
    }, args);

    expect(response?.name).toBe(globalVars.tunnel.name);
    expect(response?.tunnelId).toBe(globalVars.tunnel.tunnelId);
  });

  test("NODE: Get tunnel using tunnel ID", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnel: globalVars.tunnel
    };

    const response = await getTunnelUsingTunnelId(args);

    expect(response?.name).toBe(globalVars.tunnel.name);
    expect(response?.tunnelId).toBe(globalVars.tunnel.tunnelId);
  });
});
