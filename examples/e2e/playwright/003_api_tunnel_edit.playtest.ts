import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { ITunnelModel } from "nolagjs";
import { example_api_tunnel_edit } from "../../SDK/API/tunnels/example_api_tunnel_update";
import { editTunnelNameUsingTunnelId } from "../procedures/003_api_tunnel_edit";
import { shouldRetrieveAListOfTunnels } from "../procedures/002_api_tunnel_list";

const tunnelName = globalVars.tunnelName;
const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;

// tunnel payload
const payload: ITunnelModel = {
  name: `updated_${tunnelName}`,
};

editTunnelNameUsingTunnelId

test.describe("Playwright Api Edit Tunnel", () => {
  test("BROWSER: Edit tunnel name using tunnel ID", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName: globalVars.tunnelName,
      tunnel: globalVars.tunnel
    };

    await page.goto(globalVars.viteHostUrl);

    const response = await page.evaluate((args) => {
      return editTunnelNameUsingTunnelId(args);
    }, args);

    globalVars.setTunnel(response);

    expect(response?.name).toBe(globalVars.tunnel.name);
  });

  test("NODE: Edit tunnel name using tunnel ID", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName: globalVars.tunnelName,
      tunnel: globalVars.tunnel
    };

    const response = await editTunnelNameUsingTunnelId(args);

    globalVars.setTunnel(response);

    expect(response?.name).toBe(globalVars.tunnel.name);
  });
});
