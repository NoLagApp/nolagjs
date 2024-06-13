"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NqlTransport = void 0;
const ETransportCommand_1 = require("../enum/ETransportCommand");
class NqlTransport {
    static encode(TransportCommands, payload) {
        const separatorArray = new Uint8Array(1);
        separatorArray[0] = ETransportCommand_1.ETransportCommand.Payload;
        const transportCommandsUintArray = TransportCommands.build();
        const commandLength = transportCommandsUintArray.byteLength;
        let payloadLength = 0;
        let payloadUintArray = new Uint8Array(0);
        let payloadOffset;
        if (payload) {
            payloadLength = payload.byteLength + 1;
            payloadUintArray = new Uint8Array(payload);
            payloadOffset = commandLength + 1;
            payload = new Uint8Array(payload);
        }
        const bitLength = commandLength + payloadLength;
        const buf = new ArrayBuffer(bitLength);
        let tmp = new Uint8Array(buf);
        tmp.set(transportCommandsUintArray, 0);
        if (payload) {
            tmp.set(separatorArray, commandLength);
            tmp.set(payloadUintArray, payloadOffset);
        }
        return tmp.buffer;
    }
    static decode(transport) {
        const totalTransportBytes = transport.byteLength;
        const transportBufferViewer = new Uint8Array(transport);
        const payloadSeparatorIndex = transportBufferViewer.indexOf(ETransportCommand_1.ETransportCommand.Payload);
        const commands = transportBufferViewer.slice(0, payloadSeparatorIndex);
        const payloadStartIndex = payloadSeparatorIndex + 1;
        const extractedCommands = this.extractCommands(commands);
        const getCommand = (command) => {
            if (extractedCommands[command]) {
                return extractedCommands[command];
            }
            return false;
        };
        return {
            commands: extractedCommands,
            payload: transport.slice(payloadStartIndex, totalTransportBytes),
            getCommand,
        };
    }
    static hasSeparatorIndexes(commandAction) {
        return commandAction.indexOf(ETransportCommand_1.ETransportCommandSeparator.ArraySeparator) > 0;
    }
    static commandActionUint8ArrayToString(commandActionArray) {
        return commandActionArray.map((item) => String.fromCharCode(item)).join("");
    }
    static commandActionUint8ArrayToStringArray(commandActionArray) {
        const groupedUint8Array = commandActionArray
            .join(",")
            .split(`,${ETransportCommand_1.ETransportCommandSeparator.ArraySeparator},`);
        const commandActionStringArray = groupedUint8Array.map((uint8ArrayAsString) => {
            const groups = uint8ArrayAsString.split(",");
            return this.commandActionUint8ArrayToString(groups.map((i) => Number(i)));
        });
        return commandActionStringArray;
    }
    static extractCommands(commands) {
        const commandByteGroup = {};
        let commandBeingAssigned = null;
        commands.forEach((byte) => {
            if (Object.values(ETransportCommand_1.ETransportCommand).indexOf(byte) >= 0) {
                commandBeingAssigned = byte;
                commandByteGroup[commandBeingAssigned] = [];
                return;
            }
            commandByteGroup[commandBeingAssigned].push(byte);
        });
        Object.keys(commandByteGroup).forEach((key) => {
            const commandActionArray = commandByteGroup[key];
            const hasSeparatorIndexes = this.hasSeparatorIndexes(commandActionArray);
            if (hasSeparatorIndexes) {
                commandByteGroup[key] =
                    this.commandActionUint8ArrayToStringArray(commandActionArray);
            }
            else if (commandActionArray.length === 0) {
                commandByteGroup[key] = true;
            }
            else {
                commandByteGroup[key] =
                    this.commandActionUint8ArrayToString(commandActionArray);
            }
        });
        return commandByteGroup;
    }
}
exports.NqlTransport = NqlTransport;
//# sourceMappingURL=transport.js.map