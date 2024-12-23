import { IConnectOptions, IPaginated, ITunnelModel, ITunnelQuery } from "../shared/interfaces";
import { ITunnelApi } from "./controllers/tunnels/TunnelApi";
export interface IApiTunnel {
    tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelModel>>;
    tunnel(tunnelId: string): ITunnelApi;
}
export declare class ApiTunnel {
    private apiKey;
    connectOptions: IConnectOptions;
    private requestParams;
    constructor(apiKey: string, connectOptions?: IConnectOptions);
    tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelModel>>;
    tunnel(tunnelId: string): ITunnelApi;
}
//# sourceMappingURL=ApiTunnel.d.ts.map