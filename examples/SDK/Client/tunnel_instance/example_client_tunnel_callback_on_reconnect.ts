/**
 * Event reconnect to Tunnel instance
 * Can read more about this here: https://developer.nolag.app/#receive-message-callback
 */

import type { ITunnel } from "nolagjs";
import { bufferToString } from "nolagjs";

export interface IExampleApiTunnelCallbackOnReconnect {
  tunnelInstance: ITunnel;
}

export interface IExampleApiTunnelCallbackOnReconnectResponse {
  data: Record<any, any>;
  topicName: string;
  identifiers: string[];
  presences: string[];
}

export const example_client_tunnel_callback_on_receive = async ({
  tunnelInstance,
}: IExampleApiTunnelCallbackOnReconnect): Promise<IExampleApiTunnelCallbackOnReconnectResponse> => {
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/

    tunnelInstance.onReconnect((received) => {
      const { data, topicName, identifiers, presences } = received;
      const parseData = JSON.parse(bufferToString(data));

      const parsedResponse = {
        data: parseData,
        topicName,
        identifiers,
        presences,
      };

      // only used for this promise example and E2E testing
      resolve(parsedResponse);
    });

    /***** COPY EXAMPLE CODE END *****/
  });
};
