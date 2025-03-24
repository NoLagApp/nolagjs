/**
 * Add identifiers to topic
 * Can read more about this here: https://developer.nolag.app/#add-nql-identifiers
 */

import type { ITopic } from "nolagjs";

export interface IExampleApiTopicAddIdentifiers {
  topicInstance: ITopic;
  identifiers: string[];
}

export const example_client_topic_add_identifiers = async ({
  topicInstance,
  identifiers,
}: IExampleApiTopicAddIdentifiers) => {
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/
    topicInstance.addIdentifiers({
      OR: identifiers,
    }, (err, data) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(data);
    });
    /***** COPY EXAMPLE CODE END *****/
  })
};
