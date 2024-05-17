import { FConnection } from "../shared/constants";
import { IConnectOptions } from "../shared/interfaces";
interface INoLagClient {
    connect(): Promise<NoLagClient>;
    onOpen(callback: FConnection): void;
    onReceiveMessage(callback: FConnection): void;
    onClose(callback: FConnection): void;
    onError(callback: FConnection): void;
}
export declare class NoLagClient implements INoLagClient {
    private host;
    private authToken;
    wsInstance: any | null;
    private protocol;
    private url;
    private deviceConnectionId;
    private environment;
    deviceTokenId: string | null;
    private defaultCheckConnectionInterval;
    private defaultCheckConnectionTimeout;
    private checkConnectionInterval;
    private checkConnectionTimeout;
    private callbackOnOpen;
    private callbackOnReceive;
    private callbackOnClose;
    private callbackOnError;
    private connectionStatus;
    constructor(authToken: string, connectOptions?: IConnectOptions);
    isBrowser(): boolean;
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
    browserInstance(): void;
    /**
     * Node WebSocket connection with package "ws"
     */
    nodeInstance(): void;
    /**
     * Get the status of the connection to the server
     */
    get status(): string;
    authenticate(): void;
    onOpen(callback: FConnection): void;
    onReceiveMessage(callback: FConnection): void;
    onClose(callback: FConnection): void;
    onError(callback: FConnection): void;
    private _onOpen;
    private getAlertMessage;
    private getGroupSeparatorIndex;
    private getGroups;
    private getRecordSeparatorIndex;
    private getRecords;
    private decode;
    private _onReceive;
    private _onClose;
    private _onError;
    send(transport: ArrayBuffer): void;
    heartbeat(): void;
}
export {};
