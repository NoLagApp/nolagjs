/**
 * List Tunnels attached to a Project
 * Can read more about this here: https://developer.nolag.app/#project-tunnels
 */
import globalVars from "../../../constants/globalVars";

import { Api } from "nolagjs";

export const example_api_tunnel_list = async () => {
  // setup connection to NoLag API
  // we only need to supply the API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    globalVars.yourProjectApiKey,
    globalVars.noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const response = await apiTunnel.tunnels();

  const { records, pagination } = response;

  return {
    records,
    pagination,
  };
};

export const example_api_tunnel_search_name = async () => {
  /***** EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    globalVars.yourProjectApiKey,
    globalVars.noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const response = await apiTunnel.tunnels({
    search: globalVars.tunnelName,
  });

  const { records } = response;

  /***** EXAMPLE CODE END *****/

  return records.shift();
};

