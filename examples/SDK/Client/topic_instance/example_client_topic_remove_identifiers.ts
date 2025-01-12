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
  /***** COPY EXAMPLE CODE START *****/

  const updatedTopicInstance = topicInstance.removeIdentifiers(identifiers);

  /***** COPY EXAMPLE CODE END *****/

  return updatedTopicInstance;
};
