import { example_api_tunnel_get } from "../../SDK/API/tunnels/example_api_tunnel_get";
import type { ITunnelModel } from "nolagjs";

export interface IApiTunnelGet {
  tunnel: ITunnelModel;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
}

export const getTunnelUsingTunnelId = ({
  tunnel,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTunnelGet) => {
  return example_api_tunnel_get({
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnel,
  });
};
