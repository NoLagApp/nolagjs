import { IConnectOptions, IPaginated, ITunnelModel, ITunnelQuery } from "../shared/interfaces";
import { ITunnelApi } from "./controllers/tunnels/TunnelApi";
export interface IApiTunnel {
    /**
     * Retrieve list of tunnels based on tunnelQuery
     * @param tunnelQuery
     */
    tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelModel>>;
    /**
     * Create new tunnel based on supplied payload
     * @param payload
     */
    createTunnel(payload: ITunnelModel): Promise<ITunnelModel>;
    /**
     * Interact with a tunnel by using the tunnelId
     * @param tunnelId
     */
    tunnel(tunnelId: string): ITunnelApi;
}
export declare class ApiTunnel {
    private apiKey;
    connectOptions: IConnectOptions;
    private requestParams;
    constructor(apiKey: string, connectOptions?: IConnectOptions);
    tunnels(tunnelQuery?: ITunnelQuery): Promise<IPaginated<ITunnelModel>>;
    createTunnel(payload: ITunnelModel): Promise<ITunnelModel>;
    tunnel(tunnelId: string): ITunnelApi;
}
//# sourceMappingURL=ApiTunnel.d.ts.map