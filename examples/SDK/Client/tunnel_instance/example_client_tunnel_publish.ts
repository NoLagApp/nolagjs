/**
 * Publish to topic name and identifiers
 * Can read more about this here: https://developer.nolag.app/#publish-on-a-topic
 */

import type { ITunnel } from "nolagjs";
import { stringToBuffer } from "nolagjs";

export interface IExampleApiTunnelPublish {
  tunnelInstance: ITunnel;
  topicName: string;
  identifiers: string[] | undefined;
  data: Record<string, unknown>
}

export const example_client_tunnel_publish = async ({
  tunnelInstance,
  topicName,
  identifiers,
  data
}: IExampleApiTunnelPublish) => {
  /***** COPY EXAMPLE CODE START *****/

  const payload: ArrayBuffer = stringToBuffer(JSON.stringify(data));

  tunnelInstance.publish(topicName, payload, identifiers);

  /***** COPY EXAMPLE CODE END *****/
};
