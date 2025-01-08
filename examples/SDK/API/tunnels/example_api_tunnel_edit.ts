/**
 * Edit Tunnel details attached to a Project using tunnelID
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */
import globalVars from "../../../constants/globalVars";
import type { ITunnelModel } from "nolagjs";
import { Api } from "nolagjs";

export const example_api_tunnel_edit_name = async () => {
  /***** EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    globalVars.yourProjectApiKey,
    globalVars.noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const tunnelId = globalVars.tunnel?.tunnelId ?? "";

  // we just edit the name for now
  const payload: ITunnelModel = {
    name: `${globalVars.tunnelName}_edited`,
  };

  const response = await apiTunnel.tunnel(tunnelId).updateTunnel(payload);

  /***** EXAMPLE CODE END *****/

  return response;
};
