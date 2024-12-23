import { IConnectOptions, IPaginated, ITunnelModel, ITunnelQuery, IRequestParams } from "../shared/interfaces";
import { ITunnelApi, TunnelApi } from "./controllers/tunnels/TunnelApi";
import { CONSTANT } from "../shared/constants";

export interface IApiTunnel {
  tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelModel>>;
  tunnel(tunnelId: string): ITunnelApi;
}

export class ApiTunnel {
  private apiKey: string;
  public connectOptions: IConnectOptions;
  private requestParams: IRequestParams;
  constructor(apiKey: string, connectOptions?: IConnectOptions) {
    this.connectOptions = {
      host: CONSTANT.DefaultApiHost,
      protocol: CONSTANT.DefaultHttpProtocol,
      url: CONSTANT.DefaultApiUrl,
      wsUrl: CONSTANT.DefaultWsUrl,
      wsHost: CONSTANT.DefaultWsHost,
      apiKey: apiKey,
      ...connectOptions,
    };

    this.apiKey = apiKey;
    this.requestParams = {
      baseURL: `${this.connectOptions?.protocol}://${this.connectOptions?.host}${this.connectOptions?.url}`,
      headers: { "X-API-Key": this.apiKey, "Content-Type": "application/json" },
    };
  }

  async tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelModel>> {
    const queryString = new URLSearchParams(tunnelQuery as Record<string, string>).toString();
    const response = await fetch(`${this.requestParams.baseURL}/tunnels${queryString ? `?${queryString}` : ""}`, {
      headers: this.requestParams.headers,
      method: "get",
    });

    return response.json();
  }

  tunnel(tunnelId: string): ITunnelApi {
    return new TunnelApi(this, tunnelId, this.requestParams);
  }
}