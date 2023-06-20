import { AxiosInstance } from "axios";
import { ApiTunnel } from "../..";
import { IHttpPublish } from "../../../shared/interfaces";
import { ITunnelDevice, TunnelDevice } from "./TunnelDevice";
import { TunnelPublish } from "./TunnelPublish";
import { ITunnelTopic, TunnelTopic } from "./TunnelTopic";

export interface ITunnelApi {
  topics: ITunnelTopic;
  devices: ITunnelDevice;
  publish(httpPublish: IHttpPublish): Promise<boolean>;
}

export class TunnelApi implements ITunnelApi {
  private routeNamespace = "tunnels";
  private tunnelId: string;
  private request: AxiosInstance;
  private apiTunnel: ApiTunnel;
  constructor(apiTunnel: ApiTunnel, tunnelId: string, request: AxiosInstance) {
    this.tunnelId = tunnelId;
    this.request = request;
    this.apiTunnel = apiTunnel;
  }

  get topics(): TunnelTopic {
    return new TunnelTopic(this.routeNamespace, this.tunnelId, this.request);
  }

  get devices(): TunnelDevice {
    return new TunnelDevice(this.routeNamespace, this.tunnelId, this.request);
  }

  async publish(httpPublish: IHttpPublish): Promise<boolean> {
    const { data, tunnelName, identifiers } = httpPublish;
    return TunnelPublish(
      data,
      tunnelName,
      identifiers,
      this.tunnelId,
      this.routeNamespace,
      this.request,
      this.apiTunnel.connectOptions,
    );
  }
}
