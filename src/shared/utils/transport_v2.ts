import { ETransportCommand } from "../enum/ETransportCommand";
import { uint8ArrayToString } from "./Encodings";
import { TransportCommands } from "./TransportCommands";

export interface IDecode {
  commands: Record<ETransportCommand, string>;
  payload: ArrayBuffer;
}
export interface INqlTransport {
  encode(TransportCommands: TransportCommands, payload: Uint8Array): Uint8Array;
  decode(data: Uint8Array): IDecode;
}

export class NqlTransport {
  static encode(TransportCommands: TransportCommands, payload?: ArrayBuffer) {
    if (!payload) {
      payload = new ArrayBuffer(0);
    }

    const TransportCommandsUintArray = TransportCommands.build();

    const commandLength = TransportCommandsUintArray.byteLength;
    const payloadLength = payload.byteLength;

    const bitLength = commandLength + payloadLength;

    const buf = new ArrayBuffer(bitLength);

    let tmp = new Uint8Array(buf);
    tmp.set(TransportCommandsUintArray, 0);
    tmp.set(new Uint8Array(payload), commandLength);

    return tmp.buffer;
  }

  static decode(transport: ArrayBuffer): IDecode {
    const totalTransportBytes = transport.byteLength;
    const transportBufferViewer = new Uint8Array(transport);
    const payloadSeparatorIndex = transportBufferViewer.indexOf(
      ETransportCommand.payload,
    );
    const commands = transportBufferViewer.slice(0, payloadSeparatorIndex);
    const payloadStartIndex = payloadSeparatorIndex + 1;

    const extractedCommands = this.extractCommands(commands);

    return {
      commands: extractedCommands,
      payload: transport.slice(payloadStartIndex, totalTransportBytes),
    };
  }

  static extractCommands(commands: Uint8Array) {
    const commandByteGroup: any = {};

    let commandBeingAssigned: ETransportCommand | null = null;

    for (let index = 0; index < commands.length; index++) {
      const byte = commands[index];
      if (!byte) return;
      if (Object.values(ETransportCommand).indexOf(byte))
        commandBeingAssigned = byte;
      if (commandBeingAssigned && !commandByteGroup[commandBeingAssigned]) {
        commandByteGroup[commandBeingAssigned] = [];
      }
      if (commandBeingAssigned && commandByteGroup[commandBeingAssigned]) {
        commandByteGroup[commandBeingAssigned].push(byte);
      }
    }

    Object.keys(commandByteGroup).forEach((key) => {
      commandByteGroup[key] = uint8ArrayToString(
        new Uint8Array(commandByteGroup[key]),
      );
    });

    return commandByteGroup;
  }
}
