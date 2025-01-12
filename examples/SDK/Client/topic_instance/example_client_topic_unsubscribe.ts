/**
 * Get topic instance from topic instance
 * Can read more about this here: https://developer.nolag.app/#unsubscribe
 */

import type { ITopic } from "nolagjs";

export interface IExampleApiTopicUnsubscribe {
  topicInstance: ITopic;
}

export const example_client_topic_unsubscribe = async ({
  topicInstance,
}: IExampleApiTopicUnsubscribe) => {
  /***** COPY EXAMPLE CODE START *****/

  const updatedTopicInstance = topicInstance.unsubscribe();

  /***** COPY EXAMPLE CODE END *****/

  return updatedTopicInstance;
};
