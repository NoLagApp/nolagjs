/**
 * E2E Test
 * These tests focus on specific use cases of the NolagJS SDK
 *
 * Use cases Tunnel:
 * - Tunnel:Secure: Standard pub/sub (Just a Topic now identifiers and presences)
 * - Tunnel:Secure: Pub/sub with identifiers set
 * Use cases Topic:
 * - Topic:Secure: Set presence
 * - Topic:Secure: Add identifiers
 * - Topic:Secure: Remove identifiers
 * - Topic:Secure: Publish
 */
import { test, expect } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import {
  identifiers,
  pubSubData,
  TOPIC_PubSub,
  TOPIC_SetPresence,
  TOPIC_standardPubSubAddIdentifiers,
  TOPIC_standardPubSubRemoveIdentifiers,
  TOPIC_Unsubscribe,
  TUNNEL_standardPubSub,
  TUNNEL_standardPubSubWithIdentifiers,
  TUNNEL_standardSecurePubSub,
  TUNNEL_StandardUnsubscribe,
} from "../procedures/012_client_pub_sub";
import { example_api_tunnel_device_update } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_update";
import { EAccessPermission, IDeviceModel } from "nolagjs";
import { example_api_tunnel_device_create } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_create";
import { example_api_tunnel_topic_create } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_create";

const yourProjectApiKey = browserInstance.yourProjectApiKey;
const noLagDeveloperTestConfigIgnore =
  browserInstance.noLagDeveloperTestConfigIgnore;

const noLagDeveloperTestConfigIgnoreWs =
  browserInstance.noLagDeveloperTestConfigIgnoreWs;

browserInstance.setDevice({
  deviceAccessToken: "19f042e5fad17cbb186eadda83f059f7",
});
browserInstance.setTopic({
  name: "node:e2e_Tunnel_1738580709899_edited_edited",
});

nodeInstance.setDevice({
  deviceAccessToken: "b1c1c091904494e72a94e6e21616470e",
  deviceTokenId: "7796c80a-80b3-41cf-ab7a-cccdb7404ee4",
});
nodeInstance.setTopic({
  name: "node:e2e_Tunnel_1738580709899_edited_edited",
});
nodeInstance.setTunnel({
  name: "node:e2e_Tunnel_1738580709899_edited",
  tunnelId: "36e8e22d-a699-4b11-9fb6-1cb47e79020b",
});

// test.describe("Playwright client pub/sub", () => {
//   test("NODE:Tunnel:Secure:Standard pub/sub NO Identifier and NO presences set", async ({
//     page,
//   }) => {
//     const secureTopicName = "secureTopic";
//
//     const topicPayload = {
//       name: secureTopicName,
//     }
//
//     await example_api_tunnel_topic_create({
//       payload: topicPayload,
//       yourProjectApiKey,
//       noLagDeveloperTestConfigIgnore,
//       tunnelName: nodeInstance.tunnel.name ?? "",
//       tunnelId: nodeInstance.tunnel.tunnelId ?? "",
//     });
//
//     const topicName = nodeInstance?.topic.name ?? "";
//
//     // const responseStandard = await TUNNEL_standardPubSub({
//     //   noLagDeveloperTestConfigIgnoreWs,
//     //   environmentInstanceOne: nodeInstance,
//     //   environmentInstanceTwo: browserInstance,
//     // });
//
//     const payload: IDeviceModel = {
//       name: nodeInstance.deviceName,
//       accessPermission: EAccessPermission.PubSub,
//       staticTopics: [
//         {
//           name: `${topicPayload.name}`,
//           identifiers: identifiers,
//         },
//       ],
//       lockTopics: true,
//       expireIn: 0,
//     };
//
//     const resetResponse = await example_api_tunnel_device_update({
//       payload,
//       yourProjectApiKey,
//       noLagDeveloperTestConfigIgnore,
//       tunnelId: nodeInstance.tunnel.tunnelId ?? "",
//       deviceId: nodeInstance.device.deviceTokenId ?? "",
//     });
//
//     if (resetResponse) {
//       nodeInstance.setDevice(resetResponse);
//     }
//
//     const responseSecure = await TUNNEL_standardSecurePubSub({
//       noLagDeveloperTestConfigIgnoreWs,
//       environmentInstanceOne: nodeInstance,
//       environmentInstanceTwo: browserInstance,
//     });
//
//     // expect(pubSubData).toMatchObject(responseStandard?.data);
//     // expect(topicName).toBe(responseStandard?.topicName);
//     // expect(0).toBe(responseStandard?.identifiers.length);
//     // expect(0).toBe(responseStandard?.presences.length);
//
//     expect(pubSubData).toMatchObject(responseSecure?.data);
//     expect(secureTopicName).toBe(responseSecure?.topicName);
//     expect(0).toBe(responseSecure?.identifiers.length);
//     expect(0).toBe(responseSecure?.presences.length);
//   });
//
//   test("NODE:Tunnel:Standard pub/sub WITH Identifiers and NO presences set", async ({
//     page,
//   }) => {
//     // const payload: IDeviceModel = {
//     //   name: nodeInstance.deviceName,
//     //   accessPermission: EAccessPermission.PubSub,
//     //   staticTopics: [],
//     //   lockTopics: false,
//     //   expireIn: 0,
//     // };
//     //
//     // const resetResponse = await example_api_tunnel_device_update({
//     //   payload,
//     //   yourProjectApiKey,
//     //   noLagDeveloperTestConfigIgnore,
//     //   tunnelId,
//     //   deviceId: nodeInstance.device.deviceTokenId ?? "",
//     // });
//
//     // if (resetResponse) {
//     //   nodeInstance.setDevice(resetResponse);
//     // }
//
//     const response = await TUNNEL_standardPubSubWithIdentifiers({
//       noLagDeveloperTestConfigIgnoreWs,
//       environmentInstanceOne: browserInstance,
//       environmentInstanceTwo: nodeInstance,
//     });
//
//     const topicName = nodeInstance?.topic.name ?? "";
//     const identifiers = ["identifier1", "identifier2"];
//
//     expect(pubSubData).toMatchObject(response?.data);
//     expect(topicName).toBe(response?.topicName);
//     expect(identifiers).toMatchObject(response?.identifiers);
//     expect(2).toBe(response?.identifiers.length);
//     expect(0).toBe(response?.presences.length);
//   });
//
//   test("NODE:Tunnel:Standard Unsubscribe", async ({ page }) => {
//     // const payload: IDeviceModel = {
//     //   name: nodeInstance.deviceName,
//     //   accessPermission: EAccessPermission.PubSub,
//     //   staticTopics: [],
//     //   lockTopics: false,
//     //   expireIn: 0,
//     // };
//     //
//     // const resetResponse = await example_api_tunnel_device_update({
//     //   payload,
//     //   yourProjectApiKey,
//     //   noLagDeveloperTestConfigIgnore,
//     //   tunnelId,
//     //   deviceId: nodeInstance.device.deviceTokenId ?? "",
//     // });
//
//     // if (resetResponse) {
//     //   nodeInstance.setDevice(resetResponse);
//     // }
//
//     const response = await TUNNEL_StandardUnsubscribe({
//       noLagDeveloperTestConfigIgnoreWs,
//       environmentInstanceOne: nodeInstance,
//       environmentInstanceTwo: nodeInstance,
//     });
//
//     const topicName = nodeInstance?.topic.name ?? "";
//     const identifiers = ["identifier1", "identifier2"];
//
//     expect(response).toBeTruthy();
//   });
//
//   test("NODE:Topic:Set presence", async ({ page }) => {
//     // const payload: IDeviceModel = {
//     //   name: nodeInstance.deviceName,
//     //   accessPermission: EAccessPermission.PubSub,
//     //   staticTopics: [],
//     //   lockTopics: false,
//     //   expireIn: 0,
//     // };
//     //
//     // const resetResponse = await example_api_tunnel_device_update({
//     //   payload,
//     //   yourProjectApiKey,
//     //   noLagDeveloperTestConfigIgnore,
//     //   tunnelId,
//     //   deviceId: nodeInstance.device.deviceTokenId ?? "",
//     // });
//
//     // if (resetResponse) {
//     //   nodeInstance.setDevice(resetResponse);
//     // }
//
//     const response = await TOPIC_SetPresence({
//       noLagDeveloperTestConfigIgnoreWs,
//       environmentInstanceOne: browserInstance,
//       environmentInstanceTwo: nodeInstance,
//     });
//
//     expect(response).toBeTruthy();
//
//     expect(response?.length).toBe(2);
//     expect(response?.[0].userId).toBe("presence1");
//     expect(response?.[1].userId).toBe("presence2");
//   });
//
//   test("NODE:Topic:Add identifiers", async ({ page }) => {
//     // const payload: IDeviceModel = {
//     //   name: nodeInstance.deviceName,
//     //   accessPermission: EAccessPermission.PubSub,
//     //   staticTopics: [],
//     //   lockTopics: false,
//     //   expireIn: 0,
//     // };
//     //
//     // const resetResponse = await example_api_tunnel_device_update({
//     //   payload,
//     //   yourProjectApiKey,
//     //   noLagDeveloperTestConfigIgnore,
//     //   tunnelId,
//     //   deviceId: nodeInstance.device.deviceTokenId ?? "",
//     // });
//
//     // if (resetResponse) {
//     //   nodeInstance.setDevice(resetResponse);
//     // }
//
//     const response = await TOPIC_standardPubSubAddIdentifiers({
//       noLagDeveloperTestConfigIgnoreWs,
//       environmentInstanceOne: browserInstance,
//       environmentInstanceTwo: nodeInstance,
//     });
//
//     expect(response).toBeTruthy();
//     expect(pubSubData.prop1).toBe(response?.data?.prop1);
//   });
//
//   test("NODE:Topic:Remove identifiers", async ({ page }) => {
//     // const payload: IDeviceModel = {
//     //   name: nodeInstance.deviceName,
//     //   accessPermission: EAccessPermission.PubSub,
//     //   staticTopics: [],
//     //   lockTopics: false,
//     //   expireIn: 0,
//     // };
//     //
//     // const resetResponse = await example_api_tunnel_device_update({
//     //   payload,
//     //   yourProjectApiKey,
//     //   noLagDeveloperTestConfigIgnore,
//     //   tunnelId,
//     //   deviceId: nodeInstance.device.deviceTokenId ?? "",
//     // });
//
//     // if (resetResponse) {
//     //   nodeInstance.setDevice(resetResponse);
//     // }
//
//     const { response, notReceived } =
//       await TOPIC_standardPubSubRemoveIdentifiers({
//         noLagDeveloperTestConfigIgnoreWs,
//         environmentInstanceOne: browserInstance,
//         environmentInstanceTwo: nodeInstance,
//       });
//
//     expect(pubSubData.prop1).toBe(response?.data?.prop1);
//     expect(notReceived).toBeTruthy();
//   });
//
//   test("NODE:Topic:Publish", async ({ page }) => {
//     // const payload: IDeviceModel = {
//     //   name: nodeInstance.deviceName,
//     //   accessPermission: EAccessPermission.PubSub,
//     //   staticTopics: [],
//     //   lockTopics: false,
//     //   expireIn: 0,
//     // };
//     //
//     // const resetResponse = await example_api_tunnel_device_update({
//     //   payload,
//     //   yourProjectApiKey,
//     //   noLagDeveloperTestConfigIgnore,
//     //   tunnelId,
//     //   deviceId: nodeInstance.device.deviceTokenId ?? "",
//     // });
//
//     // if (resetResponse) {
//     //   nodeInstance.setDevice(resetResponse);
//     // }
//
//     const response = await TOPIC_PubSub({
//       noLagDeveloperTestConfigIgnoreWs,
//       environmentInstanceOne: browserInstance,
//       environmentInstanceTwo: nodeInstance,
//     });
//
//     expect(pubSubData.prop1).toBe(response?.data?.prop1);
//   });
//
//   test("NODE:Topic:Unsubscribe", async ({ page }) => {
//     // const payload: IDeviceModel = {
//     //   name: nodeInstance.deviceName,
//     //   accessPermission: EAccessPermission.PubSub,
//     //   staticTopics: [],
//     //   lockTopics: false,
//     //   expireIn: 0,
//     // };
//     //
//     // const resetResponse = await example_api_tunnel_device_update({
//     //   payload,
//     //   yourProjectApiKey,
//     //   noLagDeveloperTestConfigIgnore,
//     //   tunnelId,
//     //   deviceId: nodeInstance.device.deviceTokenId ?? "",
//     // });
//
//     // if (resetResponse) {
//     //   nodeInstance.setDevice(resetResponse);
//     // }
//
//     const response = await TOPIC_Unsubscribe({
//       noLagDeveloperTestConfigIgnoreWs,
//       environmentInstanceOne: browserInstance,
//       environmentInstanceTwo: nodeInstance,
//     });
//
//     expect(response).toBeTruthy();
//   });
// });
