/**
 * List Tunnel topics based on but not required topic query
 * Can read more about this here: https://developer.nolag.app/#tunnel-topics
 */

import type { IConnectOptions, ITopicQuery } from "nolagjs";
import { Api, EStatus } from "nolagjs";

export interface IExampleApiTunnelTopicList {
  topicQuery: ITopicQuery;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnelId: string;
}

export const example_api_tunnel_topic_list = async ({
  topicQuery,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnelId,
}: IExampleApiTunnelTopicList) => {
  /***** EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const query: ITopicQuery = topicQuery ?? {
    status: EStatus.Active,
    size: 10,
    page: 1,
    search: "topic_name_search_goes_here",
  };

  const { records, pagination } = await apiTunnel
    .tunnel(tunnelId ?? "")
    .topics.listTopics(query);

  /***** EXAMPLE CODE END *****/

  return {
    records,
    pagination,
  };
};
