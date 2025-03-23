import { IConnectOptions, ITunnelOptions } from "./shared/interfaces";
import { ITunnel, Tunnel } from "./client";
import { unifiedWebsocket } from "./unifiedWebsocket/node";

export * from "./imports";

/**
 * Connect to NoLag message broker using websocket
 * @param authToken
 * @param options
 * @param connectOptions
 * @constructor
 */
export const WebSocketClient = (
  authToken: string,
  options?: ITunnelOptions,
  connectOptions?: IConnectOptions,
): ITunnel => {
  return new Tunnel(unifiedWebsocket, authToken, options, connectOptions);
};
