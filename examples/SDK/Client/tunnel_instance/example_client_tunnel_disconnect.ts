/**
 * Disconnect from NoLag Message broker
 * Can read more about this here: https://developer.nolag.app/#disconnect
 */

import type { ITunnel } from "nolagjs";

export interface IExampleApiTunnelDisconnect {
  tunnelInstance: ITunnel;
}

export const example_client_tunnel_disconnect = async ({
  tunnelInstance,
}: IExampleApiTunnelDisconnect) => {
  /***** COPY EXAMPLE CODE START *****/

  tunnelInstance.disconnect();
};
