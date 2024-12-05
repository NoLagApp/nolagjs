import { AxiosInstance } from "axios";
import { ApiTunnel } from "../../ApiTunnel";
import { IHttpPublish } from "../../../shared/interfaces";
import { ITunnelDevice, TunnelDevice } from "./TunnelDevice";
import { ITunnelTopic, TunnelTopic } from "./TunnelTopic";
export interface ITunnelApi {
    topics: ITunnelTopic;
    devices: ITunnelDevice;
    publish(httpPublish: IHttpPublish): Promise<boolean>;
}
export declare class TunnelApi implements ITunnelApi {
    private routeNamespace;
    private tunnelId;
    private request;
    private apiTunnel;
    constructor(apiTunnel: ApiTunnel, tunnelId: string, request: AxiosInstance);
    get topics(): TunnelTopic;
    get devices(): TunnelDevice;
    publish(httpPublish: IHttpPublish): Promise<boolean>;
}
