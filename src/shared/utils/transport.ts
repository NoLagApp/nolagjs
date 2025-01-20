import {
  ETransportCommand,
  ETransportCommandSeparator,
} from "../enum/ETransportCommand";
import { TransportCommands } from "./TransportCommands";

export interface IDecode {
  commands: Record<ETransportCommand, string | string[] | boolean>;
  payload: ArrayBuffer;
  getCommand(command: ETransportCommand): string | string[] | boolean;
}
export interface INqlTransport {
  encode(TransportCommands: TransportCommands, payload: Uint8Array): Uint8Array;
  decode(data: Uint8Array): IDecode;
}

export class NqlTransport {
  static encode(TransportCommands: TransportCommands, payload?: ArrayBuffer) {
    const separatorArray = new Uint8Array(1);
    separatorArray[0] = ETransportCommand.Payload;

    const transportCommandsUintArray = TransportCommands.build();

    const commandLength = transportCommandsUintArray.byteLength;

    let payloadLength = 0;
    let payloadUintArray: Uint8Array = new Uint8Array(0);
    let payloadOffset;

    if (payload) {
      payloadLength = payload.byteLength + 1;
      payloadUintArray = new Uint8Array(payload);
      payloadOffset = commandLength + 1;
    }

    const bitLength = commandLength + payloadLength;

    const buf = new ArrayBuffer(bitLength);

    const tmp = new Uint8Array(buf);
    tmp.set(transportCommandsUintArray, 0);

    if (payload) {
      tmp.set(separatorArray, commandLength);
      tmp.set(payloadUintArray, payloadOffset);
    }

    return tmp.buffer;
  }

  static decode(transport: ArrayBuffer): IDecode {
    const totalTransportBytes = transport.byteLength;
    const transportBufferViewer = new Uint8Array(transport);
    let payloadSeparatorIndex = transportBufferViewer.indexOf(
      ETransportCommand.Payload,
    );

    payloadSeparatorIndex =
      payloadSeparatorIndex < 0 ? totalTransportBytes : payloadSeparatorIndex;

    const commands = transportBufferViewer.slice(0, payloadSeparatorIndex);
    const payloadStartIndex = payloadSeparatorIndex + 1;

    const extractedCommands = this.extractCommands(commands);

    const getCommand = (
      command: ETransportCommand,
    ): string | string[] | boolean => {
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

  static hasSeparatorIndexes(commandAction: number[]): boolean {
    return commandAction.indexOf(ETransportCommandSeparator.ArraySeparator) > 0;
  }

  static commandActionUint8ArrayToString(commandActionArray: number[]) {
    return commandActionArray.map((item) => String.fromCharCode(item)).join("");
  }

  static commandActionUint8ArrayToStringArray(commandActionArray: number[]) {
    const groupedUint8Array: number[][] = [];
    let tempGroup: number[] = [];

    commandActionArray.forEach((item) => {
      if (item === ETransportCommandSeparator.ArraySeparator) {
        groupedUint8Array.push(tempGroup);
        tempGroup = [];
      } else {
        tempGroup.push(item);
      }
    });

    // only if tempGroup still has data push it in
    if (tempGroup.length > 0) {
      groupedUint8Array.push(tempGroup);
    }

    return groupedUint8Array.map((uint8Array: number[]) => {
      return this.commandActionUint8ArrayToString(
        uint8Array.map((i) => Number(i)),
      );
    });
  }

  static extractCommands(
    commands: Uint8Array,
  ): Record<ETransportCommand, string | string[] | boolean> {
    const commandByteGroup: any = {};
    let commandBeingAssigned: any = null;

    commands.forEach((byte) => {
      if (Object.values(ETransportCommand).indexOf(byte) >= 0) {
        commandBeingAssigned = byte;
        commandByteGroup[commandBeingAssigned] = [];
        return;
      }

      commandByteGroup[commandBeingAssigned].push(byte);
    });

    Object.keys(commandByteGroup).forEach((key: any) => {
      const commandActionArray = commandByteGroup[key];
      const hasSeparatorIndexes = this.hasSeparatorIndexes(commandActionArray);
      if (hasSeparatorIndexes) {
        commandByteGroup[key] =
          this.commandActionUint8ArrayToStringArray(commandActionArray);
      } else if (commandActionArray.length === 0) {
        commandByteGroup[key] = true;
      } else {
        commandByteGroup[key] =
          this.commandActionUint8ArrayToString(commandActionArray);
      }
    });

    return commandByteGroup;
  }
}
