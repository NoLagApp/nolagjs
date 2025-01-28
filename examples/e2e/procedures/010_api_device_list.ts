import type { IDeviceQuery } from "nolagjs";
import { example_api_tunnel_device_list } from "../../SDK/API/tunnel_devices/example_api_tunnel_device_list";

export interface IApiDeviceList {
  tunnelId: string;
  deviceName: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
}

export const shouldSeeAListOfDevices = async ({
  tunnelId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiDeviceList) => {
  const deviceQuery: IDeviceQuery = {};

  return example_api_tunnel_device_list({
    deviceQuery,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
  });
};

export const shouldSeeAListOfSearchResultsForDevices = async ({
  tunnelId,
  deviceName,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiDeviceList) => {
  const deviceQuery: IDeviceQuery = {
    search: deviceName,
  };

  return example_api_tunnel_device_list({
    deviceQuery,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
  });
};