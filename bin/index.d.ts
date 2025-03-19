import { IConnectOptions, ITunnelOptions } from "./shared/interfaces";
import { ITunnel } from "./client";
export * from "./imports";
/**
 * Connect to NoLag message broker using websocket
 * @param authToken
 * @param options
 * @param connectOptions
 * @constructor
 */
export declare const WebSocketClient: (authToken: string, options?: ITunnelOptions, connectOptions?: IConnectOptions) => ITunnel;
//# sourceMappingURL=index.d.ts.map