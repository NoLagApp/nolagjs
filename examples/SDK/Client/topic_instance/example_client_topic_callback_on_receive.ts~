/**
 * Receive messages on Topic instance
 * Can read more about this here: https://developer.nolag.app/#topic-receive-message-callback
 */

import type { ITopic } from "nolagjs";
import { bufferToString } from "nolagjs";

export interface IExampleApiTopicCallbackOnReceive {
  topicInstance: ITopic;
}

export interface IExampleApiTopicCallbackOnReceiveResponse {
  data: Record<any, any>;
  topicName: string;
  identifiers: string[];
  presences: string[]
}

export const example_client_topic_callback_on_receive = async ({
  topicInstance,
}: IExampleApiTopicCallbackOnReceive): Promise<IExampleApiTopicCallbackOnReceiveResponse> => {
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/

    topicInstance.onReceive((received) => {
      const { data, topicName, identifiers, presences } = received;
      const parseData = JSON.parse(bufferToString(data));

      const parsedResponse = {
        data: parseData,
        topicName,
        identifiers,
        presences
      }

      // only used for this promise example and E2E testing
      resolve(parsedResponse)
    });

    /***** COPY EXAMPLE CODE END *****/
  });
};
