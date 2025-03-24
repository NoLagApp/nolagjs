/**
 * Get topic instance from topic instance
 * Can read more about this here: https://developer.nolag.app/#get-topic-instance
 */

import type { ITopic, ITunnel } from "nolagjs";

export interface IExampleApiTunnelTopicGet {
  tunnelInstance: ITunnel;
  topicName: string;
}

export const example_client_tunnel_topic_get = async ({
  tunnelInstance,
  topicName,
}: IExampleApiTunnelTopicGet): Promise<ITopic> => {
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/
    const topic = tunnelInstance.getTopic(topicName);
    resolve(topic);
    /***** COPY EXAMPLE CODE END *****/
  })
};
