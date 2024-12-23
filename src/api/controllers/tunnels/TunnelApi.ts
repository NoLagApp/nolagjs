import { ApiTunnel } from "../../ApiTunnel";
import { IHttpPublish, IRequestParams } from "../../../shared/interfaces";
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
  private readonly tunnelId: string;
  private readonly requestParams: IRequestParams;
  private apiTunnel: ApiTunnel;
  constructor(apiTunnel: ApiTunnel, tunnelId: string, requestParams: IRequestParams) {
    this.tunnelId = tunnelId;
    this.requestParams = requestParams;
    this.apiTunnel = apiTunnel;
  }

  get topics(): TunnelTopic {
    return new TunnelTopic(this.routeNamespace, this.tunnelId, this.requestParams);
  }

  get devices(): TunnelDevice {
    return new TunnelDevice(this.routeNamespace, this.tunnelId, this.requestParams);
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
