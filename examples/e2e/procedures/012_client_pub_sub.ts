import type { ITopic, ITunnel } from "nolagjs";
import { example_client_tunnel_connect } from "../../SDK/Client/tunnel_instance/example_client_tunnel_connect";
import { example_client_tunnel_publish } from "../../SDK/Client/tunnel_instance/example_client_tunnel_publish";
import { example_client_tunnel_subscribe } from "../../SDK/Client/tunnel_instance/example_client_tunnel_subscribe";
import {
  example_client_tunnel_callback_on_receive,
  IExampleApiTunnelCallbackOnReceiveResponse,
} from "../../SDK/Client/tunnel_instance/example_client_tunnel_callback_on_receive";
import { example_client_topic_set_presence } from "../../SDK/Client/topic_instance/example_client_topic_set_presence";
import { example_client_tunnel_unsubscribe } from "../../SDK/Client/tunnel_instance/example_client_tunnel_unsubscribe";
import { example_client_topic_publish } from "../../SDK/Client/topic_instance/example_client_topic_publish";
import { example_client_topic_callback_on_receive } from "../../SDK/Client/topic_instance/example_client_topic_callback_on_receive";
import { example_client_topic_unsubscribe } from "../../SDK/Client/topic_instance/example_client_topic_unsubscribe";
import { IGlobalVars } from "../../constants/globalVars";
import { example_client_tunnel_topic_get } from "../../SDK/Client/tunnel_instance/example_client_tunnel_topic_get";
import { example_client_topic_remove_identifiers } from "../../SDK/Client/topic_instance/example_client_topic_remove_identifiers";
import { delay } from "../../constants/util/delay";
import { example_client_tunnel_disconnect } from "../../SDK/Client/tunnel_instance/example_client_tunnel_disconnect";

export interface IClientPubSub {
  environmentInstance?: IGlobalVars;
  topicName?: string;
  tunnelName?: string;
  tunnelInstance?: ITunnel;
  noLagDeveloperTestConfigIgnoreWs: Record<any, any>;
  deviceAccessToken?: string;
  identifiers?: string[];
  data?: Record<string, unknown>;
}

export interface IPresenceReceive {
  nodeReceive: any[];
  browserReceive: any[];
}

export const identifiers: string[] = ["identifier1", "identifier2"];

export const clientTunnelConnect = ({
  noLagDeveloperTestConfigIgnoreWs,
  deviceAccessToken,
}: IClientPubSub) => {
  return example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs:
      noLagDeveloperTestConfigIgnoreWs ?? ({} as any),
    deviceToken: deviceAccessToken ?? "",
  });
};

export const clientTunnelSubscribe = ({
  tunnelInstance,
  topicName,
  identifiers,
}: IClientPubSub) => {
  return example_client_tunnel_subscribe({
    tunnelInstance: tunnelInstance ?? ({} as any),
    topicName: topicName ?? "",
    identifiers,
  });
};

export const clientTunnelPublish = ({
  tunnelInstance,
  topicName,
  identifiers,
  data,
}: IClientPubSub) => {
  return example_client_tunnel_publish({
    tunnelInstance: tunnelInstance ?? ({} as any),
    topicName: topicName ?? "",
    identifiers,
    data: data ?? {},
  });
};

export const clientTunnelOnReceive = (
  { tunnelInstance }: IClientPubSub,
  callback?: (data: IExampleApiTunnelCallbackOnReceiveResponse) => void,
) => {
  return example_client_tunnel_callback_on_receive(
    {
      tunnelInstance: tunnelInstance ?? ({} as any),
    },
    callback,
  );
};

export const clientTunnelUnsubscribe = ({
  tunnelInstance,
  topicName,
}: IClientPubSub) => {
  return example_client_tunnel_unsubscribe({
    tunnelInstance: tunnelInstance ?? ({} as any),
    topicName: topicName ?? "",
  });
};

export const clientTunnelDisconnect = ({ tunnelInstance }: IClientPubSub) => {
  return example_client_tunnel_disconnect({
    tunnelInstance: tunnelInstance ?? ({} as any),
  });
};

export const TUNNEL_standardPubSub = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstance,
}: IClientPubSub) => {
  const topicName = environmentInstance?.topic.name ?? "";

  const data = {
    prop1: "data1",
  };

  const identifiers = undefined;

  const ONE_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstance?.device?.deviceAccessToken ?? "",
  });

  // const TWO_TunnelInstance = await example_client_tunnel_connect({
  //   noLagDeveloperTestConfigIgnoreWs,
  //   deviceToken: environmentInstance?.device?.deviceAccessToken ?? "",
  // });

  await example_client_tunnel_subscribe({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
    identifiers,
  });

  let response: any;

  example_client_tunnel_callback_on_receive(
    {
      tunnelInstance: ONE_TunnelInstance,
    }, (data) => {
      response = data;
      console.log(data);
    }
  );

  // example_client_tunnel_callback_on_receive(
  //   {
  //     tunnelInstance: ONE_TunnelInstance,
  //   }, (data) => {
  //     response = data;
  //     console.log(data);
  //   }
  // );
  //
  await example_client_tunnel_publish({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
    identifiers,
    data,
  });

  // await example_client_tunnel_disconnect({
  //   tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  // });
  //
  // await example_client_tunnel_disconnect({
  //   tunnelInstance: TWO_TunnelInstance ?? ({} as any),
  // });

  await delay(10000);

  return response;
};

// export const TUNNEL_standardPubSubWithIdentifiers = async ({
//   topicName,
//   noLagDeveloperTestConfigIgnoreWs,
//   browserInstance,
//   nodeInstance,
// }: IClientPubSub) => {
//   const data = {
//     prop1: "data1",
//   };
//
//   const ONE_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   const TWO_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   await example_client_tunnel_subscribe({
//     tunnelInstance: ONE_TunnelInstance,
//     topicName,
//     identifiers,
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers,
//     data,
//   });
//
//   const response = await example_client_tunnel_callback_on_receive({
//     tunnelInstance: ONE_TunnelInstance,
//   });
//
//   ONE_TunnelInstance.disconnect();
//   TWO_TunnelInstance.disconnect();
//
//   return response;
// };
//
// export const TUNNEL_standardPubSubAddIdentifiers = async ({
//   topicName,
//   noLagDeveloperTestConfigIgnoreWs,
//   browserInstance,
//   nodeInstance,
// }: IClientPubSub) => {
//   const data = {
//     prop1: "data1",
//   };
//
//   const ONE_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   const TWO_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   await example_client_tunnel_subscribe({
//     tunnelInstance: ONE_TunnelInstance,
//     topicName,
//     identifiers: undefined,
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers: [identifiers?.[0] ?? ""],
//     data,
//   });
//
//   await example_client_tunnel_callback_on_receive({
//     tunnelInstance: ONE_TunnelInstance,
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers: [identifiers?.[1] ?? ""],
//     data,
//   });
//
//   await example_client_tunnel_callback_on_receive({
//     tunnelInstance: ONE_TunnelInstance,
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers: identifiers,
//     data,
//   });
//
//   const response = await example_client_tunnel_callback_on_receive({
//     tunnelInstance: ONE_TunnelInstance,
//   });
//
//   ONE_TunnelInstance.disconnect();
//   TWO_TunnelInstance.disconnect();
//
//   return response;
// };
//
// export const TUNNEL_unsubscribe = async ({
//   topicName,
//   noLagDeveloperTestConfigIgnoreWs,
//   browserInstance,
//   nodeInstance,
// }: IClientPubSub) => {
//   const data = {
//     prop1: "data1",
//   };
//   const identifiers = undefined;
//
//   const ONE_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   const TWO_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   await example_client_tunnel_subscribe({
//     tunnelInstance: ONE_TunnelInstance,
//     topicName,
//     identifiers,
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers,
//     data,
//   });
//
//   const response = await example_client_tunnel_callback_on_receive({
//     tunnelInstance: ONE_TunnelInstance,
//   });
//
//   if (response.data.prop1 !== data.prop1) {
//     ONE_TunnelInstance.disconnect();
//     TWO_TunnelInstance.disconnect();
//     return false;
//   }
//
//   await example_client_tunnel_unsubscribe({
//     tunnelInstance: ONE_TunnelInstance,
//     topicName,
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers,
//     data,
//   });
//
//   const unsubscribeTimeout: Promise<boolean> = new Promise((resolve) => {
//     setTimeout(() => {
//       let timeout = true;
//       example_client_tunnel_callback_on_receive(
//         {
//           tunnelInstance: ONE_TunnelInstance,
//         },
//         (response) => {
//           timeout = false;
//         },
//       );
//       resolve(timeout);
//     }, 1000);
//   });
//
//   const unsubscribeResponse = await unsubscribeTimeout;
//
//   ONE_TunnelInstance.disconnect();
//   TWO_TunnelInstance.disconnect();
//
//   return unsubscribeResponse;
// };
//
// export const TOPIC_addIdentifiersToInstance = async ({
//   topicName,
//   noLagDeveloperTestConfigIgnoreWs,
//   browserInstance,
//   nodeInstance,
//   tunnelName,
// }: IClientPubSub) => {
//   const data = {
//     prop1: "data1",
//   };
//
//   const ONE_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   const TWO_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   await example_client_tunnel_subscribe({
//     tunnelInstance: ONE_TunnelInstance,
//     topicName,
//     identifiers: undefined,
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers: undefined,
//     data,
//   });
//
//   const response = await example_client_tunnel_callback_on_receive({
//     tunnelInstance: ONE_TunnelInstance,
//   });
//
//   const browserTopic = await example_client_tunnel_topic_get({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//   });
//
//   browserTopic?.addIdentifiers({
//     OR: identifiers,
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers: [identifiers?.[0] ?? ""],
//     data,
//   });
//
//   const responseOneIdentifier = await example_client_tunnel_callback_on_receive(
//     {
//       tunnelInstance: ONE_TunnelInstance,
//     },
//   );
//
//   if (responseOneIdentifier.data.prop1 !== data.prop1) {
//     ONE_TunnelInstance.disconnect();
//     TWO_TunnelInstance.disconnect();
//     return null;
//   }
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers: [identifiers?.[1] ?? ""],
//     data,
//   });
//
//   await example_client_tunnel_callback_on_receive({
//     tunnelInstance: ONE_TunnelInstance,
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers,
//     data,
//   });
//
//   const responseAllIdentifiers =
//     await example_client_tunnel_callback_on_receive({
//       tunnelInstance: ONE_TunnelInstance,
//     });
//
//   if (responseAllIdentifiers.data.prop1 !== data.prop1) {
//     ONE_TunnelInstance.disconnect();
//     TWO_TunnelInstance.disconnect();
//     return null;
//   }
//
//   ONE_TunnelInstance.disconnect();
//   TWO_TunnelInstance.disconnect();
//
//   return responseAllIdentifiers;
// };
//
// export const TOPIC_removeIdentifiersToInstance = async ({
//   topicName,
//   noLagDeveloperTestConfigIgnoreWs,
//   browserInstance,
//   nodeInstance,
//   tunnelName,
// }: IClientPubSub) => {
//   const data = {
//     prop1: "data1",
//   };
//
//   const ONE_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   const TWO_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   await example_client_tunnel_subscribe({
//     tunnelInstance: ONE_TunnelInstance,
//     topicName,
//     identifiers: identifiers,
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers: identifiers,
//     data,
//   });
//
//   await example_client_tunnel_callback_on_receive({
//     tunnelInstance: ONE_TunnelInstance,
//   });
//
//   const browserTopic = await example_client_tunnel_topic_get({
//     tunnelInstance: ONE_TunnelInstance,
//     topicName,
//   });
//
//   if (!browserTopic) {
//     return false;
//   }
//
//   await example_client_topic_remove_identifiers({
//     topicInstance: browserTopic,
//     identifiers: [identifiers?.[0] ?? ""],
//   });
//
//   await example_client_tunnel_publish({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers: [identifiers?.[0] ?? ""],
//     data,
//   });
//
//   const unsubscribeTimeout: Promise<boolean> = new Promise((resolve) => {
//     setTimeout(() => {
//       let timeout = true;
//       example_client_tunnel_callback_on_receive(
//         {
//           tunnelInstance: ONE_TunnelInstance,
//         },
//         (response) => {
//           timeout = false;
//         },
//       );
//       resolve(timeout);
//     }, 1000);
//   });
//
//   ONE_TunnelInstance.disconnect();
//   TWO_TunnelInstance.disconnect();
//
//   return unsubscribeTimeout;
// };
//
// export const TOPIC_deviceOneSetPresenceDeviceTwoReceivePresence = async ({
//   topicName,
//   noLagDeveloperTestConfigIgnoreWs,
//   browserInstance,
//   nodeInstance,
// }: IClientPubSub): Promise<IPresenceReceive> => {
//   const presenceDataBrowser = {
//     prop: "presenceBrowser",
//   };
//
//   const presenceDataNode = {
//     prop: "presenceNode",
//   };
//
//   const ONE_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   const TWO_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   await example_client_tunnel_subscribe({
//     tunnelInstance: ONE_TunnelInstance,
//     topicName,
//     identifiers,
//   });
//
//   await example_client_tunnel_subscribe({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//     identifiers,
//   });
//
//   const browserTopic = await example_client_tunnel_topic_get({
//     tunnelInstance: ONE_TunnelInstance,
//     topicName,
//   });
//
//   const nodeTopic = await example_client_tunnel_topic_get({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//   });
//
//   const browserReceive: any[] = [];
//   const nodeReceive: any[] = [];
//
//   example_client_topic_callback_on_receive(
//     {
//       topicInstance: browserTopic as ITopic,
//     },
//     (response) => {
//       response?.presences.forEach((i) => {
//         browserReceive.push(JSON.parse(i));
//       });
//     },
//   );
//
//   example_client_topic_callback_on_receive(
//     {
//       topicInstance: browserTopic as ITopic,
//     },
//     (response) => {
//       response?.presences.forEach((i) => {
//         nodeReceive.push(JSON.parse(i));
//       });
//     },
//   );
//
//   await example_client_topic_set_presence({
//     topicInstance: browserTopic as ITopic,
//     presenceData: presenceDataBrowser,
//   });
//
//   await example_client_topic_set_presence({
//     topicInstance: nodeTopic as ITopic,
//     presenceData: presenceDataNode,
//   });
//
//   await delay(1000);
//
//   ONE_TunnelInstance.disconnect();
//   TWO_TunnelInstance.disconnect();
//
//   return {
//     browserReceive,
//     nodeReceive,
//   };
// };
//
// export const TOPIC_publishUnsubscribe = async ({
//   topicName,
//   noLagDeveloperTestConfigIgnoreWs,
//   browserInstance,
//   nodeInstance,
//   tunnelName,
// }: IClientPubSub) => {
//   const data = {
//     prop1: "data1",
//   };
//
//   const ONE_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   const TWO_TunnelInstance = await example_client_tunnel_connect({
//     noLagDeveloperTestConfigIgnoreWs,
//     deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
//   });
//
//   await example_client_tunnel_subscribe({
//     tunnelInstance: ONE_TunnelInstance,
//     topicName,
//     identifiers: identifiers,
//   });
//
//   const browserTopic = await example_client_tunnel_topic_get({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//   });
//
//   const nodeTopic = await example_client_tunnel_topic_get({
//     tunnelInstance: TWO_TunnelInstance,
//     topicName,
//   });
//
//   await example_client_topic_publish({
//     topicInstance: nodeTopic as ITopic,
//     identifiers: identifiers,
//     data,
//   });
//
//   await example_client_tunnel_callback_on_receive({
//     tunnelInstance: ONE_TunnelInstance,
//   });
//
//   await example_client_topic_unsubscribe({
//     topicInstance: browserTopic as ITopic,
//   });
//
//   await example_client_tunnel_publish({
//     topicName,
//     tunnelInstance: ONE_TunnelInstance,
//     identifiers: identifiers,
//     data,
//   });
//
//   const unsubscribeTimeout: Promise<boolean> = new Promise((resolve) => {
//     setTimeout(() => {
//       let receivedResponse = false;
//       example_client_tunnel_callback_on_receive(
//         {
//           tunnelInstance: ONE_TunnelInstance,
//         },
//         (response) => {
//           receivedResponse = true;
//         },
//       );
//       resolve(receivedResponse);
//     }, 1000);
//   });
//
//   ONE_TunnelInstance.disconnect();
//   TWO_TunnelInstance.disconnect();
//
//   return unsubscribeTimeout;
// };