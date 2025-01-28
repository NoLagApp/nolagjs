import { test, expect } from "@playwright/test";
import { example_api_tunnel_device_update } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_update";
import dayjs from "dayjs";
import type { IDeviceModel } from "nolagjs";
import { EAccessPermission } from "nolagjs";

export interface IApiDeviceEdit {
  tunnelId: string;
  deviceName: string;
  deviceTokenId: string;
  topicName: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
  identifiers: string[];
  expireIn?: number;
}

export const editTunnelDeviceUsingDeviceTokenId = async ({
  tunnelId,
  deviceName,
  deviceTokenId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiDeviceEdit) => {
  const payload: IDeviceModel = {
    name: `${deviceName}_edited`,
  };

  return example_api_tunnel_device_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    deviceId: deviceTokenId,
  });
};

export const editTunnelDeviceSetAccessPermissionsSubscribe = async ({
  tunnelId,
  deviceTokenId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiDeviceEdit) => {
  const payload: IDeviceModel = {
    accessPermission: EAccessPermission.Subscribe,
  };

  return example_api_tunnel_device_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    deviceId: deviceTokenId,
  });
};

export const editTunnelDeviceSetAccessPermissionsPublish = async ({
  tunnelId,
  deviceTokenId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiDeviceEdit) => {
  const payload: IDeviceModel = {
    accessPermission: EAccessPermission.Publish,
  };

  return example_api_tunnel_device_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    deviceId: deviceTokenId,
  });
};

export const editTunnelDeviceSetAccessPermissionsPubSub = async ({
  tunnelId,
  deviceTokenId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiDeviceEdit) => {
  const payload: IDeviceModel = {
    accessPermission: EAccessPermission.PubSub,
  };

  return example_api_tunnel_device_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    deviceId: deviceTokenId,
  });
};

export const setStaticTopics = async ({
  tunnelId,
  deviceTokenId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  topicName,
  identifiers,
}: IApiDeviceEdit) => {
  const payload: IDeviceModel = {
    staticTopics: [
      {
        name: topicName,
        identifiers,
      },
    ],
  };

  return example_api_tunnel_device_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    deviceId: deviceTokenId,
  });
};

export const lockDeviceTopics = async ({
  tunnelId,
  deviceTokenId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiDeviceEdit) => {
  const payload: IDeviceModel = {
    lockTopics: true,
  };

  return example_api_tunnel_device_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    deviceId: deviceTokenId,
  });
};

export const setExpireInSeconds = async ({
  tunnelId,
  deviceTokenId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
  expireIn = 14400,
}: IApiDeviceEdit) => {
  const payload: IDeviceModel = {
    expireIn,
  };

  return example_api_tunnel_device_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    deviceId: deviceTokenId,
  });
};
