import { AxiosInstance } from "axios";
import { TData } from "../../../shared/constants";
import { IConnectOptions } from "../../../shared/interfaces";
export declare const TunnelPublish: (data: TData, topicName: string, identifiers: string[], tunnelId: string, parentRouteNamespace: string, request: AxiosInstance, connectOptions: IConnectOptions) => Promise<boolean>;
