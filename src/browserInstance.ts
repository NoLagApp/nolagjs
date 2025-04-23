import { IConnectOptions, ITunnelOptions } from "./shared/interfaces";
import { ITunnel, Tunnel } from "./client";
import { unifiedWebsocket } from "./unifiedWebsocket/browser";
export * from "./imports";

/**
 * Connect to NoLag message broker
 * @param authToken
 * @param options
 * @param connectOptions
 * @constructor
 */
export const Client = (
  authToken: string,
  options?: ITunnelOptions,
  connectOptions?: IConnectOptions,
): ITunnel => {
  return new Tunnel(unifiedWebsocket, authToken, options, connectOptions);
};

/**
 * Connect to NoLag message broker using websocket
 * @param authToken
 * @param options
 * @param connectOptions
 * @deprecated
 */
export const WebSocketClient = (
  authToken: string,
  options?: ITunnelOptions,
  connectOptions?: IConnectOptions,
): ITunnel => {
  return Client(authToken, options, connectOptions);
};