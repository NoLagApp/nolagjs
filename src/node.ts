export * from "./imports";
import { EEnvironment } from "./shared/enum";
import { IConnectOptions, ITunnelOptions } from "./shared/interfaces";
import { ITunnel, Tunnel } from "./client";
import {unifiedWebsocket} from "./instance/node";


export const WebSocketClient = async (
  authToken: string,
  options?: ITunnelOptions,
  connectOptions?: IConnectOptions,
): Promise<ITunnel> => {
  const instance = new Tunnel(unifiedWebsocket, authToken, options, connectOptions);
  return instance.initiate();
};