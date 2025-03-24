/**
 * unsubscribe to topic name and identifiers
 * Can read more about this here: https://developer.nolag.app/#unsubscribe-from-topic
 */

import type { ITunnel } from "nolagjs";

export interface IExampleApiTunnelUnsubscribe {
  tunnelInstance: ITunnel;
  topicName: string;
}

export const example_client_tunnel_unsubscribe = async ({
  tunnelInstance,
  topicName,
}: IExampleApiTunnelUnsubscribe) => {
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/
    tunnelInstance.unsubscribe(topicName, (err, data) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(data);
    });

    /***** COPY EXAMPLE CODE END *****/
  })
};
