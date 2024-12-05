import {
  IConnectOptions,
} from "../shared/interfaces";
import { ApiTunnel, IApiTunnel } from "./ApiTunnel";

export const Api = (
  apiKey: string,
  connectOptions?: IConnectOptions,
): IApiTunnel => {
  return new ApiTunnel(apiKey, connectOptions);
};

// export const Api = (
//   apiKey: string,
//   connectOptions?: unknown,
// ): unknown => {
//   return false;
// };