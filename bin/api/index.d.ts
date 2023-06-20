import { IConnectOptions } from "../shared/interfaces";
import { ITunnelApi } from "./controllers/tunnels/TunnelApi";
export interface IApiTunnel {
    tunnels(tunnelId: string): ITunnelApi;
}
export declare class ApiTunnel {
    private apiKey;
    connectOptions: IConnectOptions;
    private request;
    constructor(apiKey: string, connectOptions?: IConnectOptions);
    private createRequestInstance;
    tunnels(tunnelId: string): ITunnelApi;
}
export declare const Api: (apiKey: string, connectOptions?: IConnectOptions) => IApiTunnel;
