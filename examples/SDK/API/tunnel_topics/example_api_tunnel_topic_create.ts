/**
 * Create Tunnel topic
 * Can read more about this here: https://developer.nolag.app/#tunnel-topics
 */

import type { IConnectOptions, ITopicModel, ITunnelModel } from "nolagjs";
import { Api } from "nolagjs";

export interface IExampleApiTunnelTopicCreate {
  payload: ITopicModel;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnelName: string;
  tunnelId: string;
}

export const example_api_tunnel_topic_create = async ({
  payload,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnelName,
  tunnelId,
}: IExampleApiTunnelTopicCreate) => {
  /***** COPY EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const createPayload: ITunnelModel = payload ?? {
    name: tunnelName,
    // you can not create sandbox tunnels if no billing details attached to project
    sandbox: true,
  };

  const response = await apiTunnel
    .tunnel(tunnelId ?? "")
    .topics.createTopic(createPayload);

  /***** COPY EXAMPLE CODE END *****/

  return response;
};
