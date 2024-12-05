import { IConnectOptions, IPaginated, ITunnelModel, ITunnelQuery } from "../shared/interfaces";
import { ITunnelApi } from "./controllers/tunnels/TunnelApi";
export interface IApiTunnel {
    tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelModel>>;
    tunnel(tunnelId: string): ITunnelApi;
}
export declare class ApiTunnel {
    private apiKey;
    connectOptions: IConnectOptions;
    private request;
    constructor(apiKey: string, connectOptions?: IConnectOptions);
    private createRequestInstance;
    tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelModel>>;
    tunnel(tunnelId: string): ITunnelApi;
}
