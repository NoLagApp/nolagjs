import { ApiTunnel } from "../../ApiTunnel";
import { IHttpPublish, IRequestParams, ITunnelModel } from "../../../shared/interfaces";
import { ITunnelDevice, TunnelDevice } from "./TunnelDevice";
import { ITunnelTopic, TunnelTopic } from "./TunnelTopic";
export interface ITunnelApi {
    /**
     * tunnel topics
     */
    topics: ITunnelTopic;
    /**
     * tunnel devices
     */
    devices: ITunnelDevice;
    /**
     * get tunnel based on supplied tunnelID
     */
    getTunnel(): Promise<ITunnelModel>;
    /**
     * update tunnel based on supplied tunnelID
     */
    updateTunnel(payload: ITunnelModel): Promise<ITunnelModel>;
    /**
     * delete tunnel based on supplied tunnelID
     */
    deleteTunnel(): Promise<ITunnelModel>;
    /**
     * publish messages attached to a tunnel
     * @param httpPublish
     */
    publish(httpPublish: IHttpPublish): Promise<boolean>;
}
export declare class TunnelApi implements ITunnelApi {
    private routeNamespace;
    private readonly tunnelId;
    private readonly requestParams;
    private apiTunnel;
    constructor(apiTunnel: ApiTunnel, tunnelId: string, requestParams: IRequestParams);
    get topics(): TunnelTopic;
    get devices(): TunnelDevice;
    getTunnel(): Promise<ITunnelModel>;
    updateTunnel(payload: ITunnelModel): Promise<ITunnelModel>;
    deleteTunnel(): Promise<ITunnelModel>;
    publish(httpPublish: IHttpPublish): Promise<boolean>;
}
//# sourceMappingURL=TunnelApi.d.ts.map