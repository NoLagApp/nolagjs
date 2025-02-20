import { ITransport } from "./interfaces";

export const CONSTANT = {
  DefaultWsHost: "tunnel.nolag.app",
  DefaultApiHost: "api.nolag.app",
  DefaultWsUrl: "/ws",
  DefaultPort: 443,
  DefaultWsProtocol: "wss",
  DefaultApiUrl: "/v1",
  DefaultHttpProtocol: "https",
};

export type FOnReceive = (err?: any, data?: ITransport) => void;

export type FConnection = (err?: any, data?: any) => void;

export type dataType<T> = { [key: string]: T };

export type publishData = ArrayBuffer | string | object | Record<any, any>;