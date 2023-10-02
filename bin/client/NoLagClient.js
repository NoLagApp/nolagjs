"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoLagClient = void 0;
const constants_1 = require("../shared/constants");
const enum_1 = require("../shared/enum");
const Encodings_1 = require("../shared/utils/Encodings");
class NoLagClient {
    constructor(authToken, socketType, connectOptions) {
        var _a, _b, _c, _d, _e;
        this.wsInstance = null;
        this.tcpInstance = null;
        this.deviceConnectionId = undefined;
        this.deviceTokenId = null;
        //  check connection
        this.defaultCheckConnectionInterval = 100;
        this.defaultCheckConnectionTimeout = 10000;
        // callback function used to return the connection result
        this.callbackOnOpen = () => { };
        this.callbackOnReceive = () => { };
        this.callbackOnClose = () => { };
        this.callbackOnError = () => { };
        // status of current socket connection
        this.connectionStatus = enum_1.EConnectionStatus.Idle;
        this.socketType = socketType;
        this.authToken = authToken !== null && authToken !== void 0 ? authToken : "";
        this.host = (_a = connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.host) !== null && _a !== void 0 ? _a : constants_1.CONSTANT.DefaultWsHost;
        this.protocol = (_b = connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.protocol) !== null && _b !== void 0 ? _b : constants_1.CONSTANT.DefaultWsProtocol;
        this.port = (_c = connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.port) !== null && _c !== void 0 ? _c : constants_1.CONSTANT.DefaultPort;
        this.url = constants_1.CONSTANT.DefaultWsUrl;
        this.checkConnectionInterval =
            (_d = connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.checkConnectionInterval) !== null && _d !== void 0 ? _d : this.defaultCheckConnectionInterval;
        this.checkConnectionTimeout =
            (_e = connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.checkConnectionTimeout) !== null && _e !== void 0 ? _e : this.defaultCheckConnectionTimeout;
    }
    // Check so see if we are in a browser or backend environment
    isBrowser() {
        let isNode = true;
        if (typeof process === "object") {
            if (typeof process.versions === "object") {
                if (typeof process.versions.node !== "undefined") {
                    isNode = false;
                }
            }
        }
        return isNode;
    }
    initiateSocketType() {
        switch (this.socketType) {
            case enum_1.ESocketType.WebSocket:
                this.isBrowser() ? this.browserInstance() : this.nodeWebSocketInstance();
                break;
            case enum_1.ESocketType.TcpSocket:
                this.nodeTcpInstance();
                break;
        }
    }
    /**
     * Promise - Setup the connection process, code will detect if the code is being used in the front-end or backend
     * @param callbackMain used as a event trigger
     * @returns NoLagClient instance
     */
    connect() {
        this.connectionStatus = enum_1.EConnectionStatus.Idle;
        this.initiateSocketType();
        return new Promise((resolve, reject) => {
            const checkConnection = setInterval(() => {
                if (this.connectionStatus === enum_1.EConnectionStatus.Connected) {
                    resolve(this);
                    clearInterval(checkConnection);
                }
            }, this.checkConnectionInterval);
            setTimeout(() => {
                if (this.connectionStatus === enum_1.EConnectionStatus.Idle) {
                    reject(true);
                    clearInterval(checkConnection);
                }
            }, this.checkConnectionTimeout);
        });
    }
    disconnect() {
        if (this.wsInstance && this.wsInstance.close) {
            this.wsInstance.close();
        }
    }
    /**
     * Initiate browser WebSocket instance and set it to
     * wsInstance
     */
    browserInstance() {
        var _a;
        this.host = (_a = this.host) !== null && _a !== void 0 ? _a : constants_1.CONSTANT.DefaultWsHost;
        this.environment = enum_1.EEnvironment.Browser;
        // prevent the re-initiation of a socket connection when the 
        // reconnect function calls this method again
        if (this.connectionStatus === enum_1.EConnectionStatus.Connected) {
            return;
        }
        this.wsInstance = null;
        // connect to server via ws
        this.wsInstance = new WebSocket(`${this.protocol}://${this.host}${this.url}`);
        this.wsInstance.binaryType = enum_1.EEncoding.Arraybuffer;
        // set of events
        // when a successful connection is made with he server
        this.wsInstance.onopen = (event) => {
            this._onOpen(event);
        };
        this.wsInstance.onclose = (event) => {
            this._onClose(event);
        };
        this.wsInstance.onerror = (event) => {
            this._onError(event);
        };
        this.wsInstance.onmessage = (event) => {
            this._onReceive(event);
        };
    }
    /**
     * Node WebSocket connection with package "ws"
     */
    nodeWebSocketInstance() {
        Promise.resolve().then(() => __importStar(require("ws"))).then((loadedWebSocketNode) => {
            const WebSocketNode = loadedWebSocketNode.default;
            this.environment = enum_1.EEnvironment.Nodejs;
            // prevent the re-initiation of a socket connection when the 
            // reconnect function calls this method again
            if (this.connectionStatus === enum_1.EConnectionStatus.Connected) {
                return;
            }
            this.wsInstance = new WebSocketNode(`${this.protocol}://${this.host}${this.url}`);
            this.wsInstance.on("open", (event) => {
                this._onOpen(event);
            });
            this.wsInstance.on("message", (event) => {
                this._onReceive(event);
            });
            this.wsInstance.on("close", (event) => {
                this._onError(event);
            });
        });
    }
    /**
     * Node TCP socket connection with package "net"
     */
    nodeTcpInstance() {
        var _a;
        this.host = (_a = this.host) !== null && _a !== void 0 ? _a : constants_1.CONSTANT.DefaultTcpHost;
        this.environment = enum_1.EEnvironment.Nodejs;
        Promise.resolve().then(() => __importStar(require("net"))).then((loadedNodejsNet) => {
            const net = loadedNodejsNet.default;
            this.environment = enum_1.EEnvironment.Nodejs;
            // prevent the re-initiation of a socket connection when the 
            // reconnect function calls this method again
            if (this.connectionStatus === enum_1.EConnectionStatus.Connected) {
                return;
            }
            this.tcpInstance = net.createConnection(this.port, this.host, () => {
                this.tcpInstance.on("ready", (event) => {
                    this._onOpen(event);
                });
                this.tcpInstance.on("data", (event) => {
                    this._onReceive(event);
                });
                this.tcpInstance.on("close", (event) => {
                    this._onClose(event);
                });
                this.tcpInstance.on("error", (event) => {
                    this._onError(event);
                });
            });
        });
    }
    /**
     * Get the status of the connection to the server
     */
    get status() {
        switch (this.connectionStatus) {
            case enum_1.EConnectionStatus.Connecting:
                return "Connecting";
            case enum_1.EConnectionStatus.Connected:
                return "Connected";
            case enum_1.EConnectionStatus.Disconnected:
                return "Disconnected";
            default:
                return enum_1.EConnectionStatus.Idle;
        }
    }
    authenticate() {
        this.connectionStatus = enum_1.EConnectionStatus.Connecting;
        const { authToken: auth, deviceConnectionId: id } = this;
        this.send((0, Encodings_1.stringToArrayBuffer)(auth));
    }
    onOpen(callback) {
        this.callbackOnOpen = callback;
    }
    onReceiveMessage(callback) {
        this.callbackOnReceive = callback;
    }
    onClose(callback) {
        this.callbackOnClose = callback;
    }
    onError(callback) {
        this.callbackOnError = callback;
    }
    _onOpen(event) {
        this.connectionStatus === enum_1.EConnectionStatus.Idle;
        this.callbackOnOpen(undefined, event);
    }
    getAlertMessage(payload) {
        const removedNegativeSeparator = payload.slice(1, payload.length);
        const codeSplit = removedNegativeSeparator.findIndex((i) => i == enum_1.ESeparator.BellAlert);
        const code = removedNegativeSeparator.slice(0, codeSplit);
        const message = removedNegativeSeparator.slice(codeSplit + 1, removedNegativeSeparator.length);
        return {
            code: Number((0, Encodings_1.uint8ArrayToString)(code)),
            msg: (0, Encodings_1.uint8ArrayToString)(message),
        };
    }
    getGroupSeparatorIndex(payload) {
        return payload.findIndex((i) => i == enum_1.ESeparator.Group);
    }
    getGroups(payload) {
        const sliceIndex = this.getGroupSeparatorIndex(payload);
        // extract topic and identifier records
        const topicAndIdentifiers = payload.slice(0, sliceIndex);
        // extact data
        const data = payload.slice(sliceIndex + 1, payload.length);
        return {
            topicAndIdentifiers,
            data,
        };
    }
    getRecordSeparatorIndex(payload) {
        return payload.findIndex((i) => i == enum_1.ESeparator.Record);
    }
    getRecords(payload) {
        const sliceIndex = this.getRecordSeparatorIndex(payload);
        // extract topic name
        const topicName = (0, Encodings_1.uint8ArrayToString)(payload.slice(0, sliceIndex));
        // extract NQL identifiers
        const nqlIdentifiers = (0, Encodings_1.uint8ArrayToString)(payload.slice(sliceIndex + 1, payload.length))
            .split("|")
            .filter((i) => i !== "");
        return {
            topicName,
            nqlIdentifiers,
        };
    }
    decode(payload) {
        const { topicAndIdentifiers, data } = this.getGroups(payload);
        const { topicName, nqlIdentifiers } = this.getRecords(topicAndIdentifiers);
        return {
            data,
            topicName,
            nqlIdentifiers,
        };
    }
    async _onReceive(event) {
        let data = null;
        switch (this.environment) {
            case enum_1.EEnvironment.Browser:
                const arrayBuffer = await event.data;
                data = new Uint8Array(arrayBuffer);
                break;
            case enum_1.EEnvironment.Nodejs:
                data = new Uint8Array(event);
                break;
        }
        if (!(data === null || data === void 0 ? void 0 : data[0])) {
            return;
        }
        if (data[0] === enum_1.EConnectionStatus.Connecting &&
            this.connectionStatus === enum_1.EConnectionStatus.Idle) {
            this.authenticate();
            return;
        }
        if (Number(`${data[0]}${data[1]}`) === enum_1.EConnectionStatus.Connected &&
            this.connectionStatus === enum_1.EConnectionStatus.Connecting) {
            this.connectionStatus = enum_1.EConnectionStatus.Connected;
            this.deviceTokenId = (0, Encodings_1.uint8ArrayToString)(data.slice(2, data.length));
            return;
        }
        if (Number(`${data[0]}`) === enum_1.ESeparator.NegativeAck) {
            this.connectionStatus = enum_1.EConnectionStatus.Connected;
            this.callbackOnError(this.getAlertMessage(data), undefined);
            return;
        }
        this.callbackOnReceive(undefined, this.decode(data));
    }
    _onClose(event) {
        this.connectionStatus = enum_1.EConnectionStatus.Disconnected;
        this.callbackOnClose(event, undefined);
    }
    _onError(event) {
        this.connectionStatus = enum_1.EConnectionStatus.Disconnected;
        this.callbackOnError(event, undefined);
    }
    send(transport) {
        if (this.wsInstance) {
            this.wsInstance.send(transport);
        }
        else if (this.tcpInstance) {
            this.tcpInstance.write(transport);
        }
    }
    heartbeat() {
        if (this.wsInstance) {
            this.wsInstance.send(new ArrayBuffer(0));
        }
        else if (this.tcpInstance) {
            this.tcpInstance.write(new ArrayBuffer(0));
        }
    }
}
exports.NoLagClient = NoLagClient;
//# sourceMappingURL=NoLagClient.js.map