/**
 * Get Tunnels details from tunnelID
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */

import type { IConnectOptions, ITunnelModel } from "nolagjs";
import { Api } from "nolagjs";

export interface IExampleApiTunnelGet {
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnel: ITunnelModel;
}

export const example_api_tunnel_get = async ({
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnel,
}: IExampleApiTunnelGet) => {
  /***** EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const response = await apiTunnel.tunnel(tunnel?.tunnelId ?? "").getTunnel();

  /***** EXAMPLE CODE END *****/

  return response;
};
