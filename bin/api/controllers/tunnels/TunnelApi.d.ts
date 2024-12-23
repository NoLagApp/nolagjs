import { ApiTunnel } from "../../ApiTunnel";
import { IHttpPublish, IRequestParams } from "../../../shared/interfaces";
import { ITunnelDevice, TunnelDevice } from "./TunnelDevice";
import { ITunnelTopic, TunnelTopic } from "./TunnelTopic";
export interface ITunnelApi {
    topics: ITunnelTopic;
    devices: ITunnelDevice;
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
    publish(httpPublish: IHttpPublish): Promise<boolean>;
}
//# sourceMappingURL=TunnelApi.d.ts.map