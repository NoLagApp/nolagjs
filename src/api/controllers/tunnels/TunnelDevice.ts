import {
  IDeviceListQuery,
  IDeviceTokenModel,
  IPaginated, IRequestParams
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
  listDevices(query?: IDeviceListQuery): Promise<IPaginated<IDeviceTokenModel>>;
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
  private requestParams: IRequestParams;
  constructor(
    parentRouteNamespace: string,
    tunnelId: string,
    requestParams: IRequestParams,
  ) {
    this.parentRouteNamespace = parentRouteNamespace;
    this.tunnelId = tunnelId;
    this.requestParams = requestParams;
  }

  async createDevice(payload: IDeviceTokenModel): Promise<IDeviceTokenModel> {
    const response = await fetch(`${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}`, {
      method: "POST",
      headers: this.requestParams.headers,
      body: JSON.stringify(payload),
    });

    return response.json();
  }

  async getDeviceById(deviceTokenId: string): Promise<IDeviceTokenModel> {
    const response = await fetch(`${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`, {
      method: "GET",
      headers: this.requestParams.headers,
    });

    return response.json();
  }

  async listDevices(
    query?: IDeviceListQuery,
  ): Promise<IPaginated<IDeviceTokenModel>> {
    const queryString = generateQueryString(query);
    const response = await fetch(`${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}${queryString}`, {
      method: "GET",
      headers: this.requestParams.headers,
    });

    return response.json();
  }

  async updateDevice(
    deviceTokenId: string,
    payload: IDeviceTokenModel,
  ): Promise<IDeviceTokenModel> {
    const response = await fetch(`${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`, {
      method: "PATCH",
      headers: this.requestParams.headers,
      body: JSON.stringify(payload),
    });

    return response.json();
  }

  async deleteDevice(deviceTokenId: string): Promise<IDeviceTokenModel> {
    const response = await fetch(`${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`, {
      method: "DELETE",
      headers: this.requestParams.headers,
    });

    return response.json();
  }
}
