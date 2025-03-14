/**
 * Receive messages on Tunnel instance
 * Can read more about this here: https://developer.nolag.app/#receive-message-callback
 */

import type { ITunnel } from "nolagjs";
import { bufferToString } from "nolagjs";

export interface IExampleApiTunnelCallbackOnReceive {
  tunnelInstance: ITunnel;
}

export interface IExampleApiTunnelCallbackOnReceiveResponse {
  data: Record<any, any>;
  topicName: string;
  identifiers: string[];
  presences: string[];
}

export const example_client_tunnel_callback_on_receive = async (
  { tunnelInstance }: IExampleApiTunnelCallbackOnReceive,
  callback?: (data: IExampleApiTunnelCallbackOnReceiveResponse) => void,
): Promise<IExampleApiTunnelCallbackOnReceiveResponse> => {
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/

    tunnelInstance.onReceive((received) => {
      const { data, topicName, identifiers, presences } = received;

      const receivedData = bufferToString(data);

      const parseData = receivedData ? JSON.parse(receivedData) : undefined;

      const parsedResponse = {
        data: parseData,
        topicName,
        identifiers,
        presences,
      };

      if (callback && typeof callback === "function") {
        callback(parsedResponse);
      }

      // only used for this promise example and E2E testing
      resolve(parsedResponse);
    });

    /***** COPY EXAMPLE CODE END *****/
  });
};
