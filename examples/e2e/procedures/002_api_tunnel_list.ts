import { example_api_tunnel_list } from "../../SDK/API/tunnels/example_api_tunnel_list";
import type { ITunnelQuery } from "nolagjs";

export interface IApiTunnelList {
  tunnelName?: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
}

const tunnelQuery: ITunnelQuery = {};

export const shouldRetrieveAListOfTunnels = async ({
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTunnelList) => {
  return example_api_tunnel_list({
    tunnelQuery,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
  });
};

export const queryForASpecificTunnel = async ({
  tunnelName,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTunnelList) => {
  tunnelQuery.search = tunnelName;
  const { records } = await example_api_tunnel_list({
    tunnelQuery,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
  });

  return records?.[0];
};
