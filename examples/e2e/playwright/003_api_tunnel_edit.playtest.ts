import { test, expect } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import { editTunnelNameUsingTunnelId } from "../procedures/003_api_tunnel_edit";

test.describe("Playwright Api Edit Tunnel", () => {
  test("BROWSER: Edit tunnel name using tunnel ID", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore:
        browserInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: browserInstance.yourProjectApiKey,
      tunnelName: browserInstance.tunnelName,
      tunnel: browserInstance.tunnel,
    };

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate((args) => {
      return editTunnelNameUsingTunnelId(args);
    }, args);

    browserInstance.setTunnel(response);

    expect(response?.name).toBe(browserInstance.tunnel.name);
  });

  test("NODE: Edit tunnel name using tunnel ID", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore:
        nodeInstance.noLagDeveloperTestConfigIgnore,
      yourProjectApiKey: nodeInstance.yourProjectApiKey,
      tunnelName: nodeInstance.tunnelName,
      tunnel: nodeInstance.tunnel,
    };

    const response = await editTunnelNameUsingTunnelId(args);

    nodeInstance.setTunnel(response);

    expect(response?.name).toBe(nodeInstance.tunnel.name);
  });
});
