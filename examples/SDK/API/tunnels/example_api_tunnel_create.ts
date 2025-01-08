/**
 * Create new Tunnel attached to a Project
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */
import globalVars from "../../../constants/globalVars";

import type { ITunnelModel } from "nolagjs";
import { Api } from "nolagjs";

export const example_api_tunnel_create = async () => {
  /***** EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    globalVars.yourProjectApiKey,
    globalVars.noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  // tunnel payload
  const tunnelModel: ITunnelModel = {
    name: globalVars.tunnelName,
    // you can not create sandbox tunnels if no billing details attached to project
    sandbox: true,
  };

  const response = await apiTunnel.createTunnel(tunnelModel);

  /***** EXAMPLE CODE END *****/

  return response;
};
