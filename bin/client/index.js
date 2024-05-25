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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketClient = exports.Tunnel = void 0;
const topic_1 = require("./topic");
const enum_1 = require("../shared/enum");
const transport_1 = require("../shared/utils/transport");
const NoLagClient_1 = require("./NoLagClient");
__exportStar(require("../shared/utils/Encodings"), exports);
/**
 * To get access NoLag message broker you need access to a Tunnel
 * This class initiates a Tunnel connection and gives you the ability to subscribe to a
 * Topic instance and publish to a topic
 */
class Tunnel {
    constructor(authToken, options, connectOptions) {
        var _a;
        // topics
        this.topics = {};
        this.defaultCheckConnectionInterval = 10000;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.heartBeatInterval = 20000;
        this.visibilityState = enum_1.EVisibilityState.Visible;
        this.callbackOnDisconnect = () => { };
        this.callbackOnReconnect = () => { };
        this.callbackOnReceivedError = () => { };
        this.checkConnectionInterval =
            (_a = connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.checkConnectionInterval) !== null && _a !== void 0 ? _a : this.defaultCheckConnectionInterval;
        this.connectOptions = connectOptions !== null && connectOptions !== void 0 ? connectOptions : undefined;
        this.authToken = authToken;
        this.noLagClient = new NoLagClient_1.NoLagClient(this.authToken, this.connectOptions);
        this.onClose();
        this.onError();
        this.onReceiveMessage();
        // disconnect from NoLag when you move away from the screen
        if (options === null || options === void 0 ? void 0 : options.disconnectOnNoVisibility) {
            this.onVisibilityChange();
        }
    }
    get deviceTokenId() {
        var _a;
        return (_a = this.noLagClient) === null || _a === void 0 ? void 0 : _a.deviceTokenId;
    }
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            if (this.noLagClient) {
                this.noLagClient.heartbeat();
            }
        }, this.heartBeatInterval);
    }
    stopHeartbeat() {
        clearInterval(this.heartbeatTimer);
    }
    // connect to NoLag with Tunnel credentials
    async initiate() {
        if (this.noLagClient) {
            await this.noLagClient.connect();
            this.resetConnectAttempts();
            this.startHeartbeat();
        }
        return this;
    }
    resetConnectAttempts() {
        this.reconnectAttempts = 0;
    }
    onVisibilityChange() {
        if (document.addEventListener) {
            document.addEventListener("visibilitychange", async () => {
                var _a;
                this.visibilityState = document.visibilityState;
                switch (this.visibilityState) {
                    case enum_1.EVisibilityState.Hidden:
                        (_a = this.noLagClient) === null || _a === void 0 ? void 0 : _a.disconnect();
                        break;
                    case enum_1.EVisibilityState.Visible:
                        await this.initiate();
                        break;
                }
            });
        }
    }
    onReceiveMessage() {
        var _a;
        if (this.noLagClient) {
            (_a = this.noLagClient) === null || _a === void 0 ? void 0 : _a.onReceiveMessage((err, data) => {
                var _a;
                const { topicName, nqlIdentifiers } = data;
                if (this.noLagClient && !this.topics[topicName]) {
                    this.topics[topicName] = new topic_1.Topic(this.noLagClient, topicName, {
                        OR: nqlIdentifiers,
                    });
                }
                if (topicName && this.topics[topicName]) {
                    (_a = this.topics[topicName]) === null || _a === void 0 ? void 0 : _a._onReceiveMessage(data);
                }
                if (typeof this.callbackOnReceive === "function") {
                    this.callbackOnReceive(data);
                }
            });
        }
    }
    reconnect() {
        this.stopHeartbeat();
        setTimeout(async () => {
            this.reconnectAttempts++;
            await this.initiate();
            if (typeof this.callbackOnReconnect === "function") {
                this.callbackOnReconnect();
            }
        }, this.checkConnectionInterval);
    }
    canReconnect() {
        if (this.reconnectAttempts === this.maxReconnectAttempts ||
            this.visibilityState === enum_1.EVisibilityState.Hidden) {
            return false;
        }
        return true;
    }
    doReconnect() {
        if (this.canReconnect()) {
            this.reconnect();
        }
        else {
            this.stopHeartbeat();
            if (typeof this.callbackOnDisconnect === "function") {
                this.callbackOnDisconnect("connection retry timeout.");
            }
        }
    }
    onClose() {
        if (this.noLagClient) {
            this.noLagClient.onClose((err, data) => {
                this.doReconnect();
                if (typeof this.callbackOnReceivedError === "function") {
                    this.callbackOnReceivedError(err);
                }
            });
        }
    }
    onError() {
        if (this.noLagClient) {
            this.noLagClient.onError((err, data) => {
                if (typeof this.callbackOnReceivedError === "function") {
                    this.callbackOnReceivedError(err);
                }
            });
        }
    }
    onReceive(callback) {
        this.callbackOnReceive = callback;
    }
    disconnect() {
        var _a;
        this.reconnectAttempts = this.maxReconnectAttempts;
        (_a = this.noLagClient) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    onDisconnect(callback) {
        this.callbackOnDisconnect = callback;
    }
    onReconnect(callback) {
        this.callbackOnReconnect = callback;
    }
    onErrors(callback) {
        this.callbackOnReceivedError = callback;
    }
    getTopic(topicName) {
        // if you are trying to get the specific topic but its not been set
        // set it now
        if (!this.topics[topicName] && this.noLagClient) {
            this.topics[topicName] = new topic_1.Topic(this.noLagClient, topicName, {});
        }
        return this.topics[topicName];
    }
    unsubscribe(topicName) {
        var _a;
        if (this.topics[topicName]) {
            (_a = this.topics[topicName]) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            return true;
        }
        return false;
    }
    subscribe(topicName, identifiers = {}) {
        if (this.noLagClient) {
            if (this.topics[topicName]) {
                return this.topics[topicName];
            }
            else {
                this.topics[topicName] = new topic_1.Topic(this.noLagClient, topicName, identifiers);
                return this.topics[topicName];
            }
        }
    }
    publish(topicName, data, identifiers = []) {
        if (this.noLagClient && this.noLagClient.send) {
            this.stopHeartbeat();
            const transport = (0, transport_1.generateTransport)(data, topicName, identifiers);
            this.noLagClient.send(transport);
            this.startHeartbeat();
        }
    }
    get status() {
        var _a, _b;
        return (_b = (_a = this.noLagClient) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : null;
    }
}
exports.Tunnel = Tunnel;
const WebSocketClient = async (authToken, options, connectOptions) => {
    const instance = new Tunnel(authToken, options, connectOptions);
    return instance.initiate();
};
exports.WebSocketClient = WebSocketClient;
//# sourceMappingURL=index.js.map