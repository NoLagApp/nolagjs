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
export type dataType<T> = {
    [key: string]: T;
};
export type publishData = ArrayBuffer | string | object | Record<any, any>;
//# sourceMappingURL=constants.d.ts.map