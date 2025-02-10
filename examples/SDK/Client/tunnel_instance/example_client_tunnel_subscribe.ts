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
  /***** COPY EXAMPLE CODE START *****/

  const topicInstance = tunnelInstance.subscribe(
    topicName,
    identifiers
      ? {
          OR: identifiers,
        }
      : undefined,
    callbackFn
  );

  /***** COPY EXAMPLE CODE END *****/

  return topicInstance;
};
