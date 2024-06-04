import {
  ETransportCommand,
  ETransportCommandSeparator,
} from "../enum/ETransportCommand";
import { TransportCommands } from "./TransportCommands";

export interface IDecode {
  commands: Record<ETransportCommand, string | string[]>;
  payload: ArrayBuffer;
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

  static decode(transport: ArrayBuffer): IDecode {
    const totalTransportBytes = transport.byteLength;
    const transportBufferViewer = new Uint8Array(transport);
    const payloadSeparatorIndex = transportBufferViewer.indexOf(
      ETransportCommand.Payload,
    );
    const commands = transportBufferViewer.slice(0, payloadSeparatorIndex);
    const payloadStartIndex = payloadSeparatorIndex + 1;

    const extractedCommands = this.extractCommands(commands);

    return {
      commands: extractedCommands,
      payload: transport.slice(payloadStartIndex, totalTransportBytes),
    };
  }

  static hasSeparatorIndexes(commandAction: number[]): boolean {
    return commandAction.indexOf(ETransportCommandSeparator.ArraySeparator) > 0;
  }

  static commandActionUint8ArrayToString(commandActionArray: number[]) {
    return commandActionArray.map((item) => String.fromCharCode(item)).join("");
  }

  static commandActionUint8ArrayToStringArray(commandActionArray: number[]) {
    const groupedUint8Array = commandActionArray
      .join(",")
      .split(`,${ETransportCommandSeparator.ArraySeparator},`);

    const commandActionStringArray: string[] = groupedUint8Array.map(
      (uint8ArrayAsString: string) => {
        const groups = uint8ArrayAsString.split(",");
        return this.commandActionUint8ArrayToString(
          groups.map((i) => Number(i)),
        );
      },
    );

    return commandActionStringArray;
  }

  static extractCommands(
    commands: Uint8Array,
  ): Record<ETransportCommand, string | string[]> {
    const commandByteGroup: any = {};
    let commandBeingAssigned: any = null;

    commands.forEach((byte) => {
      if (Object.values(ETransportCommand).indexOf(byte) >= 0) {
        commandBeingAssigned = byte;
        return;
      }
      if (commandBeingAssigned && !commandByteGroup[commandBeingAssigned]) {
        commandByteGroup[commandBeingAssigned] = [];
      }
      commandByteGroup[commandBeingAssigned].push(byte);
    });

    Object.keys(commandByteGroup).forEach((key: any) => {
      const commandActionArray = commandByteGroup[key];
      const hasSeparatorIndexes = this.hasSeparatorIndexes(commandActionArray);
      if (hasSeparatorIndexes) {
        commandByteGroup[key] =
          this.commandActionUint8ArrayToStringArray(commandActionArray);
      } else {
        commandByteGroup[key] =
          this.commandActionUint8ArrayToString(commandActionArray);
      }
    });

    return commandByteGroup;
  }
}
