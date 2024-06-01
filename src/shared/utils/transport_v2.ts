import { Commands, ICommands } from "./Commands";

export interface IDecode {
  commands: ICommands;
  payload: Uint8Array;
}
export interface INqlTransport {
  encode(commands: Commands, payload: Uint8Array): Uint8Array;
  decode(data: Uint8Array): IDecode;
}

export class NqlTransport {
  static encode(commands: Commands, payload?: ArrayBuffer) {
    if (!payload) {
      payload = new ArrayBuffer(0);
    }

    const commandsUintArray = commands.build();

    const commandLength = commandsUintArray.byteLength;
    const payloadLength = payload.byteLength;

    const bitLength = commandLength + payloadLength;

    const buf = new ArrayBuffer(bitLength);

    let tmp = new Uint8Array(buf);
    tmp.set(commandsUintArray, 0);
    tmp.set(new Uint8Array(payload), commandLength);

    return tmp.buffer;
  }

  static decode() {}
}
