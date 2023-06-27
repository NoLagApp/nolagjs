"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const enum_1 = require("../shared/enum");
const transport_1 = require("../shared/utils/transport");
class Topic {
    constructor(connection, topicName, identifiers) {
        var _a, _b;
        this.identifiers = [];
        this.setConnection(connection);
        this.topicName = topicName;
        this.saveIdentifiers((_a = identifiers === null || identifiers === void 0 ? void 0 : identifiers.OR) !== null && _a !== void 0 ? _a : []);
        this.subscribe((_b = identifiers === null || identifiers === void 0 ? void 0 : identifiers.OR) !== null && _b !== void 0 ? _b : []);
    }
    findSavedIdentifier(identifier) {
        var _a, _b;
        const key = (_a = Object.keys(identifier)[0]) !== null && _a !== void 0 ? _a : "";
        const value = (_b = Object.values(identifier)[0]) !== null && _b !== void 0 ? _b : "";
        return this.identifiers.find((s) => {
            var _a, _b;
            if (s) {
                const findKey = (_a = Object.keys(s)[0]) !== null && _a !== void 0 ? _a : "";
                const findValue = (_b = Object.values(s)[0]) !== null && _b !== void 0 ? _b : "";
                return key === findKey && value === findValue;
            }
        });
    }
    saveIdentifiers(identifiers) {
        identifiers.map((identifier) => {
            const findSavedIdentifier = this.findSavedIdentifier(identifier);
            if (!findSavedIdentifier) {
                this.identifiers.push(identifier);
            }
        });
    }
    deleteSavedIdentifiers(identifiers) {
        const identifierList = [];
        identifiers.map((identifier) => {
            const findSavedIdentifier = this.findSavedIdentifier(identifier);
            if (!findSavedIdentifier) {
            }
            else {
                identifierList.push(identifier);
            }
        });
        this.identifiers = identifierList;
    }
    subscribe(identifiers) {
        const topicName = (0, transport_1.topicPayload)(this.topicName);
        const nql = (0, transport_1.nqlPayload)((0, transport_1.arrayOfString)(identifiers), enum_1.EAction.Add);
        const records = (0, transport_1.toRecordSeparator)([topicName, nql]);
        if (this.connection) {
            this.connection.send(records.buffer);
        }
    }
    reSubscribe() {
        this.addIdentifiers({
            OR: this.identifiers
        });
    }
    setConnection(connection) {
        this.connection = connection;
        return this;
    }
    _onReceiveMessage(data) {
        if (this.callbackFn) {
            this.callbackFn(data);
        }
        return this;
    }
    onReceive(callbackFn) {
        this.callbackFn = callbackFn;
        return this;
    }
    addIdentifiers(identifiers) {
        var _a;
        this.saveIdentifiers((_a = identifiers.OR) !== null && _a !== void 0 ? _a : []);
        const topicName = (0, transport_1.topicPayload)(this.topicName);
        const nql = (0, transport_1.nqlPayload)((0, transport_1.arrayOfString)(identifiers.OR), enum_1.EAction.Add);
        const records = (0, transport_1.toRecordSeparator)([topicName, nql]);
        if (this.connection) {
            this.connection.send(records.buffer);
        }
        return this;
    }
    removeIdentifiers(identifiers) {
        var _a;
        this.deleteSavedIdentifiers((_a = identifiers.OR) !== null && _a !== void 0 ? _a : []);
        const topicName = (0, transport_1.topicPayload)(this.topicName);
        const nql = (0, transport_1.nqlPayload)((0, transport_1.arrayOfString)(identifiers.OR), enum_1.EAction.Delete);
        const records = (0, transport_1.toRecordSeparator)([topicName, nql]);
        if (this.connection) {
            this.connection.send(records.buffer);
        }
        return this;
    }
    unsubscribe() {
        const topicName = (0, transport_1.topicPayload)(this.topicName, enum_1.EAction.Delete);
        const nql = (0, transport_1.nqlPayload)(new Uint8Array(0));
        const records = (0, transport_1.toRecordSeparator)([topicName, nql]);
        if (this.connection) {
            this.connection.send(records.buffer);
        }
        return true;
    }
    publish(data, identifiers) {
        const transport = (0, transport_1.generateTransport)(data, this.topicName, identifiers);
        if (this.connection) {
            this.connection.send(transport);
        }
        return this;
    }
}
exports.Topic = Topic;
//# sourceMappingURL=topic.js.map