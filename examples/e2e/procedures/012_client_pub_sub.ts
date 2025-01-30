import { test, expect } from "@playwright/test";
import type { IDeviceModel, ITopic, ITunnel } from "nolagjs";
import { EAccessPermission } from "nolagjs";
import { example_api_tunnel_device_update } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_update";
import dayjs from "dayjs";
import { example_client_tunnel_connect } from "../../SDK/Client/tunnel_instance/example_client_tunnel_connect";
import { example_client_tunnel_publish } from "../../SDK/Client/tunnel_instance/example_client_tunnel_publish";
import { example_client_tunnel_subscribe } from "../../SDK/Client/tunnel_instance/example_client_tunnel_subscribe";
import {
  example_client_tunnel_callback_on_receive,
  IExampleApiTunnelCallbackOnReceiveResponse,
} from "../../SDK/Client/tunnel_instance/example_client_tunnel_callback_on_receive";
import { example_api_tunnel_device_create } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_create";
import { example_client_topic_set_presence } from "../../SDK/Client/topic_instance/example_client_topic_set_presence";
import { example_client_tunnel_unsubscribe } from "../../SDK/Client/tunnel_instance/example_client_tunnel_unsubscribe";
import { example_client_topic_publish } from "../../SDK/Client/topic_instance/example_client_topic_publish";
import { example_client_topic_callback_on_receive } from "../../SDK/Client/topic_instance/example_client_topic_callback_on_receive";
import { example_client_topic_unsubscribe } from "../../SDK/Client/topic_instance/example_client_topic_unsubscribe";
import { IGlobalVars } from "../../constants/globalVars";
import { example_client_tunnel_topic_get } from "../../SDK/Client/tunnel_instance/example_client_tunnel_topic_get";
import { example_client_topic_remove_identifiers } from "../../SDK/Client/topic_instance/example_client_topic_remove_identifiers";
import { delay } from "../../constants/util/delay";

export interface IClientPubSub {
  tunnelId: string;
  tunnelName: string;
  deviceName: string;
  deviceTokenId: string;
  deviceAccessToken: string;
  topicName: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
  noLagDeveloperTestConfigIgnoreWs: Record<any, any>;
  expireIn?: number;
  browserInstance?: IGlobalVars;
  nodeInstance?: IGlobalVars;
}

const identifiers: string[] = ["identifier1", "identifier2"];

export const TUNNEL_standardPubSub = async ({
  topicName,
  noLagDeveloperTestConfigIgnoreWs,
  browserInstance,
  nodeInstance,
}: IClientPubSub) => {
  const data = {
    prop1: "data1",
  };
  const identifiers = undefined;

  const browserTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
  });

  const nodeTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: browserTunnelInstance,
    topicName,
    identifiers,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers,
    data,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: browserTunnelInstance,
  });

  browserTunnelInstance.disconnect();
  nodeTunnelInstance.disconnect();

  return response;
};

export const TUNNEL_standardPubSubWithIdentifiers = async ({
  topicName,
  noLagDeveloperTestConfigIgnoreWs,
  browserInstance,
  nodeInstance,
}: IClientPubSub) => {
  const data = {
    prop1: "data1",
  };

  const browserTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
  });

  const nodeTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: browserTunnelInstance,
    topicName,
    identifiers,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers,
    data,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: browserTunnelInstance,
  });

  browserTunnelInstance.disconnect();
  nodeTunnelInstance.disconnect();

  return response;
};

export const TUNNEL_standardPubSubAddIdentifiers = async ({
  topicName,
  noLagDeveloperTestConfigIgnoreWs,
  browserInstance,
  nodeInstance,
}: IClientPubSub) => {
  const data = {
    prop1: "data1",
  };

  const browserTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
  });

  const nodeTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: browserTunnelInstance,
    topicName,
    identifiers: undefined,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers: [identifiers?.[0] ?? ""],
    data,
  });

  await example_client_tunnel_callback_on_receive({
    tunnelInstance: browserTunnelInstance,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers: [identifiers?.[1] ?? ""],
    data,
  });

  await example_client_tunnel_callback_on_receive({
    tunnelInstance: browserTunnelInstance,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers: identifiers,
    data,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: browserTunnelInstance,
  });

  browserTunnelInstance.disconnect();
  nodeTunnelInstance.disconnect();

  return response;
};

export const TUNNEL_unsubscribe = async ({
  topicName,
  noLagDeveloperTestConfigIgnoreWs,
  browserInstance,
  nodeInstance,
}: IClientPubSub) => {
  const data = {
    prop1: "data1",
  };
  const identifiers = undefined;

  const browserTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
  });

  const nodeTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: browserTunnelInstance,
    topicName,
    identifiers,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers,
    data,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: browserTunnelInstance,
  });

  if (response.data.prop1 !== data.prop1) {
    browserTunnelInstance.disconnect();
    nodeTunnelInstance.disconnect();
    return false;
  }

  await example_client_tunnel_unsubscribe({
    tunnelInstance: browserTunnelInstance,
    topicName,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers,
    data,
  });

  const unsubscribeTimeout: Promise<boolean> = new Promise((resolve) => {
    setTimeout(() => {
      let timeout = true;
      example_client_tunnel_callback_on_receive(
        {
          tunnelInstance: browserTunnelInstance,
        },
        (response) => {
          timeout = false;
        },
      );
      resolve(timeout);
    }, 1000);
  });

  const unsubscribeResponse = await unsubscribeTimeout;

  browserTunnelInstance.disconnect();
  nodeTunnelInstance.disconnect();

  return unsubscribeResponse;
};

export const TOPIC_addIdentifiersToInstance = async ({
  topicName,
  noLagDeveloperTestConfigIgnoreWs,
  browserInstance,
  nodeInstance,
  tunnelName,
}: IClientPubSub) => {
  const data = {
    prop1: "data1",
  };

  const browserTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
  });

  const nodeTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: browserTunnelInstance,
    topicName,
    identifiers: undefined,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers: undefined,
    data,
  });

  const response = await example_client_tunnel_callback_on_receive({
    tunnelInstance: browserTunnelInstance,
  });

  const browserTopic = await example_client_tunnel_topic_get({
    tunnelInstance: nodeTunnelInstance,
    topicName,
  });

  browserTopic?.addIdentifiers({
    OR: identifiers,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers: [identifiers?.[0] ?? ""],
    data,
  });

  const responseOneIdentifier = await example_client_tunnel_callback_on_receive(
    {
      tunnelInstance: browserTunnelInstance,
    },
  );

  if (responseOneIdentifier.data.prop1 !== data.prop1) {
    browserTunnelInstance.disconnect();
    nodeTunnelInstance.disconnect();
    return false;
  }

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers: [identifiers?.[1] ?? ""],
    data,
  });

  await example_client_tunnel_callback_on_receive({
    tunnelInstance: browserTunnelInstance,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers,
    data,
  });

  const responseAllIdentifiers =
    await example_client_tunnel_callback_on_receive({
      tunnelInstance: browserTunnelInstance,
    });

  if (responseAllIdentifiers.data.prop1 !== data.prop1) {
    browserTunnelInstance.disconnect();
    nodeTunnelInstance.disconnect();
    return false;
  }

  browserTunnelInstance.disconnect();
  nodeTunnelInstance.disconnect();

  return responseAllIdentifiers;
};

export const TOPIC_removeIdentifiersToInstance = async ({
  topicName,
  noLagDeveloperTestConfigIgnoreWs,
  browserInstance,
  nodeInstance,
  tunnelName,
}: IClientPubSub) => {
  const data = {
    prop1: "data1",
  };

  const browserTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
  });

  const nodeTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: browserTunnelInstance,
    topicName,
    identifiers: identifiers,
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers: identifiers,
    data,
  });

  await example_client_tunnel_callback_on_receive({
    tunnelInstance: browserTunnelInstance,
  });

  const browserTopic = await example_client_tunnel_topic_get({
    tunnelInstance: browserTunnelInstance,
    topicName,
  });

  if (!browserTopic) {
    return false;
  }

  await example_client_topic_remove_identifiers({
    topicInstance: browserTopic,
    identifiers: [identifiers?.[0] ?? ""],
  });

  await example_client_tunnel_publish({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers: [identifiers?.[0] ?? ""],
    data,
  });

  const unsubscribeTimeout: Promise<boolean> = new Promise((resolve) => {
    setTimeout(() => {
      let timeout = true;
      example_client_tunnel_callback_on_receive(
        {
          tunnelInstance: browserTunnelInstance,
        },
        (response) => {
          timeout = false;
        },
      );
      resolve(timeout);
    }, 1000);
  });

  browserTunnelInstance.disconnect();
  nodeTunnelInstance.disconnect();

  return unsubscribeTimeout;
};

export const TOPIC_deviceOneSetPresenceDeviceTwoReceivePresence = async ({
  topicName,
  noLagDeveloperTestConfigIgnoreWs,
  browserInstance,
  nodeInstance,
  tunnelName,
}: IClientPubSub) => {
  const presenceDataBrowser = {
    prop: "presenceBrowser",
  };

  const presenceDataNode = {
    prop: "presenceNode",
  };

  const browserTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
  });

  const nodeTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: browserTunnelInstance,
    topicName,
    identifiers,
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: nodeTunnelInstance,
    topicName,
    identifiers,
  });

  const browserTopic = await example_client_tunnel_topic_get({
    tunnelInstance: browserTunnelInstance,
    topicName,
  });

  const nodeTopic = await example_client_tunnel_topic_get({
    tunnelInstance: nodeTunnelInstance,
    topicName,
  });

  const browserReceive: any[] = [];
  const nodeReceive: any[] = [];

  example_client_topic_callback_on_receive(
    {
      topicInstance: browserTopic as ITopic,
    },
    (response) => {
      response?.presences.forEach((i) => {
        browserReceive.push(JSON.parse(i));
      });
    },
  );

  example_client_topic_callback_on_receive(
    {
      topicInstance: browserTopic as ITopic,
    },
    (response) => {
      response?.presences.forEach((i) => {
        nodeReceive.push(JSON.parse(i));
      });
    },
  );

  await example_client_topic_set_presence({
    topicInstance: browserTopic as ITopic,
    presenceData: presenceDataBrowser,
  });

  await example_client_topic_set_presence({
    topicInstance: nodeTopic as ITopic,
    presenceData: presenceDataNode,
  });

  await delay;

  browserTunnelInstance.disconnect();
  nodeTunnelInstance.disconnect();

  return {
    browserReceive,
    nodeReceive,
  };
};

export const TOPIC_publishUnsubscribe = async ({
  topicName,
  noLagDeveloperTestConfigIgnoreWs,
  browserInstance,
  nodeInstance,
  tunnelName,
}: IClientPubSub) => {
  const data = {
    prop1: "data1",
  };

  const browserTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: browserInstance?.device?.deviceAccessToken ?? "",
  });

  const nodeTunnelInstance = await example_client_tunnel_connect({
    noLagDeveloperTestConfigIgnoreWs,
    deviceToken: nodeInstance?.device?.deviceAccessToken ?? "",
  });

  await example_client_tunnel_subscribe({
    tunnelInstance: browserTunnelInstance,
    topicName,
    identifiers: identifiers,
  });

  const browserTopic = await example_client_tunnel_topic_get({
    tunnelInstance: nodeTunnelInstance,
    topicName,
  });

  const nodeTopic = await example_client_tunnel_topic_get({
    tunnelInstance: nodeTunnelInstance,
    topicName,
  });

  await example_client_topic_publish({
    topicInstance: nodeTopic as ITopic,
    identifiers: identifiers,
    data,
  });

  await example_client_tunnel_callback_on_receive({
    tunnelInstance: browserTunnelInstance,
  });

  await example_client_topic_unsubscribe({topicInstance: browserTopic as ITopic});

  await example_client_tunnel_publish({
    topicName,
    tunnelInstance: browserInstance as ITunnel,
    identifiers: identifiers,
    data,
  });

  const unsubscribeTimeout: Promise<boolean> = new Promise((resolve) => {
    setTimeout(() => {
      let receivedResponse = false;
      example_client_tunnel_callback_on_receive(
        {
          tunnelInstance,
        },
        (response) => {
          receivedResponse = true;
        },
      );
      resolve(receivedResponse);
    }, 1000);
  });

  browserTunnelInstance.disconnect();
  nodeTunnelInstance.disconnect();

  return response;
};

test.describe("Playwright client pub/sub", () => {
  // test("Tunnel: standard pub/sub NO Identifier and NO presences set", async ({
  //   page,
  // }) => {
  //   if (!globalVars.device) {
  //     expect(false).toBeTruthy();
  //     return;
  //   }
  //
  //   const topicName = globalVars.topic?.name ?? "";
  //   const identifiers = undefined;
  //
  //   const data = {
  //     prop1: "data1",
  //   };
  //
  //   // reset device
  //   const payload: IDeviceModel = {
  //     name: globalVars.deviceName,
  //     accessPermission: EAccessPermission.PubSub,
  //     staticTopics: [],
  //     lockTopics: false,
  //     expireIn: 0,
  //   };
  //
  //   const resetResponse = await example_api_tunnel_device_update({
  //     payload,
  //     yourProjectApiKey,
  //     noLagDeveloperTestConfigIgnore,
  //     tunnelId,
  //     deviceId: globalVars.device.deviceTokenId ?? "",
  //   });
  //
  //   if (resetResponse) {
  //     globalVars.setDevice(resetResponse);
  //   }
  //
  //   const { deviceAccessToken } = resetResponse;
  //
  //   const tunnelInstance = await example_client_tunnel_connect({
  //     noLagDeveloperTestConfigIgnoreWs,
  //     deviceToken: deviceAccessToken ?? "",
  //   });
  //
  //   await example_client_tunnel_subscribe({
  //     tunnelInstance,
  //     topicName,
  //     identifiers,
  //   });
  //
  //   await example_client_tunnel_publish({
  //     tunnelInstance,
  //     topicName,
  //     identifiers,
  //     data,
  //   });
  //
  //   const response = await example_client_tunnel_callback_on_receive({
  //     tunnelInstance,
  //   });
  //
  //   tunnelInstance.disconnect();
  // });

  // test("Tunnel: unsubscribe", async ({ page }) => {
  //   if (!globalVars.device) {
  //     expect(false).toBeTruthy();
  //     return;
  //   }
  //
  //   const topicName = globalVars.topic?.name ?? "";
  //   const identifiers = undefined;
  //
  //   const data = {
  //     prop1: "data1",
  //   };
  //
  //   // reset device
  //   const payload: IDeviceModel = {
  //     name: globalVars.deviceName,
  //     accessPermission: EAccessPermission.PubSub,
  //     staticTopics: [],
  //     lockTopics: false,
  //     expireIn: 0,
  //   };
  //
  //   const resetResponse = await example_api_tunnel_device_update({
  //     payload,
  //     yourProjectApiKey,
  //     noLagDeveloperTestConfigIgnore,
  //     tunnelId,
  //     deviceId: globalVars.device.deviceTokenId ?? "",
  //   });
  //
  //   if (resetResponse) {
  //     globalVars.setDevice(resetResponse);
  //   }
  //
  //   const { deviceAccessToken } = resetResponse;
  //
  //   const tunnelInstance = await example_client_tunnel_connect({
  //     noLagDeveloperTestConfigIgnoreWs,
  //     deviceToken: deviceAccessToken ?? "",
  //   });
  //
  //   await example_client_tunnel_subscribe({
  //     tunnelInstance,
  //     topicName,
  //     identifiers,
  //   });
  //
  //   await example_client_tunnel_publish({
  //     tunnelInstance,
  //     topicName,
  //     identifiers,
  //     data,
  //   });
  //
  //   const response = await example_client_tunnel_callback_on_receive({
  //     tunnelInstance,
  //   });
  //
  //   await example_client_tunnel_unsubscribe({
  //     tunnelInstance,
  //     topicName,
  //   });
  //
  //   await example_client_tunnel_publish({
  //     tunnelInstance,
  //     topicName,
  //     identifiers,
  //     data,
  //   });
  //
  //   const unsubscribeTimeout: Promise<boolean> = new Promise((resolve) => {
  //     setTimeout(() => {
  //       let receivedResponse = false;
  //       example_client_tunnel_callback_on_receive(
  //         {
  //           tunnelInstance,
  //         },
  //         (response) => {
  //           receivedResponse = true;
  //         },
  //       );
  //       resolve(receivedResponse);
  //     }, 1000);
  //   });
  //
  //   tunnelInstance.disconnect();
  //
  //   const unsubscribeResponse = await unsubscribeTimeout;
  //
  //   expect(unsubscribeResponse).toBeFalsy();
  //   expect(data).toMatchObject(response?.data);
  // });

  // test("Tunnel: standard pub/sub with Identifiers set and NO presences set", async ({
  //   page,
  // }) => {
  //   if (!globalVars.device) {
  //     expect(false).toBeTruthy();
  //     return;
  //   }
  //
  //   const topicName = globalVars.topic?.name ?? "";
  //   const identifiers = ["identifier1", "identifier2"];
  //   const data = {
  //     prop1: "data1",
  //   };
  //
  //   // reset device
  //   const payload: IDeviceModel = {
  //     name: globalVars.deviceName,
  //     accessPermission: EAccessPermission.PubSub,
  //     staticTopics: [],
  //     lockTopics: false,
  //     expireIn: 0,
  //   };
  //
  //   const resetResponse = await example_api_tunnel_device_update({
  //     payload,
  //     yourProjectApiKey,
  //     noLagDeveloperTestConfigIgnore,
  //     tunnelId,
  //     deviceId: globalVars.device.deviceTokenId ?? "",
  //   });
  //
  //   if (resetResponse) {
  //     globalVars.setDevice(resetResponse);
  //   }
  //
  //   const { deviceAccessToken } = resetResponse;
  //
  //   const tunnelInstance = await example_client_tunnel_connect({
  //     noLagDeveloperTestConfigIgnoreWs,
  //     deviceToken: deviceAccessToken ?? "",
  //   });
  //
  //   await example_client_tunnel_subscribe({
  //     tunnelInstance,
  //     topicName,
  //     identifiers,
  //   });
  //
  //   await example_client_tunnel_publish({
  //     tunnelInstance,
  //     topicName,
  //     identifiers,
  //     data,
  //   });
  //
  //   const response = await example_client_tunnel_callback_on_receive({
  //     tunnelInstance,
  //   });
  //
  //   tunnelInstance.disconnect();
  //
  //   expect(data).toMatchObject(response?.data);
  //   expect(topicName).toBe(response?.topicName);
  //   expect(identifiers).toMatchObject(response?.identifiers);
  //   expect(0).toBe(response?.presences.length);
  // });

  // test("Topic: add Identifiers to topic instance", async ({ page }) => {
  //   if (!globalVars.device) {
  //     expect(false).toBeTruthy();
  //     return;
  //   }
  //
  //   const topicName = globalVars.topic?.name ?? "";
  //   const identifiers = ["identifier1", "identifier2"];
  //   const data = {
  //     prop1: "data1",
  //   };
  //
  //   // reset device
  //   const payload: IDeviceModel = {
  //     name: globalVars.deviceName,
  //     accessPermission: EAccessPermission.PubSub,
  //     staticTopics: [],
  //     lockTopics: false,
  //     expireIn: 0,
  //   };
  //
  //   const resetResponse = await example_api_tunnel_device_update({
  //     payload,
  //     yourProjectApiKey,
  //     noLagDeveloperTestConfigIgnore,
  //     tunnelId,
  //     deviceId: globalVars.device.deviceTokenId ?? "",
  //   });
  //
  //   if (resetResponse) {
  //     globalVars.setDevice(resetResponse);
  //   }
  //
  //   const { deviceAccessToken } = resetResponse;
  //
  //   const tunnelInstance = await example_client_tunnel_connect({
  //     noLagDeveloperTestConfigIgnoreWs,
  //     deviceToken: deviceAccessToken ?? "",
  //   });
  //
  //   await example_client_tunnel_subscribe({
  //     tunnelInstance,
  //     topicName,
  //     identifiers: undefined,
  //   });
  //
  //   await example_client_tunnel_publish({
  //     tunnelInstance,
  //     topicName,
  //     identifiers: undefined,
  //     data,
  //   });
  //
  //   const responseNoIdentifiers =
  //     await example_client_tunnel_callback_on_receive({
  //       tunnelInstance,
  //     });
  //
  //   tunnelInstance.getTopic(topicName)?.addIdentifiers({
  //     OR: identifiers,
  //   });
  //
  //   await example_client_tunnel_publish({
  //     tunnelInstance,
  //     topicName,
  //     identifiers,
  //     data,
  //   });
  //
  //   const responseWithIdentifiers =
  //     await example_client_tunnel_callback_on_receive({
  //       tunnelInstance,
  //     });
  //
  //   tunnelInstance.disconnect();
  //
  //   expect(data).toMatchObject(responseNoIdentifiers?.data);
  //   expect(topicName).toBe(responseNoIdentifiers?.topicName);
  //   expect([]).toMatchObject(responseNoIdentifiers?.identifiers);
  //   expect(0).toBe(responseNoIdentifiers?.presences.length);
  //
  //   expect(data).toMatchObject(responseWithIdentifiers?.data);
  //   expect(topicName).toBe(responseWithIdentifiers?.topicName);
  //   expect(identifiers).toMatchObject(responseWithIdentifiers?.identifiers);
  //   expect(0).toBe(responseWithIdentifiers?.presences.length);
  // });

  // test("Topic: remove Identifiers to topic instance", async ({ page }) => {
  //   if (!globalVars.device) {
  //     expect(false).toBeTruthy();
  //     return;
  //   }
  //
  //   const topicName = globalVars.topic?.name ?? "";
  //   const identifiers = ["identifier1", "identifier2"];
  //   const data = {
  //     prop1: "data1",
  //   };
  //
  //   // reset device
  //   const payload: IDeviceModel = {
  //     name: globalVars.deviceName,
  //     accessPermission: EAccessPermission.PubSub,
  //     staticTopics: [],
  //     lockTopics: false,
  //     expireIn: 0,
  //   };
  //
  //   const resetResponse = await example_api_tunnel_device_update({
  //     payload,
  //     yourProjectApiKey,
  //     noLagDeveloperTestConfigIgnore,
  //     tunnelId,
  //     deviceId: globalVars.device.deviceTokenId ?? "",
  //   });
  //
  //   if (resetResponse) {
  //     globalVars.setDevice(resetResponse);
  //   }
  //
  //   const { deviceAccessToken } = resetResponse;
  //
  //   const tunnelInstance = await example_client_tunnel_connect({
  //     noLagDeveloperTestConfigIgnoreWs,
  //     deviceToken: deviceAccessToken ?? "",
  //   });
  //
  //   await example_client_tunnel_subscribe({
  //     tunnelInstance,
  //     topicName,
  //     identifiers: undefined,
  //   });
  //
  //   await example_client_tunnel_publish({
  //     tunnelInstance,
  //     topicName,
  //     identifiers: undefined,
  //     data,
  //   });
  //
  //   const responseNoIdentifiers =
  //     await example_client_tunnel_callback_on_receive({
  //       tunnelInstance,
  //     });
  //
  //   tunnelInstance.getTopic(topicName)?.addIdentifiers({
  //     OR: identifiers,
  //   });
  //
  //   await example_client_tunnel_publish({
  //     tunnelInstance,
  //     topicName,
  //     identifiers,
  //     data,
  //   });
  //
  //   const responseWithIdentifiers =
  //     await example_client_tunnel_callback_on_receive({
  //       tunnelInstance,
  //     });
  //
  //   tunnelInstance.disconnect();
  //
  //   expect(data).toMatchObject(responseNoIdentifiers?.data);
  //   expect(topicName).toBe(responseNoIdentifiers?.topicName);
  //   expect([]).toMatchObject(responseNoIdentifiers?.identifiers);
  //   expect(0).toBe(responseNoIdentifiers?.presences.length);
  //
  //   expect(data).toMatchObject(responseWithIdentifiers?.data);
  //   expect(topicName).toBe(responseWithIdentifiers?.topicName);
  //   expect(identifiers).toMatchObject(responseWithIdentifiers?.identifiers);
  //   expect(0).toBe(responseWithIdentifiers?.presences.length);
  // });

  test("Topic: device ONE set presences, device TWO receive presence", async ({
    page,
  }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const topicName = globalVars.topic?.name ?? "";
    const identifiers = ["identifier1", "identifier2"];
    const data = {
      prop1: "data1",
    };
    const presenceData = {
      prop1: "presenceData1",
    };

    // reset device
    const payload: IDeviceModel = {
      name: globalVars.deviceName,
      accessPermission: EAccessPermission.PubSub,
      staticTopics: [],
      lockTopics: false,
      expireIn: 0,
    };

    const resetResponse = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (resetResponse) {
      globalVars.setDevice(resetResponse);
    }

    payload.name = `${globalVars.deviceName}_presence_1`;

    const { deviceAccessToken: secondDeviceAccessToken } =
      await example_api_tunnel_device_create({
        payload,
        yourProjectApiKey,
        noLagDeveloperTestConfigIgnore,
        tunnelId,
        deviceName: payload.name,
      });

    const { deviceAccessToken } = resetResponse;

    const tunnelInstanceOne = await example_client_tunnel_connect({
      noLagDeveloperTestConfigIgnoreWs,
      deviceToken: deviceAccessToken ?? "",
    });

    const tunnelInstanceTwo = await example_client_tunnel_connect({
      noLagDeveloperTestConfigIgnoreWs,
      deviceToken: secondDeviceAccessToken ?? "",
    });

    await example_client_tunnel_subscribe({
      tunnelInstance: tunnelInstanceOne,
      topicName,
      identifiers,
    });

    await example_client_tunnel_subscribe({
      tunnelInstance: tunnelInstanceTwo,
      topicName,
      identifiers,
    });

    const topicInstanceTwo = tunnelInstanceTwo.getTopic(topicName);

    await example_client_topic_set_presence({
      topicInstance: topicInstanceTwo as ITopic,
      presenceData: presenceData,
    });

    const response = await example_client_tunnel_callback_on_receive({
      tunnelInstance: tunnelInstanceTwo,
    });

    tunnelInstanceOne.disconnect();
    tunnelInstanceTwo.disconnect();

    expect(topicName).toBe(response?.topicName);
    expect(identifiers).toMatchObject(response?.identifiers);
    expect(JSON.stringify(presenceData)).toBe(response?.presences.shift());
  });

  test("Topic: device ONE set presences, device TWO set presence, device ONE receive both presences", async ({
    page,
  }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const topicName = globalVars.topic?.name ?? "";
    const identifiers = ["identifier1", "identifier2"];

    // reset device
    const payload: IDeviceModel = {
      name: globalVars.deviceName,
      accessPermission: EAccessPermission.PubSub,
      staticTopics: [],
      lockTopics: false,
      expireIn: 0,
    };

    const resetResponse = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (resetResponse) {
      globalVars.setDevice(resetResponse);
    }

    const deviceTwoName = `${globalVars.deviceName}_presence_2`;

    payload.name = `${globalVars.deviceName}_presence_2`;

    const { deviceAccessToken: secondDeviceAccessToken } =
      await example_api_tunnel_device_create({
        payload: { ...payload, name: deviceTwoName },
        yourProjectApiKey,
        noLagDeveloperTestConfigIgnore,
        tunnelId,
        deviceName: deviceTwoName,
      });

    const { deviceAccessToken } = resetResponse;

    const tunnelInstanceOne = await example_client_tunnel_connect({
      noLagDeveloperTestConfigIgnoreWs,
      deviceToken: deviceAccessToken ?? "",
    });

    const tunnelInstanceTwo = await example_client_tunnel_connect({
      noLagDeveloperTestConfigIgnoreWs,
      deviceToken: secondDeviceAccessToken ?? "",
    });

    await example_client_tunnel_subscribe({
      tunnelInstance: tunnelInstanceOne,
      topicName,
      identifiers,
    });

    await example_client_tunnel_subscribe({
      tunnelInstance: tunnelInstanceTwo,
      topicName,
      identifiers,
    });

    const topicInstanceOne = tunnelInstanceOne.getTopic(topicName);

    const topicInstanceTwo = tunnelInstanceTwo.getTopic(topicName);

    const presenceDataOne = {
      prop2: resetResponse.name,
    };

    await example_client_topic_set_presence({
      topicInstance: topicInstanceOne as ITopic,
      presenceData: presenceDataOne,
    });

    const presenceDataTwo = {
      prop2: deviceTwoName,
    };

    await example_client_topic_set_presence({
      topicInstance: topicInstanceTwo as ITopic,
      presenceData: presenceDataTwo,
    });

    const resolveTest: Promise<IExampleApiTunnelCallbackOnReceiveResponse> =
      new Promise((resolve, reject) => {
        example_client_tunnel_callback_on_receive(
          {
            tunnelInstance: tunnelInstanceOne,
          },
          (response) => {
            const presences = response?.presences.map((i) => JSON.parse(i));
            if (presences?.length === 2) {
              resolve(response);
            }
          },
        );
      });

    const resolvedTest = await resolveTest;

    const presences = resolvedTest?.presences.map((i) => JSON.parse(i));

    tunnelInstanceOne.disconnect();
    tunnelInstanceTwo.disconnect();

    expect(topicName).toBe(resolvedTest?.topicName);
    expect(identifiers).toMatchObject(resolvedTest?.identifiers);

    expect(
      presences.find((i) => i.prop2 === presenceDataOne.prop2),
    ).toMatchObject(presenceDataOne);
    expect(
      presences.find((i) => i.prop2 === presenceDataTwo.prop2),
    ).toMatchObject(presenceDataTwo);
  });

  test("Topic: publish and unsubscribe", async ({ page }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const topicName = globalVars.topic?.name ?? "";
    const identifiers = undefined;

    const data = {
      prop1: "data1",
    };

    // reset device
    const payload: IDeviceModel = {
      name: globalVars.deviceName,
      accessPermission: EAccessPermission.PubSub,
      staticTopics: [],
      lockTopics: false,
      expireIn: 0,
    };

    const resetResponse = await example_api_tunnel_device_update({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      tunnelId,
      deviceId: globalVars.device.deviceTokenId ?? "",
    });

    if (resetResponse) {
      globalVars.setDevice(resetResponse);
    }

    const { deviceAccessToken } = resetResponse;

    const tunnelInstance = await example_client_tunnel_connect({
      noLagDeveloperTestConfigIgnoreWs,
      deviceToken: deviceAccessToken ?? "",
    });

    await example_client_tunnel_subscribe({
      tunnelInstance,
      topicName,
      identifiers,
    });

    const topicInstance = tunnelInstance.getTopic(topicName) as ITopic;

    await example_client_topic_publish({ topicInstance, identifiers, data });

    const responseFromPublish = await example_client_topic_callback_on_receive({
      topicInstance,
    });

    await example_client_topic_unsubscribe({
      topicInstance,
    });

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers,
      data,
    });

    const unsubscribeTimeout: Promise<boolean> = new Promise((resolve) => {
      setTimeout(() => {
        let receivedResponse = false;
        example_client_tunnel_callback_on_receive(
          {
            tunnelInstance,
          },
          (response) => {
            receivedResponse = true;
          },
        );
        resolve(receivedResponse);
      }, 1000);
    });

    tunnelInstance.disconnect();

    const unsubscribeResponse = await unsubscribeTimeout;

    expect(unsubscribeResponse).toBeFalsy();
    expect(data).toMatchObject(responseFromPublish?.data);
  });
});
