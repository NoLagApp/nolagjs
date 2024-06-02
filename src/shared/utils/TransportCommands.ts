import { ETransportCommand } from "../enum/ETransportCommand";
import { stringToArrayBuffer } from "./Encodings";

export interface ITransportCommands {
  /**
   * Set command and optional command action.
   * We will build there out into a command array.
   * @param command
   * @param commandAction
   */
  setCommand(
    command: ETransportCommand,
    commandAction?: string,
  ): ITransportCommands;
  /**
   * Builds the command array into a command buffer.
   */
  build(): ArrayBuffer;
}

export class TransportCommands {
  private commandsBuffer: number[] = [];

  /**
   * Sets a command and optional command action. The command and command action are added to the commands buffer.
   *
   * @param {ETransportCommand} command - The command to be set.
   * @param {string} [commandAction] - The optional command action to be set.
   * @return {this} Returns the current instance of the Commands class.
   */
  setCommand(command: ETransportCommand, commandAction?: string) {
    if (!command) return this;
    this.commandsBuffer.push(command);

    if (!commandAction) return this;

    const commandActionBuffer = stringToArrayBuffer(commandAction);
    const commandActionArray = Array.from(new Uint8Array(commandActionBuffer));

    this.commandsBuffer = [...this.commandsBuffer, ...commandActionArray];

    return this;
  }

  /**
   * Builds the commands buffer into a Uint8Array.
   *
   * @return {Uint8Array} The Uint8Array representation of the commands buffer.
   */
  build(): Uint8Array {
    return new Uint8Array(this.commandsBuffer);
  }
}

export const transportCommands = () => new TransportCommands();
