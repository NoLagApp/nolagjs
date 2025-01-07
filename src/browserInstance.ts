import { IConnectOptions, ITunnelOptions } from "./shared/interfaces";
import { ITunnel, Tunnel } from "./client";
import { unifiedWebsocket } from "./unifiedWebsocket/browser";
export * from "./imports";

console.log("load browserInstance");
export const WebSocketClient = async (
  authToken: string,
  options?: ITunnelOptions,
  connectOptions?: IConnectOptions,
): Promise<ITunnel> => {
  const instance = new Tunnel(
    unifiedWebsocket,
    authToken,
    options,
    connectOptions,
  );
  return instance.initiate();
};
