import {
  IDeviceQuery,
  IDeviceModel,
  IPaginated,
  IRequestParams,
} from "../../../shared/interfaces";
import { generateQueryString } from "../../../shared/utils/generateQueryString";

export interface ITunnelDevice {
  /**
   * Create new Tunnel device
   * @param payload
   */
  createDevice(payload: IDeviceModel): Promise<IDeviceModel>;
  /**
   * Retrieve Tunnel device using ID
   * @param query
   */
  getDeviceById(deviceTokenId: string): Promise<IDeviceModel>;
  /**
   * List all Tunnel devices
   * @param query
   */
  listDevices(query?: IDeviceQuery): Promise<IPaginated<IDeviceModel>>;
  /**
   * Update a Tunnel device
   * @param deviceTokenId
   * @param payload
   */
  updateDevice(
    deviceTokenId: string,
    payload: IDeviceModel,
  ): Promise<IDeviceModel>;
  /**
   * Delete a Tunnel device
   * @param deviceTokenId
   */
  deleteDevice(deviceTokenId: string): Promise<IDeviceModel>;
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

  async createDevice(payload: IDeviceModel): Promise<IDeviceModel> {
    const response = await fetch(
      `${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}`,
      {
        method: "POST",
        headers: this.requestParams.headers,
        body: JSON.stringify(payload),
      },
    );

    return response.json();
  }

  async getDeviceById(deviceTokenId: string): Promise<IDeviceModel> {
    const response = await fetch(
      `${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`,
      {
        method: "GET",
        headers: this.requestParams.headers,
      },
    );

    return response.json();
  }

  async listDevices(
    query?: IDeviceQuery,
  ): Promise<IPaginated<IDeviceModel>> {
    const queryString = generateQueryString(query);
    const response = await fetch(
      `${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}${queryString}`,
      {
        method: "GET",
        headers: this.requestParams.headers,
      },
    );

    return response.json();
  }

  async updateDevice(
    deviceTokenId: string,
    payload: IDeviceModel,
  ): Promise<IDeviceModel> {
    const response = await fetch(
      `${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`,
      {
        method: "PATCH",
        headers: this.requestParams.headers,
        body: JSON.stringify(payload),
      },
    );

    return response.json();
  }

  async deleteDevice(deviceTokenId: string): Promise<IDeviceModel> {
    const response = await fetch(
      `${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`,
      {
        method: "DELETE",
        headers: this.requestParams.headers,
      },
    );

    return response.json();
  }
}
