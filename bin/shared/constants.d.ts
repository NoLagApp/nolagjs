export declare const CONSTANT: {
    DefaultWsHost: string;
    DefaultTcpHost: string;
    DefaultApiHost: string;
    DefaultWsUrl: string;
    DefaultPort: number;
    DefaultWsProtocol: string;
    DefaultApiUrl: string;
    DefaultHttpProtocol: string;
};
export type FConnection = (err?: any, data?: any) => void;
export type FAction = (event: any) => void;
export type TIdentifier = [string, string];
export type TIdentifiers = [string, string];
export type TData = ArrayBuffer;
export type dataType<T> = {
    [key: string]: T;
};
