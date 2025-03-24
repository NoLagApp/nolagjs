/**
 * Update Tunnel topic
 * Can read more about this here: https://developer.nolag.app/#tunnel-topics
 */

import type { IConnectOptions, ITopicModel } from "nolagjs";
import { Api } from "nolagjs";

export interface IExampleApiTunnelTopicUpdate {
  payload: ITopicModel;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnelId: string;
  topicId: string;
}

export const example_api_tunnel_topic_update = async ({
  payload,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnelId,
  topicId,
}: IExampleApiTunnelTopicUpdate) => {
  /***** COPY EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  // we update the name or any end-to-end data we want to test
  const updatePayload: ITopicModel = payload ?? {
    name: `updated_topic_name`,
  };

  const response = await apiTunnel
    .tunnel(tunnelId ?? "")
    .topics.updateTopic(topicId, updatePayload);

  /***** COPY EXAMPLE CODE END *****/

  return response;
};
