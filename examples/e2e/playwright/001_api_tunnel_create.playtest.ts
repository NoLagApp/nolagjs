import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { IErrorMessage, ITunnelModel } from "nolagjs";
import { example_api_tunnel_create } from "../../SDK/API/tunnels/example_api_tunnel_create";
import {
  canNotCreateDuplicateTunnelName, canNotCreateEmptyTunnelName,
  shouldCreateTunnel,
} from "../procedures/001_api_tunnel_create";

const tunnelName = globalVars.tunnelName;
const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;

// test.beforeAll(async () => {
//   viteServer = exec(
//     "yarn viteHost",
//     { cwd: parentDir },
//     (err, stdout, stderr) => {
//       if (err) {
//         console.error(`Error starting Vite: ${stderr}`);
//       } else {
//         console.log(`Vite output: ${stdout}`);
//       }
//     },
//   );
//
//   // Wait for the server to be ready
//   await new Promise((resolve) => setTimeout(resolve, 2000));
// });
//
// test.afterAll(() => {
//   if (viteServer) viteServer.kill();
// });

test.describe("Playwright Api Create a Tunnel", () => {
  test("should create a new tunnel", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName,
    };

    await page.goto(globalVars.viteHostUrl);

    const responseBrowser = await page.evaluate((args) => {
      return shouldCreateTunnel(args);
    }, args);

    args.tunnelName = `${tunnelName}_node`;

    const responseNode = await shouldCreateTunnel(args);

    const { name: nameBrowser } = responseBrowser;
    const { name: nameNode } = responseNode;

    expect(nameBrowser).toBe(tunnelName);
    expect(nameNode).toBe(args.tunnelName);
  });

  test("can not create duplicate tunnel name", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName,
    };

    await page.goto(globalVars.viteHostUrl);

    const browserErrors = await page.evaluate((args) => {
      return canNotCreateDuplicateTunnelName(args);
    }, args);

    const nodeErrors = await canNotCreateDuplicateTunnelName(args);

    expect(browserErrors?.code).toBe(409);
    expect(browserErrors?.msg).toBe("Duplicate resource found");

    expect(nodeErrors?.code).toBe(409);
    expect(nodeErrors?.msg).toBe("Duplicate resource found");
  });

  test("can not create empty tunnel name", async ({ page }) => {
    const args = {
      noLagDeveloperTestConfigIgnore,
      yourProjectApiKey,
      tunnelName,
    };

    await page.goto(globalVars.viteHostUrl);

    const browserErrors = await page.evaluate((args) => {
      return canNotCreateEmptyTunnelName(args);
    }, args);

    const nodeErrors = await canNotCreateEmptyTunnelName(args);

    expect(browserErrors?.code).toBe(400);
    const browserNamePropertyError = nodeErrors?.errors?.find((i) => i.property === "name");
    expect(browserNamePropertyError?.descriptions?.[0]).toBe("should not be empty");

    expect(nodeErrors?.code).toBe(400);
    const nodeNamePropertyError = nodeErrors?.errors?.find((i) => i.property === "name");
    expect(nodeNamePropertyError?.descriptions?.[0]).toBe("should not be empty");
  });
});
