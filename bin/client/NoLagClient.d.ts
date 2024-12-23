import { FConnection } from "../shared/constants";
import { EConnectionStatus } from "../shared/enum";
import { IConnectOptions, IUnifiedWebsocket } from "../shared/interfaces";
interface INoLagClient {
    connect(): Promise<NoLagClient>;
    setReConnect(): void;
    onOpen(callback: FConnection): void;
    onReceiveMessage(callback: FConnection): void;
    onClose(callback: FConnection): void;
    onError(callback: FConnection): void;
}
export declare class NoLagClient implements INoLagClient {
    private host;
    private authToken;
    wsInstance: IUnifiedWebsocket | undefined;
    private protocol;
    private url;
    private deviceConnectionId;
    private environment;
    deviceTokenId: string | null;
    private defaultCheckConnectionInterval;
    private defaultCheckConnectionTimeout;
    private checkConnectionInterval;
    private checkConnectionTimeout;
    private reConnect;
    private callbackOnOpen;
    private callbackOnReceive;
    private callbackOnClose;
    private callbackOnError;
    connectionStatus: EConnectionStatus;
    private buffer;
    private backpressureSendInterval;
    private senderInterval;
    private unifiedWebsocket;
    constructor(unifiedWebsocket: (url: string) => IUnifiedWebsocket, authToken: string, connectOptions?: IConnectOptions);
    startSender(): void;
    slowDownSender(backpressureInterval: number): void;
    addToBuffer(buffer: ArrayBuffer): void;
    setReConnect(reConnect?: boolean): void;
    /**
     * Promise - Setup the connection process, code will detect if the code is being used in the front-end or backend
     * @param callbackMain used as a event trigger
     * @returns NoLagClient instance
     */
    connect(): Promise<NoLagClient>;
    disconnect(): void;
    /**
     * Initiate browser WebSocket instance and set it to
     * wsInstance
     */
    initWebsocketConnection(): void;
    authenticate(): void;
    onOpen(callback: FConnection): void;
    onReceiveMessage(callback: FConnection): void;
    onClose(callback: FConnection): void;
    onError(callback: FConnection): void;
    private _onOpen;
    private _onReceive;
    private _onClose;
    private _onError;
    send(transport: ArrayBuffer): void;
    heartbeat(): void;
}
export {};
//# sourceMappingURL=NoLagClient.d.ts.map