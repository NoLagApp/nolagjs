/**
 * Create new Tunnel attached to a Project
 * Can read more about this here: https://developer.nolag.app/#tunnel-topics
 */
import { env, tunnelName } from "../globalVars";

import type { ITunnelModel, IErrorMessage } from "nolagjs";
import { Api } from "nolagjs";

const tunnelNameWithTimestamp = tunnelName();

// setup connection to NoLag API
// we only need to supply the API KEY obtained from the NoLag portal
// https://developer.nolag.app/#api
const apiTunnel = Api(env.PROJECT_API_KEY, {
  host: "localhost:5001",
  protocol: "http",
  devMode: true,
});

// tunnel payload
const tunnelModel: ITunnelModel = {
  name: tunnelNameWithTimestamp,
  // you can not create sandbox tunnels if no billing details attached to project
  sandbox: true,
};

describe("Jest Api Create a Tunnel", () => {
  // happy path, create a new tunnel
  test("should create a new tunnel", async () => {
    const response = await apiTunnel.createTunnel(tunnelModel);

    const { name } = response;

    expect(name).toBe(tunnelNameWithTimestamp);
  });

  test("can not create duplicate tunnel name", async () => {
    const response = await apiTunnel.createTunnel(tunnelModel);

    const { code, msg } = response as IErrorMessage;

    expect(code).toBe(409);
    expect(msg).toBe("Duplicate resource found");
  });
});
