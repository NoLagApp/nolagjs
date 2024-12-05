import { IConnectOptions } from "../shared/interfaces";
import { IApiTunnel } from "./ApiTunnel";
export declare const Api: (apiKey: string, connectOptions?: IConnectOptions) => IApiTunnel;
