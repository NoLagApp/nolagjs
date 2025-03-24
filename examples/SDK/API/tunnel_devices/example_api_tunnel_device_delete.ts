/**
 * Delete Tunnel device
 * Can read more about this here: https://developer.nolag.app/#tunnel-devices
 */

import type { IConnectOptions } from "nolagjs";
import { Api } from "nolagjs";

export interface IExampleApiTunnelDeviceDelete {
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnelId: string;
  deviceId: string;
}

/**
 * Edit just the name of the topic
 */
export const example_api_tunnel_device_delete = async ({
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnelId,
  deviceId,
}: IExampleApiTunnelDeviceDelete) => {
  /***** COPY EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const response = await apiTunnel
    .tunnel(tunnelId ?? "")
    .devices.deleteDevice(deviceId);

  /***** COPY EXAMPLE CODE END *****/

  return response;
};
