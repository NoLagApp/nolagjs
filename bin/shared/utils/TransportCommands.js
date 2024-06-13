"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transportCommands = exports.TransportCommands = void 0;
const ETransportCommand_1 = require("../enum/ETransportCommand");
const Encodings_1 = require("./Encodings");
class TransportCommands {
    constructor() {
        this.commandArray = [];
    }
    /**
     * Sets a command and optional command action. The command and command action are added to the commands buffer.
     *
     * @param {ETransportCommand} command - The command to be set.
     * @param {string} [commandAction] - The optional command action to be set.
     * @return {this} Returns the current instance of the Commands class.
     */
    setCommand(command, commandAction) {
        if (!command)
            return this;
        this.commandArray.push(command);
        let commandActionArray = [];
        if (!commandAction)
            return this;
        if (Array.isArray(commandAction)) {
            commandActionArray = this.convertArray(commandAction);
        }
        else if (typeof commandAction === "string") {
            commandActionArray = this.convertStringNumberArray(commandAction);
        }
        this.commandArray = [...this.commandArray, ...commandActionArray];
        return this;
    }
    convertStringNumberArray(commandAction) {
        const commandActionBuffer = (0, Encodings_1.stringToArrayBuffer)(commandAction);
        return Array.from(new Uint8Array(commandActionBuffer));
    }
    convertArray(commandActions) {
        const commandActionsUint8 = commandActions.map((action) => {
            return this.convertStringNumberArray(action);
        });
        const commandActionsUint8Array = commandActionsUint8
            .map((action) => {
            // inject array separator
            action.push(ETransportCommand_1.ETransportCommandSeparator.ArraySeparator);
            return action;
        })
            // flatten the array, we don't need the nested arrays
            .flat();
        // we need to remove the last array separator, we don't need it
        commandActionsUint8Array.pop();
        return commandActionsUint8Array;
    }
    /**
     * Builds the commands buffer into a Uint8Array.
     *
     * @return {Uint8Array} The Uint8Array representation of the commands buffer.
     */
    build() {
        return new Uint8Array(this.commandArray);
    }
}
exports.TransportCommands = TransportCommands;
const transportCommands = () => new TransportCommands();
exports.transportCommands = transportCommands;
//# sourceMappingURL=TransportCommands.js.map