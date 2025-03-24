import type { IErrorMessage, ITunnelModel } from "nolagjs";
import { example_api_tunnel_create } from "../../SDK/API/tunnels/example_api_tunnel_create";

export interface IApiTunnelCreate {
  tunnelName: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
}

// tunnel payload
const payload: ITunnelModel = {
  // you can not create sandbox tunnels if no billing details attached to project
  sandbox: true,
};

export const shouldCreateTunnel = async ({
  tunnelName,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTunnelCreate) => {
  payload.name = tunnelName;

  return example_api_tunnel_create({
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelName,
    payload,
  });
};

export const canNotCreateDuplicateTunnelName = async ({
  tunnelName,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTunnelCreate) => {
  try {
    payload.name = tunnelName;

    await example_api_tunnel_create({
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelName,
      payload,
    });
  } catch (error) {
    return error as IErrorMessage;
  }
};

export const canNotCreateEmptyTunnelName = async ({
  tunnelName,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTunnelCreate) => {
  try {
    payload.name = "";

    await example_api_tunnel_create({
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelName,
      payload,
    });
  } catch (error) {
    return error as IErrorMessage;
  }
};
