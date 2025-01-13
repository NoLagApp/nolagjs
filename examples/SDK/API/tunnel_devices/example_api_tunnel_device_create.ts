/**
 * Create Tunnel device
 * Can read more about this here: https://developer.nolag.app/#tunnel-devices
 */

import type { IConnectOptions, IDeviceModel, ITunnelModel } from "nolagjs";
import { Api } from "nolagjs";

export interface IExampleApiTunnelDeviceCreate {
  payload: IDeviceModel;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: IConnectOptions;
  deviceName: string;
  tunnelId: string;
}

export const example_api_tunnel_device_create = async ({
  payload,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  deviceName,
  tunnelId,
}: IExampleApiTunnelDeviceCreate) => {
  /***** COPY EXAMPLE CODE START *****/

  // setup connection to NoLag API
  // we only need to supply the PROJECT API KEY obtained from the NoLag portal
  // https://developer.nolag.app/#api
  const apiTunnel = Api(
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore, // <--- ignore this argument, it's only used by NoLag devs
  );

  const createPayload: IDeviceModel = payload ?? {
    name: deviceName,
  };

  const response = await apiTunnel
    .tunnel(tunnelId ?? "")
    .devices.createDevice(createPayload);

  /***** COPY EXAMPLE CODE END *****/

  return response;
};
