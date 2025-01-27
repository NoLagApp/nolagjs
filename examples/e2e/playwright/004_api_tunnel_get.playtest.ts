import { test, expect } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import { getTunnelUsingTunnelId } from "../procedures/004_api_tunnel_get";

test.describe("Playwright Api Get Tunnel", () => {
  test("BROWSER: Get tunnel using tunnel ID", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore: browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnel: browserInstance.tunnel
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return getTunnelUsingTunnelId(args);
    }, args);

    expect(response?.name).toBe(browserInstance.tunnel.name);
    expect(response?.tunnelId).toBe(browserInstance.tunnel.tunnelId);
  });

  test("NODE: Get tunnel using tunnel ID", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore: nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      tunnel: nodeInstance.tunnel
    };

    const response = await getTunnelUsingTunnelId(args);

    expect(response?.name).toBe(nodeInstance.tunnel.name);
    expect(response?.tunnelId).toBe(nodeInstance.tunnel.tunnelId);
  });
});
