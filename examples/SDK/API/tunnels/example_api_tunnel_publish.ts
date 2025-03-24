/**
 * Update Tunnel details attached to a Project using tunnelID
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */

import type { IConnectOptions, IHttpPublish, ITunnelModel } from "nolagjs";
import { Api, stringToBuffer } from "nolagjs";

export interface IExampleApiTunnelEdit {
  topicName: string;
  identifiers: string[];
  data: Record<string, unknown>;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnel: ITunnelModel;
}

export const example_api_tunnel_publish = async ({
  topicName,
  identifiers,
  data,
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

  const httpPublish: IHttpPublish = {
    data: stringToBuffer(JSON.stringify(data)),
    topicName,
    identifiers,
  };

  const response = await apiTunnel.tunnel(tunnelId).publish(httpPublish);

  /***** COPY EXAMPLE CODE END *****/

  return response;
};
