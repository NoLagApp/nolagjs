import { ApiTunnel } from "../../ApiTunnel";
import {
  IHttpPublish,
  IRequestParams,
  ITunnelModel,
} from "../../../shared/interfaces";
import { ITunnelDevice, TunnelDevice } from "./TunnelDevice";
import { TunnelPublish } from "./TunnelPublish";
import { ITunnelTopic, TunnelTopic } from "./TunnelTopic";

export interface ITunnelApi {
  /**
   * tunnel topics
   */
  topics: ITunnelTopic;
  /**
   * tunnel devices
   */
  devices: ITunnelDevice;
  /**
   * get tunnel based on supplied tunnelID
   */
  getTunnel(): Promise<ITunnelModel>;
  /**
   * update tunnel based on supplied tunnelID
   */
  updateTunnel(payload: ITunnelModel): Promise<ITunnelModel>;
  /**
   * delete tunnel based on supplied tunnelID
   */
  deleteTunnel(): Promise<ITunnelModel>;
  /**
   * publish messages attached to a tunnel
   * @param httpPublish
   */
  publish(httpPublish: IHttpPublish): Promise<boolean>;
}

export class TunnelApi implements ITunnelApi {
  private routeNamespace = "tunnels";
  private readonly tunnelId: string;
  private readonly requestParams: IRequestParams;
  private apiTunnel: ApiTunnel;
  constructor(
    apiTunnel: ApiTunnel,
    tunnelId: string,
    requestParams: IRequestParams,
  ) {
    this.tunnelId = tunnelId;
    this.requestParams = requestParams;
    this.apiTunnel = apiTunnel;
  }

  get topics(): TunnelTopic {
    return new TunnelTopic(
      this.routeNamespace,
      this.tunnelId,
      this.requestParams,
    );
  }

  get devices(): TunnelDevice {
    return new TunnelDevice(
      this.routeNamespace,
      this.tunnelId,
      this.requestParams,
    );
  }

  async getTunnel(): Promise<ITunnelModel> {
    const response = await fetch(
      `${this.requestParams.baseURL}/${this.routeNamespace}/${this.tunnelId}`,
      {
        method: "GET",
        headers: this.requestParams.headers,
      },
    );

    return response.json();
  }

  async updateTunnel(payload: ITunnelModel): Promise<ITunnelModel> {
    return fetch(`${this.requestParams.baseURL}/${this.routeNamespace}/${this.tunnelId}`, {
      method: "PATCH",
      headers: this.requestParams.headers,
      body: JSON.stringify(payload),
    }).then((response) => response.json());
  }

  async deleteTunnel(): Promise<ITunnelModel> {
    const response = await fetch(
      `${this.requestParams.baseURL}/${this.routeNamespace}/${this.tunnelId}`,
      {
        method: "DELETE",
        headers: this.requestParams.headers,
      },
    );

    return response.json();
  }

  async publish(httpPublish: IHttpPublish): Promise<boolean> {
    const { data, topicName, identifiers } = httpPublish;
    return TunnelPublish(
      data,
      topicName,
      identifiers,
      this.tunnelId,
      this.routeNamespace,
      this.requestParams,
      this.apiTunnel.connectOptions,
    );
  }
}
