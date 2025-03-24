/**
 * Subscribe to topic name and identifiers
 * Can read more about this here: https://developer.nolag.app/#subscribe-to-a-topic
 */

import type { ITransport, ITunnel } from "nolagjs";

export interface IExampleApiTunnelSubscribe {
  tunnelInstance: ITunnel;
  topicName: string;
  identifiers: string[] | undefined;
}

export const example_client_tunnel_subscribe = async (
  { tunnelInstance, topicName, identifiers }: IExampleApiTunnelSubscribe,
  callbackFn?: (error: Error | null, data: ITransport | null) => void,
) => {
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/
    tunnelInstance.subscribe(topicName, identifiers
      ? {
        OR: identifiers,
      }
      : undefined, (err, data) => {
      callbackFn && callbackFn(err, data);

      if(err) {
        reject(err);
        return;
      }
      
      resolve(data);
    });
    /***** COPY EXAMPLE CODE END *****/
  })
};
