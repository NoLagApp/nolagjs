import axios, { AxiosInstance } from "axios";
import { CONSTANT } from "../shared/constants";
import { IConnectOptions } from "../shared/interfaces";
import { ITunnelApi, TunnelApi } from "./controllers/tunnels/TunnelApi";

export interface IApiTunnel {
  tunnels(tunnelId: string): ITunnelApi;
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

  tunnels(tunnelId: string): ITunnelApi {
    return new TunnelApi(this, tunnelId, this.request);
  }
}

export const Api = (
  apiKey: string,
  connectOptions?: IConnectOptions,
): IApiTunnel => {
  return new ApiTunnel(apiKey, connectOptions);
};
