import {
  IConnectOptions,
} from "../shared/interfaces";
import { ApiTunnel, IApiTunnel } from "./ApiTunnel";

/**
 * NoLag API access
 * @param apiKey
 * @param connectOptions
 * @constructor
 */
export const Api = (
  apiKey: string,
  connectOptions?: IConnectOptions,
): IApiTunnel => {
  return new ApiTunnel(apiKey, connectOptions);
};