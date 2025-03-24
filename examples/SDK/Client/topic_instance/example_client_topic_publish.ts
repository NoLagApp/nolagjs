/**
 * Publish to topic name and identifiers
 * Can read more about this here: https://developer.nolag.app/#publish-on-a-topic
 */

import type { ITopic, ITunnel } from "nolagjs";
import { stringToBuffer } from "nolagjs";

export interface IExampleApiTunnelPublish {
  topicInstance: ITopic;
  identifiers: string[] | undefined;
  data: Record<any, any>;
}

export const example_client_topic_publish = async ({
  topicInstance,
  identifiers,
  data,
}: IExampleApiTunnelPublish) => {
  /***** COPY EXAMPLE CODE START *****/

  topicInstance.publish(data, identifiers);

  /***** COPY EXAMPLE CODE END *****/
};
