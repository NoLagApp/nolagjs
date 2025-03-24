/**
 * Get Tunnel topic using topic ID
 * Can read more about this here: https://developer.nolag.app/#tunnel-topics
 */

import type { IConnectOptions } from "nolagjs";
import { Api } from "nolagjs";

export interface IExampleApiTunnelTopicGet {
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnelId: string;
  topicId: string;
}

export const example_api_tunnel_topic_get = async ({
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnelId,
  topicId,
}: IExampleApiTunnelTopicGet) => {
  /***** COPY EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const response = await apiTunnel
    .tunnel(tunnelId ?? "")
    .topics.getTopicById(topicId);

  /***** COPY EXAMPLE CODE END *****/

  return response;
};
