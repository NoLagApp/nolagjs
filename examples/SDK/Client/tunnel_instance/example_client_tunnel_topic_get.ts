/**
 * Get topic instance from topic instance
 * Can read more about this here: https://developer.nolag.app/#get-topic-instance
 */

import type { ITunnel } from "nolagjs";

export interface IExampleApiTunnelTopicGet {
  tunnelInstance: ITunnel;
  topicName: string;
}

export const example_client_tunnel_topic_get = async ({
  tunnelInstance,
  topicName
}: IExampleApiTunnelTopicGet) => {
  /***** COPY EXAMPLE CODE START *****/

  const topicInstance = tunnelInstance.getTopic(topicName);

  /***** COPY EXAMPLE CODE END *****/

  return topicInstance;
};
