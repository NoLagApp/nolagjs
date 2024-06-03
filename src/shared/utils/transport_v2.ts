import { ETransportCommand } from "../enum/ETransportCommand";
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

  static extractCommands(commands: Uint8Array) {
    const commandByteGroup: any = {};
    let commandBeingAssigned: any = null;

    for (let index = 0; index <= commands.length; index++) {
      const byte = commands[index];
      if (!byte) return;
      if (Object.values(ETransportCommand).indexOf(byte) >= 0) {
        commandBeingAssigned = byte;
      }

      if (commandBeingAssigned && !commandByteGroup[commandBeingAssigned]) {
        commandByteGroup[commandBeingAssigned] = [];
      }

      commandByteGroup[commandBeingAssigned].push(byte);
      console.log("index", commandByteGroup);

      // console.log(commandByteGroup[commandBeingAssigned]);

      // if (typeof commandByteGroup[commandBeingAssigned] !== undefined) {
      //   const numberOfGroups = commandByteGroup[commandBeingAssigned].length;

      //   console.log(
      //     "2222",
      //     commandByteGroup[commandBeingAssigned][numberOfGroups - 1],
      //   );

      //   commandByteGroup[commandBeingAssigned][numberOfGroups - 1] +=
      //     String.fromCharCode(byte);
      //   // commandByteGroup[commandBeingAssigned][numberOfGroups - 1].push(
      //   //   String.fromCharCode(byte),
      //   // );
      // }
    }
    console.log("commandByteGroup", commandByteGroup);
    return commandByteGroup;
  }
}
