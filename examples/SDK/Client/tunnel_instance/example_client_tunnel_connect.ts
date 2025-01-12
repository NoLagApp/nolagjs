/**
 * Connect to NoLag Message broker
 * Can read more about this here: https://developer.nolag.app/#tunnel-instance
 */

import type { ITunnel } from "nolagjs";
import { WebSocketClient } from "nolagjs";

export interface IExampleApiTunnelCreate {
  deviceToken: string;
}

export const example_client_tunnel_connect = async ({
  deviceToken,
}: IExampleApiTunnelCreate) => {
  /***** COPY EXAMPLE CODE START *****/

  // connect to NoLag message broker
  // https://developer.nolag.app/#client-sdk
  const nolagClient: ITunnel = await WebSocketClient(deviceToken);

  /***** COPY EXAMPLE CODE END *****/

  return nolagClient;
};
