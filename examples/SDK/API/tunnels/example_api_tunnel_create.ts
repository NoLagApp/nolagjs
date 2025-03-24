/**
 * Create new Tunnel attached to a Project
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */

import type { IConnectOptions, ITunnelModel, IApiTunnel } from "nolagjs";
import { Api } from "nolagjs";

export interface IExampleApiTunnelCreate {
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnelName: string;
  payload: ITunnelModel;
}

export const example_api_tunnel_create = async ({
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnelName,
  payload,
}: IExampleApiTunnelCreate) => {
  /***** COPY EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel: IApiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  // tunnel payload
  const createPayload: ITunnelModel = payload ?? {
    name: tunnelName,
    // you can not create sandbox tunnels if no billing details attached to project
    sandbox: true,
  };

  const response = await apiTunnel.createTunnel(createPayload);

  /***** COPY EXAMPLE CODE END *****/

  return response;
};
