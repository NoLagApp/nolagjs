import { AxiosInstance } from "axios";
import { IConnectOptions } from "../../../shared/interfaces";
export declare const TunnelPublish: (data: ArrayBuffer, topicName: string, identifiers: string[], tunnelId: string, parentRouteNamespace: string, request: AxiosInstance, connectOptions: IConnectOptions) => Promise<boolean>;
