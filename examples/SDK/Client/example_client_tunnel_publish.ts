/**
 * Subscribe to topic name and identifiers
 * Can read more about this here: https://developer.nolag.app/#connecting-to-a-tunnel
 */

import type { ITunnel } from "nolagjs";
import { stringToBuffer } from "nolagjs";

export interface IExampleApiTunnelSubscribe {
  tunnelInstance: ITunnel;
  topicName: string;
  identifiers: string[];
  data: Record<string, unknown>
}

export const example_client_tunnel_publish = async ({
  tunnelInstance,
  topicName,
  identifiers,
  data
}: IExampleApiTunnelSubscribe) => {
  /***** COPY EXAMPLE CODE START *****/

  const payload: ArrayBuffer = stringToBuffer(JSON.stringify(data));

  // connect to NoLag message broker
  // https://developer.nolag.app/#client-sdk
  tunnelInstance.publish(topicName, payload, identifiers);

  /***** COPY EXAMPLE CODE END *****/
};
