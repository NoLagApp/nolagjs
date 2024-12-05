import { IConnectOptions, IPaginated, ITunnelModel, ITunnelQuery } from "../shared/interfaces";
import { ITunnelApi, TunnelApi } from "./controllers/tunnels/TunnelApi";
import axios, { AxiosInstance } from "axios";
import { CONSTANT } from "../shared/constants";

export interface IApiTunnel {
  tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelModel>>;
  tunnel(tunnelId: string): ITunnelApi;
}

export class ApiTunnel {
  private apiKey: string;
  public connectOptions: IConnectOptions;
  private request: AxiosInstance;
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
    this.request = this.createRequestInstance();
  }

  private createRequestInstance() {
    return axios.create({
      baseURL: `${this.connectOptions?.protocol}://${this.connectOptions?.host}${this.connectOptions?.url}`,
      headers: { "X-API-Key": this.apiKey, "Content-Type": "application/json" },
    });
  }

  async tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelModel>> {
    const response = await this.request.get("/tunnels", {
      params: tunnelQuery,
    });

    return {
      ...response.data,
    };
  }

  tunnel(tunnelId: string): ITunnelApi {
    return new TunnelApi(this, tunnelId, this.request);
  }
}