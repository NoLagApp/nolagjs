/**
 * unsubscribe to topic name and identifiers
 * Can read more about this here: https://developer.nolag.app/#unsubscribe-from-topic
 */

import type { ITunnel } from "nolagjs";

export interface IExampleApiTunnelUnsubscribe {
  tunnelInstance: ITunnel;
  topicName: string;
}

export const example_client_tunnel_unsubscribe = async ({
  tunnelInstance,
  topicName
}: IExampleApiTunnelUnsubscribe) => {
  /***** COPY EXAMPLE CODE START *****/

  const topicInstance = tunnelInstance.unsubscribe(topicName);

  /***** COPY EXAMPLE CODE END *****/

  return topicInstance;
};
