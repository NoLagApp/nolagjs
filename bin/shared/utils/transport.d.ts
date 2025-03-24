import { ETransportCommand } from "../enum/ETransportCommand";
import { TransportCommands } from "./TransportCommands";
import { publishData } from "../constants";
export interface IDecode {
    commands: Record<ETransportCommand, string | string[] | boolean>;
    payload: ArrayBuffer;
    getCommand(command: ETransportCommand): string | string[] | boolean | undefined;
}
export interface INqlTransport {
    encode(TransportCommands: TransportCommands, payload: Uint8Array): Uint8Array;
    decode(data: Uint8Array): IDecode;
}
export declare class NqlTransport {
    static parseData(data: publishData | undefined): ArrayBuffer | undefined;
    static encode(TransportCommands: TransportCommands, data?: publishData | undefined): ArrayBuffer;
    static decode(transport: ArrayBuffer): IDecode;
    static hasSeparatorIndexes(commandAction: number[]): boolean;
    static commandActionUint8ArrayToString(commandActionArray: number[]): string;
    static commandActionUint8ArrayToStringArray(commandActionArray: number[]): string[];
    static extractCommands(commands: Uint8Array): Record<ETransportCommand, string | string[] | boolean>;
}
//# sourceMappingURL=transport.d.ts.map