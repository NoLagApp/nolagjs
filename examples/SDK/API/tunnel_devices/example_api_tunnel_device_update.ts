/**
 * Update Tunnel device
 * Can read more about this here: https://developer.nolag.app/#tunnel-devices
 */

import type { IConnectOptions, IDeviceModel } from "nolagjs";
import { Api } from "nolagjs";

export interface IExampleApiTunnelTopicUpdate {
  payload: IDeviceModel;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  tunnelId: string;
  deviceId: string;
}

export const example_api_tunnel_device_update = async ({
  payload,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  tunnelId,
  deviceId,
}: IExampleApiTunnelTopicUpdate) => {
  console.log({payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    deviceId});
  /***** COPY EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  // we update the name or any end-to-end data we want to test
  const updatePayload: IDeviceModel = payload ?? {
    name: `updated_device_name`,
  };

  const response = await apiTunnel
    .tunnel(tunnelId ?? "")
    .devices.updateDevice(deviceId, updatePayload);

  /***** COPY EXAMPLE CODE END *****/

  return response;
};
