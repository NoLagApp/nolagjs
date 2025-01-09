/**
 * Delete Tunnel using tunnelID
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */

import { Api, type IConnectOptions, type ITunnelModel } from "nolagjs";

export interface IExampleApiTunnelDelete {
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnel: ITunnelModel;
}

export const example_api_tunnel_delete = async ({
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnel,
}: IExampleApiTunnelDelete) => {
  /***** EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const response = await apiTunnel
    .tunnel(tunnel?.tunnelId ?? "")
    .deleteTunnel();

  /***** EXAMPLE CODE END *****/

  return response;
};
