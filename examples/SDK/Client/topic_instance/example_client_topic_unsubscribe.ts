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
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/
    topicInstance.unsubscribe((err, data) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(data);
    });
    /***** COPY EXAMPLE CODE END *****/
  })
};
