/**
 * Connect to NoLag Message broker
 * Can read more about this here: https://developer.nolag.app/#tunnel-instance
 */

import type { IConnectOptions, ITunnel, ITunnelOptions } from "nolagjs";
import { WebSocketClient } from "nolagjs";

export interface IExampleApiTunnelCreate {
  noLagDeveloperTestConfigIgnoreWs: IConnectOptions;
  deviceToken: string;
  options?: ITunnelOptions;
}

export const example_client_tunnel_connect = async ({
  noLagDeveloperTestConfigIgnoreWs,
  deviceToken,
  options,
}: IExampleApiTunnelCreate) => {
  /***** COPY EXAMPLE CODE START *****/
  // connect to NoLag message broker
  // https://developer.nolag.app/#client-sdk
  const nolagClient: ITunnel = WebSocketClient(
    deviceToken,
    {
      debug: options?.debug,
    },
    noLagDeveloperTestConfigIgnoreWs,
  );

  await nolagClient.connect();

  /***** COPY EXAMPLE CODE END *****/

  return nolagClient;
};
