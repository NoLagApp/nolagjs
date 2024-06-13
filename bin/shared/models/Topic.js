"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const ETransportCommand_1 = require("../enum/ETransportCommand");
const TransportCommands_1 = require("../utils/TransportCommands");
const transport_1 = require("../utils/transport");
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
        const commands = (0, TransportCommands_1.transportCommands)().setCommand(ETransportCommand_1.ETransportCommand.Topic, this.topicName);
        if (identifiers.length > 0) {
            commands.setCommand(ETransportCommand_1.ETransportCommand.Identifier, identifiers);
        }
        commands.setCommand(ETransportCommand_1.ETransportCommand.AddAction);
        const transport = transport_1.NqlTransport.encode(commands);
        this.send(transport);
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
    addIdentifiers(identifiersList) {
        var _a;
        const identifiers = (_a = identifiersList === null || identifiersList === void 0 ? void 0 : identifiersList.OR) !== null && _a !== void 0 ? _a : [];
        this.saveIdentifiers(identifiers);
        const commands = (0, TransportCommands_1.transportCommands)().setCommand(ETransportCommand_1.ETransportCommand.Topic, this.topicName);
        if (identifiers.length > 0) {
            commands.setCommand(ETransportCommand_1.ETransportCommand.Identifier, identifiers);
        }
        commands.setCommand(ETransportCommand_1.ETransportCommand.AddAction);
        const transport = transport_1.NqlTransport.encode(commands);
        this.send(transport);
        return this;
    }
    removeIdentifiers(identifiers) {
        this.deleteSavedIdentifiers(identifiers !== null && identifiers !== void 0 ? identifiers : []);
        const commands = (0, TransportCommands_1.transportCommands)().setCommand(ETransportCommand_1.ETransportCommand.Topic, this.topicName);
        if (identifiers.length > 0) {
            commands.setCommand(ETransportCommand_1.ETransportCommand.Identifier, identifiers);
        }
        commands.setCommand(ETransportCommand_1.ETransportCommand.DeleteAction);
        const transport = transport_1.NqlTransport.encode(commands);
        this.send(transport);
        return this;
    }
    unsubscribe() {
        const commands = (0, TransportCommands_1.transportCommands)()
            .setCommand(ETransportCommand_1.ETransportCommand.Topic, this.topicName)
            .setCommand(ETransportCommand_1.ETransportCommand.DeleteAction);
        const transport = transport_1.NqlTransport.encode(commands);
        this.send(transport);
        return true;
    }
    publish(data, identifiers) {
        const commands = (0, TransportCommands_1.transportCommands)().setCommand(ETransportCommand_1.ETransportCommand.Topic, this.topicName);
        if ((identifiers === null || identifiers === void 0 ? void 0 : identifiers.length) > 0) {
            commands.setCommand(ETransportCommand_1.ETransportCommand.Identifier, identifiers);
        }
        const transport = transport_1.NqlTransport.encode(commands, data);
        this.send(transport);
        return this;
    }
    send(transport) {
        if (this.connection) {
            this.connection.send(transport);
        }
    }
}
exports.Topic = Topic;
//# sourceMappingURL=Topic.js.map