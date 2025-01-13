import { NoLagClient } from "../../client/NoLagClient";
import { ETransportCommand } from "../enum/ETransportCommand";
import { INqlIdentifiers, ITransport } from "../interfaces";
import { transportCommands } from "../utils/TransportCommands";
import { NqlTransport } from "../utils/transport";

export interface ITopic {
  /**
   * Add NQL identifers to the Topic
   * @param INqlIdentifiers identifiers - List of reverse NQL query items
   */
  addIdentifiers(identifiers: INqlIdentifiers): Topic;
  /**
   * Remove saved NQL identifiers
   * @param INqlIdentifiers identifiers - List of reverse NQL query items
   */
  removeIdentifiers(identifiers: string[]): Topic;
  /**
   * Unsubscribe from current Topic. You will not onReceive messages from this
   * Topic in the future
   */
  unsubscribe(): boolean;
  /**
   * Fire callback function after any data send to the Topic from the Message Broker with matching NQL identifiers
   * is onReceive
   * @param ITransport data - Received data published by another device
   */
  onReceive(callbackFn: ((data: ITransport) => void) | undefined): Topic;
  /**
   * Publish topic data with optional attached identifiers
   * @param data Data being sent is an ArrayBuffer
   * @param identifiers List of identifiers used to send targeted messages
   * @returns
   */
  publish(data: ArrayBuffer, identifiers: string[]): Topic;
  /**
   * PRIVATE Inject messages into the Topic instance
   * @param data
   */
  _onReceiveMessage(data: ITransport): ITopic;
  /**
   * Set presence data on this topic. Presence data could be anything that identifies this device.
   * Updated list of shared data is shared with all devices subscribed to the same Topic and Identifiers when a devices
   * connect and disconnects.
   * @param presence
   * @returns
   */
  setPresence(presence: string): Topic;
}

export class Topic implements ITopic {
  private connection: NoLagClient | undefined;
  private readonly topicName: string;
  private onReceiveCallback: ((data: ITransport) => void) | undefined;
  private identifiers: string[] = [];
  private presence: string | undefined;
  constructor(
    connection: NoLagClient,
    topicName: string,
    identifiers: INqlIdentifiers,
  ) {
    this.setConnection(connection);
    this.topicName = topicName;
    this.saveIdentifiers(identifiers?.OR ?? []);
    this.subscribe();
  }

  private findSavedIdentifier(identifier: string) {
    const key = Object.keys(identifier)[0] ?? "";
    const value = Object.values(identifier)[0] ?? "";
    return this.identifiers.find((s) => {
      if (s) {
        const findKey = Object.keys(s)[0] ?? "";
        const findValue = Object.values(s)[0] ?? "";
        return key === findKey && value === findValue;
      }
    });
  }

  private saveIdentifiers(identifiers: string[]): void {
    if (!Array.isArray(identifiers)) return;

    identifiers.map((identifier: string) => {
      const foundIdentifier = this.identifiers.find((s) => s === identifier);
      if (!foundIdentifier) {
        this.identifiers.push(identifier);
      }
    });
  }

  private deleteSavedIdentifiers(identifiers: string[]): void {
    const identifierList: string[] = [];
    identifiers.map((identifier: string) => {
      const foundIdentifier = this.identifiers.find((s) => s === identifier);
      if (foundIdentifier) {
        identifierList.push(identifier);
      }
    });

    this.identifiers = identifierList;
  }

  private subscribe() {
    if (
      (!this.topicName && this.identifiers?.length === 0) ||
      !Array.isArray(this.identifiers)
    )
      return this;

    const commands = transportCommands().setCommand(
      ETransportCommand.Topic,
      this.topicName,
    );

    if (this.identifiers.length > 0) {
      commands.setCommand(ETransportCommand.Identifier, this.identifiers);
    }

    if (this.presence) {
      commands.setCommand(ETransportCommand.Presence, this.presence);
    }

    commands.setCommand(ETransportCommand.AddAction);

    const transport = NqlTransport.encode(commands);

    this.send(transport);
  }

  public setPresence(presence: string): Topic {
    this.presence = presence;

    this.subscribe();
    return this;
  }

  public setConnection(connection: NoLagClient): Topic {
    this.connection = connection;
    return this;
  }

  public _onReceiveMessage(data: ITransport): ITopic {
    if (this.onReceiveCallback) {
      this.onReceiveCallback(data);
    }
    return this;
  }

  public onReceive(
    callbackFn: ((data: ITransport) => void) | undefined,
  ): Topic {
    this.onReceiveCallback = callbackFn;
    return this;
  }

  public addIdentifiers(identifiersList: INqlIdentifiers): Topic {
    if (!identifiersList?.OR?.length || identifiersList?.OR?.length === 0)
      return this;

    const identifiers = identifiersList?.OR ?? [];
    this.saveIdentifiers(identifiers);
    const commands = transportCommands().setCommand(
      ETransportCommand.Topic,
      this.topicName,
    );

    if (identifiers.length > 0) {
      commands.setCommand(ETransportCommand.Identifier, identifiers);
    }

    commands.setCommand(ETransportCommand.AddAction);

    const transport = NqlTransport.encode(commands);

    this.send(transport);

    return this;
  }

  public removeIdentifiers(identifiers: string[]): Topic {
    if (identifiers.length === 0) return this;

    this.deleteSavedIdentifiers(identifiers ?? []);

    const commands = transportCommands().setCommand(
      ETransportCommand.Topic,
      this.topicName,
    );

    commands.setCommand(ETransportCommand.Identifier, identifiers);

    commands.setCommand(ETransportCommand.DeleteAction);

    const transport = NqlTransport.encode(commands);

    this.send(transport);

    return this;
  }

  unsubscribe(): boolean {
    const commands = transportCommands()
      .setCommand(ETransportCommand.Topic, this.topicName)
      .setCommand(ETransportCommand.DeleteAction);

    const transport = NqlTransport.encode(commands);

    this.send(transport);
    return true;
  }

  public publish(data: ArrayBuffer, identifiers: string[]): Topic {
    if (data.byteLength === 0) return this;

    const commands = transportCommands().setCommand(
      ETransportCommand.Topic,
      this.topicName,
    );

    if (identifiers?.length > 0) {
      commands.setCommand(ETransportCommand.Identifier, identifiers);
    }

    const transport = NqlTransport.encode(commands, data);

    this.send(transport);

    return this;
  }

  private send(transport: ArrayBuffer) {
    if (this.connection) {
      this.connection.send(transport);
    }
  }
}
