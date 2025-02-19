/**
 * E2E Test
 * These tests focus on specific use cases of the NolagJS SDK
 *
 * Use cases Tunnel:
 * - Tunnel: Standard pub/sub (Just a Topic now identifiers and presences)
 * - Tunnel: Pub/sub with identifiers set
 * - Tunnel: Unsubscribe from Topic
 * Use cases Topic:
 * - Topic: Set presence
 * - Topic: Add identifiers
 * - Topic: Remove identifiers
 * - Topic: Publish
 * - Topic: Unsubscribe
 */
import { test, expect } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import {
  pubSubData,
  TOPIC_PubSub,
  TOPIC_SetPresence,
  TOPIC_standardPubSubAddIdentifiers,
  TOPIC_standardPubSubRemoveIdentifiers, TOPIC_Unsubscribe,
  TUNNEL_standardPubSub,
  TUNNEL_standardPubSubWithIdentifiers,
  TUNNEL_StandardUnsubscribe,
} from "../procedures/012_client_pub_sub";

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
});
nodeInstance.setTopic({
  name: "node:e2e_Tunnel_1738580709899_edited_edited",
});

test.describe("Playwright client pub/sub", () => {
  test("BROWSER:Tunnel:Standard pub/sub NO Identifier and NO presences set", async ({
    page,
  }) => {
    // const payload: IDeviceModel = {
    //   name: browserInstance.deviceName,
    //   accessPermission: EAccessPermission.PubSub,
    //   staticTopics: [],
    //   lockTopics: false,
    //   expireIn: 0,
    // };
    //
    // const resetResponse = await example_api_tunnel_device_update({
    //   payload,
    //   yourProjectApiKey,
    //   noLagDeveloperTestConfigIgnore,
    //   tunnelId,
    //   deviceId: browserInstance.device.deviceTokenId ?? "",
    // });
    //
    // if (resetResponse) {
    //   browserInstance.setDevice(resetResponse);
    // }
    console.log("nodeInstance", nodeInstance);

    await page.goto(browserInstance.viteHostUrl);

    const response = await page.evaluate(
      async ({ noLagDeveloperTestConfigIgnoreWs, nodeInstance,browserInstance  }) => {
        //  const response = await TUNNEL_standardPubSub({
        //   noLagDeveloperTestConfigIgnoreWs,
        //   environmentInstanceOne: browserInstance,
        //   environmentInstanceTwo: nodeInstance,
        // });
        //
        // return response;
        return {
          noLagDeveloperTestConfigIgnoreWs, nodeInstance,browserInstance
        }
      },
      { noLagDeveloperTestConfigIgnoreWs, nodeInstance, browserInstance },
    )

    console.log("response", response);

    const topicName = nodeInstance?.topic.name ?? "";

    expect(pubSubData).toMatchObject(response?.data);
    expect(topicName).toBe(response?.topicName);
    expect(0).toBe(response?.identifiers.length);
    expect(0).toBe(response?.presences.length);
  });

  test("NODE:Tunnel:Standard pub/sub NO Identifier and NO presences set", async ({
    page,
  }) => {
    // const payload: IDeviceModel = {
    //   name: nodeInstance.deviceName,
    //   accessPermission: EAccessPermission.PubSub,
    //   staticTopics: [],
    //   lockTopics: false,
    //   expireIn: 0,
    // };
    //
    // const resetResponse = await example_api_tunnel_device_update({
    //   payload,
    //   yourProjectApiKey,
    //   noLagDeveloperTestConfigIgnore,
    //   tunnelId,
    //   deviceId: nodeInstance.device.deviceTokenId ?? "",
    // });

    // if (resetResponse) {
    //   nodeInstance.setDevice(resetResponse);
    // }

    const topicName = nodeInstance?.topic.name ?? "";

    const response = await TUNNEL_standardPubSub({
      noLagDeveloperTestConfigIgnoreWs,
      environmentInstanceOne: nodeInstance,
      environmentInstanceTwo: nodeInstance,
    });

    expect(pubSubData).toMatchObject(response?.data);
    expect(topicName).toBe(response?.topicName);
    expect(0).toBe(response?.identifiers.length);
    expect(0).toBe(response?.presences.length);
  });

  test("NODE:Tunnel:Standard pub/sub WITH Identifiers and NO presences set", async ({
    page,
  }) => {
    // const payload: IDeviceModel = {
    //   name: nodeInstance.deviceName,
    //   accessPermission: EAccessPermission.PubSub,
    //   staticTopics: [],
    //   lockTopics: false,
    //   expireIn: 0,
    // };
    //
    // const resetResponse = await example_api_tunnel_device_update({
    //   payload,
    //   yourProjectApiKey,
    //   noLagDeveloperTestConfigIgnore,
    //   tunnelId,
    //   deviceId: nodeInstance.device.deviceTokenId ?? "",
    // });

    // if (resetResponse) {
    //   nodeInstance.setDevice(resetResponse);
    // }

    const response = await TUNNEL_standardPubSubWithIdentifiers({
      noLagDeveloperTestConfigIgnoreWs,
      environmentInstanceOne: browserInstance,
      environmentInstanceTwo: nodeInstance,
    });

    const topicName = nodeInstance?.topic.name ?? "";
    const identifiers = ["identifier1", "identifier2"];

    expect(pubSubData).toMatchObject(response?.data);
    expect(topicName).toBe(response?.topicName);
    expect(identifiers).toMatchObject(response?.identifiers);
    expect(2).toBe(response?.identifiers.length);
    expect(0).toBe(response?.presences.length);
  });

  test("NODE:Tunnel:Standard Unsubscribe", async ({ page }) => {
    // const payload: IDeviceModel = {
    //   name: nodeInstance.deviceName,
    //   accessPermission: EAccessPermission.PubSub,
    //   staticTopics: [],
    //   lockTopics: false,
    //   expireIn: 0,
    // };
    //
    // const resetResponse = await example_api_tunnel_device_update({
    //   payload,
    //   yourProjectApiKey,
    //   noLagDeveloperTestConfigIgnore,
    //   tunnelId,
    //   deviceId: nodeInstance.device.deviceTokenId ?? "",
    // });

    // if (resetResponse) {
    //   nodeInstance.setDevice(resetResponse);
    // }

    const response = await TUNNEL_StandardUnsubscribe({
      noLagDeveloperTestConfigIgnoreWs,
      environmentInstanceOne: nodeInstance,
      environmentInstanceTwo: nodeInstance,
    });

    const topicName = nodeInstance?.topic.name ?? "";
    const identifiers = ["identifier1", "identifier2"];

    expect(response).toBeTruthy();
  });

  test("NODE:Topic:Set presence", async ({ page }) => {
    // const payload: IDeviceModel = {
    //   name: nodeInstance.deviceName,
    //   accessPermission: EAccessPermission.PubSub,
    //   staticTopics: [],
    //   lockTopics: false,
    //   expireIn: 0,
    // };
    //
    // const resetResponse = await example_api_tunnel_device_update({
    //   payload,
    //   yourProjectApiKey,
    //   noLagDeveloperTestConfigIgnore,
    //   tunnelId,
    //   deviceId: nodeInstance.device.deviceTokenId ?? "",
    // });

    // if (resetResponse) {
    //   nodeInstance.setDevice(resetResponse);
    // }

    const response = await TOPIC_SetPresence({
      noLagDeveloperTestConfigIgnoreWs,
      environmentInstanceOne: browserInstance,
      environmentInstanceTwo: nodeInstance,
    });

    expect(response).toBeTruthy();

    expect(response?.length).toBe(2);
    expect(response?.[0].userId).toBe("presence1");
    expect(response?.[1].userId).toBe("presence2");
  });

  test("NODE:Topic:Add identifiers", async ({ page }) => {
    // const payload: IDeviceModel = {
    //   name: nodeInstance.deviceName,
    //   accessPermission: EAccessPermission.PubSub,
    //   staticTopics: [],
    //   lockTopics: false,
    //   expireIn: 0,
    // };
    //
    // const resetResponse = await example_api_tunnel_device_update({
    //   payload,
    //   yourProjectApiKey,
    //   noLagDeveloperTestConfigIgnore,
    //   tunnelId,
    //   deviceId: nodeInstance.device.deviceTokenId ?? "",
    // });

    // if (resetResponse) {
    //   nodeInstance.setDevice(resetResponse);
    // }

    const response = await TOPIC_standardPubSubAddIdentifiers({
      noLagDeveloperTestConfigIgnoreWs,
      environmentInstanceOne: browserInstance,
      environmentInstanceTwo: nodeInstance,
    });

    expect(response).toBeTruthy();
    expect(pubSubData.prop1).toBe(response?.data?.prop1);
  });

  test("NODE:Topic:Remove identifiers", async ({ page }) => {
    // const payload: IDeviceModel = {
    //   name: nodeInstance.deviceName,
    //   accessPermission: EAccessPermission.PubSub,
    //   staticTopics: [],
    //   lockTopics: false,
    //   expireIn: 0,
    // };
    //
    // const resetResponse = await example_api_tunnel_device_update({
    //   payload,
    //   yourProjectApiKey,
    //   noLagDeveloperTestConfigIgnore,
    //   tunnelId,
    //   deviceId: nodeInstance.device.deviceTokenId ?? "",
    // });

    // if (resetResponse) {
    //   nodeInstance.setDevice(resetResponse);
    // }

    const {response, notReceived} = await TOPIC_standardPubSubRemoveIdentifiers({
      noLagDeveloperTestConfigIgnoreWs,
      environmentInstanceOne: browserInstance,
      environmentInstanceTwo: nodeInstance,
    });

    expect(pubSubData.prop1).toBe(response?.data?.prop1);
    expect(notReceived).toBeTruthy();
  });

  test("NODE:Topic:Publish", async ({ page }) => {
    // const payload: IDeviceModel = {
    //   name: nodeInstance.deviceName,
    //   accessPermission: EAccessPermission.PubSub,
    //   staticTopics: [],
    //   lockTopics: false,
    //   expireIn: 0,
    // };
    //
    // const resetResponse = await example_api_tunnel_device_update({
    //   payload,
    //   yourProjectApiKey,
    //   noLagDeveloperTestConfigIgnore,
    //   tunnelId,
    //   deviceId: nodeInstance.device.deviceTokenId ?? "",
    // });

    // if (resetResponse) {
    //   nodeInstance.setDevice(resetResponse);
    // }

    const response = await TOPIC_PubSub({
      noLagDeveloperTestConfigIgnoreWs,
      environmentInstanceOne: browserInstance,
      environmentInstanceTwo: nodeInstance,
    });

    expect(pubSubData.prop1).toBe(response?.data?.prop1);
  });

  test("NODE:Topic:Unsubscribe", async ({ page }) => {
    // const payload: IDeviceModel = {
    //   name: nodeInstance.deviceName,
    //   accessPermission: EAccessPermission.PubSub,
    //   staticTopics: [],
    //   lockTopics: false,
    //   expireIn: 0,
    // };
    //
    // const resetResponse = await example_api_tunnel_device_update({
    //   payload,
    //   yourProjectApiKey,
    //   noLagDeveloperTestConfigIgnore,
    //   tunnelId,
    //   deviceId: nodeInstance.device.deviceTokenId ?? "",
    // });

    // if (resetResponse) {
    //   nodeInstance.setDevice(resetResponse);
    // }

    const response = await TOPIC_Unsubscribe({
      noLagDeveloperTestConfigIgnoreWs,
      environmentInstanceOne: browserInstance,
      environmentInstanceTwo: nodeInstance,
    });

    expect(response).toBeTruthy();
  });

});
