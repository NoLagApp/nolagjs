import { FConnection } from "../shared/constants";
import { EConnectionStatus, ESendAction } from "../shared/enum";
import { IConnectOptions, ITransport, IUnifiedWebsocket } from "../shared/interfaces";
import { AcknowledgeQueueManager } from "../shared/utils/AcknowledgeQueue/AcknowledgeQueueManager";
interface INoLagClient {
    connect(): Promise<void>;
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
    deviceTokenId: string | null;
    private defaultCheckConnectionInterval;
    private defaultCheckConnectionTimeout;
    private checkConnectionInterval;
    private checkConnectionTimeout;
    private reConnect;
    private debug;
    private callbackOnOpen;
    private callbackOnReceive;
    private callbackOnClose;
    private callbackOnError;
    connectionStatus: EConnectionStatus;
    private buffer;
    private backpressureSendInterval;
    private senderInterval;
    private unifiedWebsocket;
    private acknowledgeQueueManager;
    private bufferOnDisconnect;
    constructor(unifiedWebsocket: (url: string) => IUnifiedWebsocket, authToken: string, acknowledgeQueueManager: AcknowledgeQueueManager, connectOptions?: IConnectOptions);
    startSender(): void;
    slowDownSender(backpressureInterval: number): void;
    addToBuffer(buffer: ArrayBuffer): void;
    setReConnect(reConnect?: boolean): void;
    /**
     * Promise - Set up the connection process, code will detect if the code is being used in the front-end or backend
     * @returns NoLagClient instance
     */
    connect(callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<void>;
    disconnect(): void;
    /**
     * Initiate browser WebSocket instance and set it to
     * wsInstance
     */
    initWebsocketConnection(): Promise<boolean>;
    authenticate(callbackFn?: (error: Error | null, data: ITransport | null) => void): Promise<void>;
    onOpen(callback: FConnection): void;
    onReceiveMessage(callback: FConnection): void;
    onClose(callback: FConnection): void;
    onError(callback: FConnection): void;
    private ackCommand;
    private _onOpen;
    private _onReceive;
    private _onClose;
    private _onError;
    send(sendAction: ESendAction, transport: ArrayBuffer): void;
    heartbeat(): void;
}
export {};
//# sourceMappingURL=NoLagClient.d.ts.map