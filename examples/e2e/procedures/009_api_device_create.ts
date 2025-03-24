import type { IDeviceModel, IErrorMessage } from "nolagjs";
import { EAccessPermission } from "nolagjs";
import { example_api_tunnel_device_create } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_create";

export interface IApiDeviceCreate {
  tunnelId: string;
  deviceName: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
}

export const shouldCreateNewDevice = async ({
  tunnelId,
  deviceName,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiDeviceCreate) => {
  const payload: IDeviceModel = {
    name: deviceName,
    accessPermission: EAccessPermission.PubSub,
  };

  return example_api_tunnel_device_create({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    deviceName: deviceName,
    tunnelId,
  });
};

export const canNotCreateDuplicateDeviceName = async ({
  tunnelId,
  deviceName,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiDeviceCreate) => {
  try {
    const payload: IDeviceModel = {
      name: deviceName,
      accessPermission: EAccessPermission.PubSub,
    };

    await example_api_tunnel_device_create({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      deviceName: deviceName,
      tunnelId,
    });
  } catch (error) {
    return error as IErrorMessage;
  }
};

export const canNotCreateEmptyDeviceName = async ({
  tunnelId,
  deviceName,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiDeviceCreate) => {
  try {
    const payload: IDeviceModel = {
      name: "",
      accessPermission: EAccessPermission.PubSub,
    };

    await example_api_tunnel_device_create({
      payload,
      yourProjectApiKey,
      noLagDeveloperTestConfigIgnore,
      deviceName: deviceName,
      tunnelId,
    });
  } catch (error) {
    return error as IErrorMessage;
  }
};
