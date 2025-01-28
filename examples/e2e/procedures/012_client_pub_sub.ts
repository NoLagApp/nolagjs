import { test, expect } from "@playwright/test";
import type { IDeviceModel, ITopic } from "nolagjs";
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
import {
  example_client_topic_callback_on_receive
} from "../../SDK/Client/topic_instance/example_client_topic_callback_on_receive";
import { example_client_topic_unsubscribe } from "../../SDK/Client/topic_instance/example_client_topic_unsubscribe";

export interface IClientPubSub {
  tunnelId: string;
  deviceName: string;
  deviceTokenId: string;
  topicName: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
  noLagDeveloperTestConfigIgnoreWs: Record<any, any>;
  identifiers: string[];
  expireIn?: number;
}

export const tunnelStandardPubSubNoIdentifierAndNoPresencesSet = () =>{

}
test.describe("Playwright client pub/sub", () => {
  test("Tunnel: standard pub/sub NO Identifier and NO presences set", async ({
    page,
  }) => {
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

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers,
      data,
    });

    const response = await example_client_tunnel_callback_on_receive({
      tunnelInstance,
    });

    tunnelInstance.disconnect();
  });

  test("Tunnel: unsubscribe", async ({ page }) => {
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

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers,
      data,
    });

    const response = await example_client_tunnel_callback_on_receive({
      tunnelInstance,
    });

    await example_client_tunnel_unsubscribe({
      tunnelInstance,
      topicName,
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
    expect(data).toMatchObject(response?.data);
  });

  test("Tunnel: standard pub/sub with Identifiers set and NO presences set", async ({
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

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers,
      data,
    });

    const response = await example_client_tunnel_callback_on_receive({
      tunnelInstance,
    });

    tunnelInstance.disconnect();

    expect(data).toMatchObject(response?.data);
    expect(topicName).toBe(response?.topicName);
    expect(identifiers).toMatchObject(response?.identifiers);
    expect(0).toBe(response?.presences.length);
  });

  test("Topic: add Identifiers to topic instance", async ({ page }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const topicName = globalVars.topic?.name ?? "";
    const identifiers = ["identifier1", "identifier2"];
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
      identifiers: undefined,
    });

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers: undefined,
      data,
    });

    const responseNoIdentifiers =
      await example_client_tunnel_callback_on_receive({
        tunnelInstance,
      });

    tunnelInstance.getTopic(topicName)?.addIdentifiers({
      OR: identifiers,
    });

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers,
      data,
    });

    const responseWithIdentifiers =
      await example_client_tunnel_callback_on_receive({
        tunnelInstance,
      });

    tunnelInstance.disconnect();

    expect(data).toMatchObject(responseNoIdentifiers?.data);
    expect(topicName).toBe(responseNoIdentifiers?.topicName);
    expect([]).toMatchObject(responseNoIdentifiers?.identifiers);
    expect(0).toBe(responseNoIdentifiers?.presences.length);

    expect(data).toMatchObject(responseWithIdentifiers?.data);
    expect(topicName).toBe(responseWithIdentifiers?.topicName);
    expect(identifiers).toMatchObject(responseWithIdentifiers?.identifiers);
    expect(0).toBe(responseWithIdentifiers?.presences.length);
  });

  test("Topic: remove Identifiers to topic instance", async ({ page }) => {
    if (!globalVars.device) {
      expect(false).toBeTruthy();
      return;
    }

    const topicName = globalVars.topic?.name ?? "";
    const identifiers = ["identifier1", "identifier2"];
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
      identifiers: undefined,
    });

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers: undefined,
      data,
    });

    const responseNoIdentifiers =
      await example_client_tunnel_callback_on_receive({
        tunnelInstance,
      });

    tunnelInstance.getTopic(topicName)?.addIdentifiers({
      OR: identifiers,
    });

    await example_client_tunnel_publish({
      tunnelInstance,
      topicName,
      identifiers,
      data,
    });

    const responseWithIdentifiers =
      await example_client_tunnel_callback_on_receive({
        tunnelInstance,
      });

    tunnelInstance.disconnect();

    expect(data).toMatchObject(responseNoIdentifiers?.data);
    expect(topicName).toBe(responseNoIdentifiers?.topicName);
    expect([]).toMatchObject(responseNoIdentifiers?.identifiers);
    expect(0).toBe(responseNoIdentifiers?.presences.length);

    expect(data).toMatchObject(responseWithIdentifiers?.data);
    expect(topicName).toBe(responseWithIdentifiers?.topicName);
    expect(identifiers).toMatchObject(responseWithIdentifiers?.identifiers);
    expect(0).toBe(responseWithIdentifiers?.presences.length);
  });

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
    })

    await example_client_tunnel_subscribe({
      tunnelInstance,
      topicName,
      identifiers,
    });

    const topicInstance = tunnelInstance.getTopic(topicName) as ITopic;

    await example_client_topic_publish({topicInstance , identifiers, data})

    const responseFromPublish = await example_client_topic_callback_on_receive({
      topicInstance,
    });

    await example_client_topic_unsubscribe({
      topicInstance
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
