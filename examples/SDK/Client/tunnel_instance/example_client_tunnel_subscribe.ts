/**
 * Subscribe to topic name and identifiers
 * Can read more about this here: https://developer.nolag.app/#subscribe-to-a-topic
 */

import type { ITunnel } from "nolagjs";

export interface IExampleApiTunnelSubscribe {
  tunnelInstance: ITunnel;
  topicName: string;
  identifiers: string[];
}

export const example_client_tunnel_subscribe = async ({
  tunnelInstance,
  topicName,
  identifiers,
}: IExampleApiTunnelSubscribe) => {
  /***** COPY EXAMPLE CODE START *****/

  const topicInstance = tunnelInstance.subscribe(topicName, {
    OR: identifiers,
  });

  /***** COPY EXAMPLE CODE END *****/

  return topicInstance;
};
