export * from "./imports";
import { IConnectOptions, ITunnelOptions } from "./shared/interfaces";
import { ITunnel, Tunnel } from "./client/index";
import {unifiedWebsocket} from "./instance/node";


export const WebSocketClient = async (
  authToken: string,
  options?: ITunnelOptions,
  connectOptions?: IConnectOptions,
): Promise<ITunnel> => {
  const instance = new Tunnel(unifiedWebsocket, authToken, options, connectOptions);
  return instance.initiate();
};