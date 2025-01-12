/**
 * Subscribe to topic name and identifiers
 * Can read more about this here: https://developer.nolag.app/#connecting-to-a-tunnel
 */

import type { ITunnel } from "nolagjs";
import { WebSocketClient } from "nolagjs";

export interface IExampleApiTunnelUnsubscribe {
  tunnelInstance: ITunnel;
  topicName: string;
}

export const example_client_tunnel_unsubscribe = async ({
  tunnelInstance,
  topicName
}: IExampleApiTunnelUnsubscribe) => {
  /***** COPY EXAMPLE CODE START *****/

  // connect to NoLag message broker
  // https://developer.nolag.app/#client-sdk
  const topicInstance = tunnelInstance.unsubscribe(topicName);

  /***** COPY EXAMPLE CODE END *****/

  return topicInstance;
};
