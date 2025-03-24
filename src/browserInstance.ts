import { IConnectOptions, ITunnelOptions } from "./shared/interfaces";
import { ITunnel, Tunnel } from "./client";
import { unifiedWebsocket } from "./unifiedWebsocket/browser";
export * from "./imports";

export const WebSocketClient = (
  authToken: string,
  options?: ITunnelOptions,
  connectOptions?: IConnectOptions,
): ITunnel => {
  return new Tunnel(
    unifiedWebsocket,
    authToken,
    options,
    connectOptions,
  );
};
