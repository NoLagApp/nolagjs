/**
 * List Tunnels attached to a Project
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */

import type { IConnectOptions, ITunnelQuery } from "nolagjs";
import { Api, EStatus } from "nolagjs";

export interface IExampleApiTunnelList {
  tunnelQuery: ITunnelQuery;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
}

export const example_api_tunnel_list = async ({
  tunnelQuery,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IExampleApiTunnelList) => {
  /***** COPY EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const query: ITunnelQuery = tunnelQuery ?? {
    status: EStatus.Active,
    size: 10,
    page: 1,
    search: "tunnel_name_search_goes_here",
  };

  const response = await apiTunnel.tunnels(query);

  const { records, pagination } = response;

  /***** COPY EXAMPLE CODE END *****/

  return {
    records,
    pagination,
  };
};
