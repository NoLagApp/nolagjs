/**
 * Remove identifiers from topic
 * Can read more about this here: https://developer.nolag.app/#remove-nql-identifiers
 */

import type { ITopic } from "nolagjs";

export interface IExampleApiTopicRemoveIdentifiers {
  topicInstance: ITopic;
  identifiers: string[];
}

export const example_client_topic_remove_identifiers = async ({
  topicInstance,
  identifiers,
}: IExampleApiTopicRemoveIdentifiers) => {
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/
    topicInstance.removeIdentifiers(identifiers, (err, data) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(data);
    });
    /***** COPY EXAMPLE CODE END *****/
  })
};
