/**
 * Set device presence
 * Can read more about this here: https://developer.nolag.app/#presence
 */

import type { ITopic } from "nolagjs";

export interface IExampleApiTopicSetPresence {
  topicInstance: ITopic;
  presenceData: Record<any, any>;
}

export const example_client_topic_set_presence = async ({
  topicInstance,
  presenceData,
}: IExampleApiTopicSetPresence) => {
  /***** COPY EXAMPLE CODE START *****/

  const payload: string = JSON.stringify(presenceData);

  const updatedTopicInstance = await topicInstance.setPresence(payload);

  /***** COPY EXAMPLE CODE END *****/

  return updatedTopicInstance;
};
