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
  /***** COPY EXAMPLE CODE START *****/

  const updatedTopicInstance = topicInstance.addIdentifiers({
    OR: identifiers,
  });

  /***** COPY EXAMPLE CODE END *****/

  return updatedTopicInstance;
};
