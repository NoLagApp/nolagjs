import type { ITransport, ITunnel } from "nolagjs";
import { example_client_tunnel_connect } from "../../SDK/Client/tunnel_instance/example_client_tunnel_connect";
import { example_client_tunnel_publish } from "../../SDK/Client/tunnel_instance/example_client_tunnel_publish";
import { example_client_tunnel_subscribe } from "../../SDK/Client/tunnel_instance/example_client_tunnel_subscribe";
import {
  example_client_tunnel_callback_on_receive,
  IExampleApiTunnelCallbackOnReceiveResponse,
} from "../../SDK/Client/tunnel_instance/example_client_tunnel_callback_on_receive";
import { example_client_topic_set_presence } from "../../SDK/Client/topic_instance/example_client_topic_set_presence";
import { example_client_tunnel_unsubscribe } from "../../SDK/Client/tunnel_instance/example_client_tunnel_unsubscribe";
import { IGlobalVars } from "../../constants/globalVars";
import { example_client_tunnel_topic_get } from "../../SDK/Client/tunnel_instance/example_client_tunnel_topic_get";
import { example_client_tunnel_disconnect } from "../../SDK/Client/tunnel_instance/example_client_tunnel_disconnect";
import { example_client_topic_add_identifiers } from "../../SDK/Client/topic_instance/example_client_topic_add_identifiers";
import { example_client_topic_remove_identifiers } from "../../SDK/Client/topic_instance/example_client_topic_remove_identifiers";
import { example_client_topic_publish } from "../../SDK/Client/topic_instance/example_client_topic_publish";
import { example_client_topic_callback_on_receive } from "../../SDK/Client/topic_instance/example_client_topic_callback_on_receive";
import { example_client_topic_unsubscribe } from "../../SDK/Client/topic_instance/example_client_topic_unsubscribe";
import { delay } from "../../constants/util/delay";

export interface IClientPubSub {
  environmentInstanceOne?: IGlobalVars;
  environmentInstanceTwo?: IGlobalVars;
  topicName?: string;
  tunnelName?: string;
  tunnelInstance?: ITunnel;
  noLagDeveloperTestConfigIgnoreWs: Record<any, any>;
  deviceAccessToken?: string;
  identifiers?: string[];
  data?: Record<string, unknown>;
  callbackFn?: (error: Error | null, data: ITransport | null) => void;
}

export const identifiers: string[] = ["identifier1", "identifier2"];

export const pubSubData = {
  prop1: "data1",
};

export const presence = {
  userId: "presence1",
};

export const TUNNEL_standardPubSub = async ({
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const identifiers = undefined;

  const ONE_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs:
      environmentInstanceOne?.noLagDeveloperTestConfigIgnoreWs ?? {},
    deviceToken: environmentInstanceOne?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  const TWO_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs:
      environmentInstanceTwo?.noLagDeveloperTestConfigIgnoreWs ?? {},
    deviceToken: environmentInstanceTwo?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: ONE_TunnelInstance ?? {},
    topicName,
    identifiers,
  });

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers,
    data: pubSubData,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: ONE_TunnelInstance,
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: TWO_TunnelInstance ?? ({} as any),
  });

  return response;
};

export const TUNNEL_standardSecurePubSub = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const identifiers = undefined;

  const ONE_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceOne?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  const TWO_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceTwo?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: ONE_TunnelInstance ?? {},
    topicName,
    identifiers,
  });

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers,
    data: pubSubData,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: ONE_TunnelInstance,
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: TWO_TunnelInstance ?? ({} as any),
  });

  return response;
};

export const TUNNEL_standardPubSubWithIdentifiers = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const ONE_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceOne?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  const TWO_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceTwo?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
    identifiers: identifiers.reverse(),
  });

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers: identifiers.reverse(),
    data: pubSubData,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: ONE_TunnelInstance,
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: TWO_TunnelInstance ?? ({} as any),
  });

  return response;
};

export const TUNNEL_StandardUnsubscribe = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const ONE_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceOne?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  const TWO_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceTwo?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
    identifiers: undefined,
  });

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers: undefined,
    data: pubSubData,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: ONE_TunnelInstance,
  });

  if (response.topicName !== topicName) {
    return false;
  }

  await example_client_tunnel_unsubscribe({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
  });

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers: undefined,
    data: pubSubData,
  });

  const responseDelay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(true);
      }, 1000);

      example_client_tunnel_callback_on_receive(
        {
          tunnelInstance: ONE_TunnelInstance,
        },
        (response: IExampleApiTunnelCallbackOnReceiveResponse) => {
          clearInterval(timer);
          resolve(false);
        },
      );
    });
  };

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: TWO_TunnelInstance ?? ({} as any),
  });

  return responseDelay();
};

export const TOPIC_SetPresence = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const ONE_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceOne?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  const TWO_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceTwo?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
    identifiers: undefined,
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers: undefined,
  });

  const topicInstanceOne = await example_client_tunnel_topic_get({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
  });

  const topicInstanceTwo = await example_client_tunnel_topic_get({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
  });

  const presenceTWO = JSON.parse(JSON.stringify(presence));
  presenceTWO.userId = "presence2";

  await example_client_topic_set_presence({
    topicInstance: topicInstanceTwo,
    presenceData: presence,
  });

  example_client_topic_set_presence({
    topicInstance: topicInstanceOne,
    presenceData: presenceTWO,
  });

  console.log("11111");

  const receivedPresenceTwo = await example_client_tunnel_callback_on_receive({
    tunnelInstance: TWO_TunnelInstance,
  });

  console.log("receivedPresenceTwo", receivedPresenceTwo);

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  return receivedPresenceTwo.presences.sort().map((i) => {
    return JSON.parse(i);
  });
};

export const TOPIC_standardPubSubAddIdentifiers = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const ONE_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceOne?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  const TWO_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceTwo?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
    identifiers: undefined,
  });

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers: undefined,
    data: pubSubData,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: ONE_TunnelInstance,
  });

  const topicInstance = await ONE_TunnelInstance.getTopic(topicName);

  await example_client_topic_add_identifiers({
    topicInstance,
    identifiers,
  });

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers: identifiers,
    data: pubSubData,
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: TWO_TunnelInstance ?? ({} as any),
  });

  return response;
};

export const TOPIC_standardPubSubRemoveIdentifiers = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const ONE_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceOne?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  const TWO_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceTwo?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
    identifiers: undefined,
  });

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers: undefined,
    data: pubSubData,
  });

  await example_client_tunnel_callback_on_receive({
    tunnelInstance: ONE_TunnelInstance,
  });

  const topicInstance = await ONE_TunnelInstance.getTopic(topicName);

  await example_client_topic_add_identifiers({
    topicInstance,
    identifiers,
  });

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers: identifiers,
    data: pubSubData,
  });

  await example_client_tunnel_callback_on_receive({
    tunnelInstance: ONE_TunnelInstance,
  });

  await example_client_topic_remove_identifiers({
    topicInstance,
    identifiers: ["identifier1"],
  });

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers: ["identifier1"],
    data: pubSubData,
  });

  const delayTimeout = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(true);
      }, 1000);

      example_client_tunnel_callback_on_receive(
        {
          tunnelInstance: ONE_TunnelInstance,
        },
        (response: IExampleApiTunnelCallbackOnReceiveResponse) => {
          clearInterval(timer);
          resolve(false);
        },
      );
    });
  };

  const notReceived = await delayTimeout();

  await example_client_tunnel_publish({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
    identifiers: ["identifier2"],
    data: pubSubData,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: ONE_TunnelInstance,
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: TWO_TunnelInstance ?? ({} as any),
  });

  return {
    notReceived,
    response,
  };
};

export const TOPIC_PubSub = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const ONE_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceOne?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  const TWO_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceTwo?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
    identifiers: undefined,
  });

  const topicInstance = await TWO_TunnelInstance.getTopic(topicName);

  await example_client_topic_publish({
    topicInstance,
    identifiers: undefined,
    data: pubSubData,
  });

  const response = await example_client_topic_callback_on_receive({
    topicInstance,
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: TWO_TunnelInstance ?? ({} as any),
  });

  return response;
};

export const TOPIC_Unsubscribe = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const ONE_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceOne?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  const TWO_TunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: environmentInstanceTwo?.device?.deviceAccessToken ?? "",
    options: {
      debug: true,
    },
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
    identifiers: undefined,
  });

  const topicInstanceOne = await example_client_tunnel_topic_get({
    tunnelInstance: ONE_TunnelInstance,
    topicName,
  });

  await example_client_topic_unsubscribe({
    topicInstance: topicInstanceOne,
  });

  const topicInstanceTwo = await example_client_tunnel_topic_get({
    tunnelInstance: TWO_TunnelInstance,
    topicName,
  });

  await example_client_topic_publish({
    topicInstance: topicInstanceTwo,
    identifiers: undefined,
    data: pubSubData,
  });

  const delayTimeout = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(true);
      }, 1000);

      example_client_tunnel_callback_on_receive(
        {
          tunnelInstance: ONE_TunnelInstance,
        },
        (response: IExampleApiTunnelCallbackOnReceiveResponse) => {
          clearInterval(timer);
          resolve(false);
        },
      );
    });
  };

  const notReceived = await delayTimeout();

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: TWO_TunnelInstance ?? ({} as any),
  });

  return notReceived;
};
