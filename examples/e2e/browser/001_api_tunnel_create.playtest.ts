import { test, expect } from "@playwright/test";
import globalVars from "../../constants/globalVars";
import type { IErrorMessage, ITunnelModel } from "nolagjs";
import { example_api_tunnel_create } from "../../SDK/API/tunnels/example_api_tunnel_create";

const tunnelName = globalVars.tunnelName;
const yourProjectApiKey = globalVars.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  globalVars.noLagDeveloperTestConfigIgnore;

// tunnel payload
const payload: ITunnelModel = {
  name: tunnelName,
  // you can not create sandbox tunnels if no billing details attached to project
  sandbox: true,
};

test.describe("Playwright Api Create a Tunnel", () => {
  test("should create a new tunnel", async ({ page }) => {
    const response = await example_api_tunnel_create({
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelName,
      payload,
    });

    const { name } = response;

    expect(name).toBe(globalVars.tunnelName);
  });

  test("can not create duplicate tunnel name", async ({ page }) => {
    const response = await example_api_tunnel_create({
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelName,
      payload,
    });

    const { code, msg } = response as IErrorMessage;

    expect(code).toBe(409);
    expect(msg).toBe("Duplicate resource found");
  });

  test("can not create empty tunnel name", async ({ page }) => {
    const emptyTunnelName = "";
    payload.name = emptyTunnelName;

    const response = await example_api_tunnel_create({
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelName: emptyTunnelName,
      payload,
    });

    const { code, errors } = response as IErrorMessage;
    const NameProperty = errors?.find((i) => i.property === "name");

    expect(code).toBe(400);
    expect(NameProperty?.descriptions?.[0]).toBe("should not be empty");
  });
});
