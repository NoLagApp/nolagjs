/**
 * Publish to topic name and identifiers
 * Can read more about this here: https://developer.nolag.app/#publish-on-a-topic
 */

import type { ITunnel } from "nolagjs";

export interface IExampleApiTunnelPublish {
  tunnelInstance: ITunnel;
  topicName: string;
  data: Record<any, any>;
  identifiers?: string[];
}

export const example_client_tunnel_publish = async ({
  tunnelInstance,
  topicName,
  identifiers,
  data,
}: IExampleApiTunnelPublish) => {
  /***** COPY EXAMPLE CODE START *****/
  tunnelInstance.publish(topicName, data, identifiers);

  /***** COPY EXAMPLE CODE END *****/
};
