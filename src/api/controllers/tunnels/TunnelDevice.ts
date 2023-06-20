import { AxiosInstance } from "axios";
import {
  IDeviceListQuery,
  IDeviceTokenModel,
  IPaginated,
} from "../../../shared/interfaces";
import { generateQueryString } from "../../../shared/utils/generateQueryString";

export interface ITunnelDevice {
  /**
   * Create new Tunnel device
   * @param payload
   */
  createDevice(payload: IDeviceTokenModel): Promise<IDeviceTokenModel>;
  /**
   * Retrieve Tunnel device using ID
   * @param query
   */
  getDeviceById(deviceTokenId: string): Promise<IDeviceTokenModel>;
  /**
   * List all Tunnel devices
   * @param query
   */
  listDevices(query: IDeviceListQuery): Promise<IPaginated<IDeviceTokenModel>>;
  /**
   * Update a Tunnel device
   * @param deviceTokenId
   * @param payload
   */
  updateDevice(
    deviceTokenId: string,
    payload: IDeviceTokenModel,
  ): Promise<IDeviceTokenModel>;
  /**
   * Delete a Tunnel device
   * @param deviceTokenId
   */
  deleteDevice(deviceTokenId: string): Promise<IDeviceTokenModel>;
}
export class TunnelDevice implements ITunnelDevice {
  private routeNamespace = "devices";

  private parentRouteNamespace: string;
  private tunnelId: string;
  private request: AxiosInstance;
  constructor(
    parentRouteNamespace: string,
    tunnelId: string,
    request: AxiosInstance,
  ) {
    this.parentRouteNamespace = parentRouteNamespace;
    this.tunnelId = tunnelId;
    this.request = request;
  }

  async createDevice(payload: IDeviceTokenModel): Promise<IDeviceTokenModel> {
    const response = await this.request.request({
      url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}`,
      method: "post",
      data: payload,
    });

    return response.data;
  }

  async getDeviceById(deviceTokenId: string): Promise<IDeviceTokenModel> {
    const response = await this.request.request({
      url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`,
      method: "get",
    });

    return response.data;
  }

  async listDevices(
    query: IDeviceListQuery,
  ): Promise<IPaginated<IDeviceTokenModel>> {
    const queryString = generateQueryString(query);
    const response = await this.request.request({
      url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}${queryString}`,
      method: "get",
    });

    return response.data;
  }

  async updateDevice(
    deviceTokenId: string,
    payload: IDeviceTokenModel,
  ): Promise<IDeviceTokenModel> {
    const response = await this.request.request({
      url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`,
      method: "patch",
      data: payload,
    });

    return response.data;
  }

  async deleteDevice(deviceTokenId: string): Promise<IDeviceTokenModel> {
    const response = await this.request.request({
      url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`,
      method: "delete",
    });

    return response.data;
  }
}
