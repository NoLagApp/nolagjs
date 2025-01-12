/**
 * Error message on tunnel connection
 * Can read more about this here: https://developer.nolag.app/#receive-message-callback
 */

import type { ITunnel, IErrorMessage } from "nolagjs";

export interface IExampleApiTunnelCallbackOnDisconnect {
  tunnelInstance: ITunnel;
}

export const example_client_tunnel_callback_on_error = async ({
  tunnelInstance,
}: IExampleApiTunnelCallbackOnDisconnect): Promise<IErrorMessage> => {
  return new Promise((resolve, reject) => {
    /***** COPY EXAMPLE CODE START *****/

    tunnelInstance.onDisconnect((received) => {
      const { id, code, msg, description, errors } = received;

      const parsedResponse = {
        id,
        code,
        msg,
        description,
        errors,
      };

      // only used for this promise example and E2E testing
      resolve(parsedResponse);
    });

    /***** COPY EXAMPLE CODE END *****/
  });
};
