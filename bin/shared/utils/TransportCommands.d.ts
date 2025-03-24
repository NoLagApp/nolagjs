import { ETransportCommand } from "../enum/ETransportCommand";
export interface ITransportCommands {
    /**
     * Set command and optional command action.
     * We will build there out into a command array.
     * @param command
     * @param commandAction
     */
    setCommand(command: ETransportCommand, commandAction?: string): ITransportCommands;
    /**
     * Builds the command array into a command buffer.
     */
    build(): ArrayBuffer;
}
export declare class TransportCommands {
    private commandArray;
    /**
     * Sets a command and optional command action. The command and command action are added to the commands buffer.
     *
     * @param {ETransportCommand} command - The command to be set.
     * @param {string} [commandAction] - The optional command action to be set.
     * @return {this} Returns the current instance of the Commands class.
     */
    setCommand(command: ETransportCommand, commandAction?: string | string[]): this;
    convertStringNumberArray(commandAction: string): number[];
    convertArray(commandActions: string[]): number[];
    /**
     * Builds the commands buffer into a Uint8Array.
     *
     * @return {Uint8Array} The Uint8Array representation of the commands buffer.
     */
    build(): Uint8Array;
}
export declare const transportCommands: () => TransportCommands;
//# sourceMappingURL=TransportCommands.d.ts.map