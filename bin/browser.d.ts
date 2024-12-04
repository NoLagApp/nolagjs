import { IConnectOptions, ITunnelOptions } from "./shared/interfaces";
import { ITunnel } from "./client";
export declare const WebSocketClient: (authToken: string, options?: ITunnelOptions, connectOptions?: IConnectOptions) => Promise<ITunnel>;
