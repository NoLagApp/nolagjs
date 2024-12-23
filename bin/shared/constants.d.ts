import { ITransport } from "./interfaces";
export declare const CONSTANT: {
    DefaultWsHost: string;
    DefaultApiHost: string;
    DefaultWsUrl: string;
    DefaultPort: number;
    DefaultWsProtocol: string;
    DefaultApiUrl: string;
    DefaultHttpProtocol: string;
};
export type FOnReceive = (err?: any, data?: ITransport) => void;
export type FConnection = (err?: any, data?: any) => void;
export type TData = ArrayBuffer;
export type dataType<T> = {
    [key: string]: T;
};
//# sourceMappingURL=constants.d.ts.map