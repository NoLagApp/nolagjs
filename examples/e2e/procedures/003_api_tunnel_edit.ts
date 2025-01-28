import type { ITunnelModel } from "nolagjs";
import { example_api_tunnel_edit } from "../../SDK/API/tunnels/example_api_tunnel_update";

export interface IApiTunnelEdit {
  tunnelName?: string;
  tunnel: ITunnelModel;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
}

// tunnel payload
const payload: ITunnelModel = {};

export const editTunnelNameUsingTunnelId = async ({
  tunnelName,
  tunnel,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTunnelEdit) => {
  payload.name = `${tunnelName}_edited`;
  return example_api_tunnel_edit({
    tunnel: tunnel,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    payload,
  });
};