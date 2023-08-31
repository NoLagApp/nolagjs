export const CONSTANT = {
  DefaultWsHost: "tunnel.nolag.app",
  DefaultTcpHost: "tunnel.nolag.app",
  DefaultApiHost: "api.nolag.app",
  DefaultWsUrl: "/ws",
  DefaultPort: 443,
  DefaultWsProtocol: "wss",
  DefaultApiUrl: "/v1",
  DefaultHttpProtocol: "https",
};

export type FConnection = (err?: any, data?: any) => void;

export type FAction = (event: any) => void;

export type TIdentifier = [string, string];

export type TIdentifiers = [string, string];

export type TData = ArrayBuffer;

export type dataType<T> = { [key: string]: T };
