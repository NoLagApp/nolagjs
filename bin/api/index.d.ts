import { IConnectOptions, IPaginated, ITunnelQuery, ITunnelResponse } from "../shared/interfaces";
import { ITunnelApi } from "./controllers/tunnels/TunnelApi";
export interface IApiTunnel {
    tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelResponse>>;
    tunnel(tunnelId: string): ITunnelApi;
}
export declare class ApiTunnel {
    private apiKey;
    connectOptions: IConnectOptions;
    private request;
    constructor(apiKey: string, connectOptions?: IConnectOptions);
    private createRequestInstance;
    tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelResponse>>;
    tunnel(tunnelId: string): ITunnelApi;
}
export declare const Api: (apiKey: string, connectOptions?: IConnectOptions) => IApiTunnel;
