/**
 * Publish to topic name and identifiers
 * Can read more about this here: https://developer.nolag.app/#publish-on-a-topic
 */

import type { ITopic, ITunnel } from "nolagjs";
import { stringToBuffer } from "nolagjs";

export interface IExampleApiTunnelPublish {
  topicInstance: ITopic;
  identifiers: string[] | undefined;
  data: Record<string, unknown>
}

export const example_client_topic_publish = async ({
                                                      topicInstance,
  identifiers,
  data
}: IExampleApiTunnelPublish) => {
  /***** COPY EXAMPLE CODE START *****/

  const payload: ArrayBuffer = stringToBuffer(JSON.stringify(data));

  topicInstance.publish(payload, identifiers);

  /***** COPY EXAMPLE CODE END *****/
};
