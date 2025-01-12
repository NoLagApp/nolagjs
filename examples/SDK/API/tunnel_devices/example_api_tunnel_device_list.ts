/**
 * List Tunnel devices based on but not required device query
 * Can read more about this here: https://developer.nolag.app/#tunnel-devices
 */

import type { IConnectOptions, IDeviceQuery } from "nolagjs";
import { Api, EStatus } from "nolagjs";

export interface IExampleApiTunnelTopicList {
  topicQuery: IDeviceQuery;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnelId: string;
}

export const example_api_tunnel_device_list = async ({
  topicQuery,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnelId,
}: IExampleApiTunnelTopicList) => {
  /***** COPY EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const query: IDeviceQuery = topicQuery ?? {
    status: EStatus.Active,
    size: 10,
    page: 1,
    search: "device_name_search_goes_here",
  };

  const { records, pagination } = await apiTunnel
    .tunnel(tunnelId ?? "")
    .devices.listDevices(query);

  /***** COPY EXAMPLE CODE END *****/

  return {
    records,
    pagination,
  };
};
