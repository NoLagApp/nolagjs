/**
 * Get Tunnel device using device ID
 * Can read more about this here: https://developer.nolag.app/#tunnel-devices
 */

import type { IConnectOptions } from "nolagjs";
import { Api } from "nolagjs";

export interface IExampleApiTunnelDeviceGet {
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnelId: string;
  deviceId: string;
}

export const example_api_tunnel_device_get = async ({
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnelId,
  deviceId,
}: IExampleApiTunnelDeviceGet) => {
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
    .devices.getDeviceById(deviceId);

  /***** COPY EXAMPLE CODE END *****/

  return response;
};
