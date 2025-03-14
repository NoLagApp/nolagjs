/**
 * Update Tunnel details attached to a Project using tunnelID
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */

import type { IConnectOptions, ITopicModel, ITunnelModel } from "nolagjs";
import { Api } from "nolagjs";

export interface IExampleApiTunnelEdit {
  payload: ITunnelModel;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnel: ITunnelModel;
}

export const example_api_tunnel_edit = async ({
  payload,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnel,
}: IExampleApiTunnelEdit) => {
  /***** COPY EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const tunnelId = tunnel?.tunnelId ?? "";

  // we update the name or any end-to-end data we want to test
  const updatePayload: ITunnelModel = payload
    ? payload
    : {
        name: `updated_tunnel_name`,
      };

  const response = await apiTunnel.tunnel(tunnelId).updateTunnel(updatePayload);

  /***** COPY EXAMPLE CODE END *****/

  return response;
};
