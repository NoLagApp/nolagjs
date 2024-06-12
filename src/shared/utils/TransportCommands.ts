import {
  ETransportCommand,
  ETransportCommandSeparator,
} from "../enum/ETransportCommand";
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
  private commandArray: number[] = [];

  /**
   * Sets a command and optional command action. The command and command action are added to the commands buffer.
   *
   * @param {ETransportCommand} command - The command to be set.
   * @param {string} [commandAction] - The optional command action to be set.
   * @return {this} Returns the current instance of the Commands class.
   */
  setCommand(command: ETransportCommand, commandAction?: string | string[]) {
    if (!command) return this;
    this.commandArray.push(command);
    let commandActionArray: number[] = [];
    if (!commandAction) return this;

    if (Array.isArray(commandAction)) {
      commandActionArray = this.convertArray(commandAction);
    } else if (typeof commandAction === "string") {
      commandActionArray = this.convertStringNumberArray(commandAction);
    }

    this.commandArray = [...this.commandArray, ...commandActionArray];
    return this;
  }

  convertStringNumberArray(commandAction: string) {
    const commandActionBuffer = stringToArrayBuffer(commandAction);
    return Array.from(new Uint8Array(commandActionBuffer));
  }

  convertArray(commandActions: string[]): number[] {
    const commandActionsUint8 = commandActions.map((action) => {
      return this.convertStringNumberArray(action);
    });

    const commandActionsUint8Array = commandActionsUint8
      .map((action) => {
        // inject array separator
        action.push(ETransportCommandSeparator.ArraySeparator);
        return action;
      })
      // flatten the array, we don't need the nested arrays
      .flat();

    return commandActionsUint8Array;
  }

  /**
   * Builds the commands buffer into a Uint8Array.
   *
   * @return {Uint8Array} The Uint8Array representation of the commands buffer.
   */
  build(): Uint8Array {
    return new Uint8Array(this.commandArray);
  }
}

export const transportCommands = () => new TransportCommands();
