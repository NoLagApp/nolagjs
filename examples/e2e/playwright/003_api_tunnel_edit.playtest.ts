import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { ITunnelModel } from "nolagjs";
import { example_api_tunnel_edit } from "../../SDK/API/tunnels/example_api_tunnel_update";

const tunnelName = globalVars.tunnelName;
const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;

// tunnel payload
const payload: ITunnelModel = {
  name: `updated_${tunnelName}`,
};

test.describe("Playwright Api Edit Tunnel", () => {
  test("edit tunnel name using tunnel ID", async ({ page }) => {
    const response = await example_api_tunnel_edit({
      tunnel: globalVars.tunnel ?? "",
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      payload,
    });

    globalVars.setTunnel(response);

    expect(response?.name).toBe(globalVars.tunnel.name);
  });
});
