/**
 * Connect to NoLag Message broker
 * Can read more about this here: https://developer.nolag.app/#tunnel-instance
 */

import type { IConnectOptions, ITunnel } from "nolagjs";
import { WebSocketClient } from "nolagjs";

export interface IExampleApiTunnelCreate {
  noLagDeveloperTestConfigIgnoreWs: IConnectOptions,
  deviceToken: string;
}

export const example_client_tunnel_connect = async ({
                                                      noLagDeveloperTestConfigIgnoreWs,
                                                      deviceToken,
}: IExampleApiTunnelCreate) => {
  /***** COPY EXAMPLE CODE START *****/

  // connect to NoLag message broker
  // https://developer.nolag.app/#client-sdk
  const nolagClient: ITunnel = await WebSocketClient(deviceToken, undefined, noLagDeveloperTestConfigIgnoreWs);

  /***** COPY EXAMPLE CODE END *****/

  return nolagClient;
};
