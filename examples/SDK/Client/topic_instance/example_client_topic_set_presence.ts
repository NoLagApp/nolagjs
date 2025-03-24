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
  const payload: string = JSON.stringify(presenceData);
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/
    topicInstance.setPresence(payload, (err, data) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(data);
    });
    /***** COPY EXAMPLE CODE END *****/
  })
};
