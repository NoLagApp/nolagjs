import type { ITopic, ITransport, ITunnel } from "nolagjs";
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
import { example_client_topic_add_identifiers } from "../../SDK/Client/topic_instance/example_client_topic_add_identifiers";

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

export interface IPresenceReceive {
  nodeReceive: any[];
  browserReceive: any[];
}

export const identifiers: string[] = ["identifier1", "identifier2"];

export const TUNNEL_standardPubSub = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const data = {
    prop1: "data1",
  };

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
    data,
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

  const data = {
    prop1: "data1",
  };

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
    data,
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

  const data = {
    prop1: "data1",
  };

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
    data,
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
    data,
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

export const TOPIC_standardPubSubAddIdentifiers = async ({
  noLagDeveloperTestConfigIgnoreWs,
  environmentInstanceOne,
  environmentInstanceTwo,
}: IClientPubSub) => {
  const topicName = environmentInstanceOne?.topic?.name ?? "";

  const data = {
    prop1: "data1",
  };

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
    data,
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
    data,
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: ONE_TunnelInstance ?? ({} as any),
  });

  await example_client_tunnel_disconnect({
    tunnelInstance: TWO_TunnelInstance ?? ({} as any),
  });

  return response;
};
