import { test, expect } from "@playwright/test";

import globalVars from "../../constants/globalVars";

import type { IErrorMessage } from "nolagjs";
import { example_api_tunnel_create } from "../../SDK/API/tunnels/example_api_tunnel_create";

test.describe("Playwright Api Create a Tunnel", () => {
  test("should create a new tunnel", async ({ page }) => {
    const response = await example_api_tunnel_create();

    const { name } = response;

    expect(name).toBe(globalVars.tunnelName);
  });

  test("can not create duplicate tunnel name", async ({ page }) => {
    const response = await example_api_tunnel_create();

    const { code, msg } = response as IErrorMessage;

    expect(code).toBe(409);
    expect(msg).toBe("Duplicate resource found");
  });
});
