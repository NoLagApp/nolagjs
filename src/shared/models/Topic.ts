import { NoLagClient } from "../../client/NoLagClient";
import { TData } from "../constants";
import { ETransportCommand } from "../enum/ETransportCommand";
import { INqlIdentifiers, IResponse } from "../interfaces";
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
   * @param IResponse data - Received data published by another device
   */
  onReceive(callbackFn: ((data: IResponse) => void) | undefined): Topic;
  /**
   * Publish topic data with optional attached identifiers
   * @param ArrayBuffer data - Data being sent is an ArrayBuffer
   * @param string[] identifiers - List of identifiers used to send targeted messages
   * @returns
   */
  publish(data: TData, identifiers: string[]): Topic;
  /**
   * PRIVATE Inject messages into the Topic instance
   * @param data
   */
  _onReceiveMessage(data: IResponse): ITopic;
}

export class Topic implements ITopic {
  private connection: NoLagClient | undefined;
  private topicName: string;
  private callbackFn: ((data: IResponse) => void) | undefined;
  private identifiers: string[] = [];
  constructor(
    connection: NoLagClient,
    topicName: string,
    identifiers: INqlIdentifiers,
  ) {
    this.setConnection(connection);
    this.topicName = topicName;
    this.saveIdentifiers(identifiers?.OR ?? []);
    this.subscribe(identifiers?.OR ?? []);
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
    identifiers.map((identifier: string) => {
      const findSavedIdentifier = this.findSavedIdentifier(identifier);
      if (!findSavedIdentifier) {
        this.identifiers.push(identifier);
      }
    });
  }

  private deleteSavedIdentifiers(identifiers: string[]): void {
    const identifierList: string[] = [];
    identifiers.map((identifier: string) => {
      const findSavedIdentifier = this.findSavedIdentifier(identifier);
      if (!findSavedIdentifier) {
      } else {
        identifierList.push(identifier);
      }
    });

    this.identifiers = identifierList;
  }

  private subscribe(identifiers: string[]) {
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
  }

  public setConnection(connection: NoLagClient): Topic {
    this.connection = connection;
    return this;
  }

  public _onReceiveMessage(data: IResponse): ITopic {
    if (this.callbackFn) {
      this.callbackFn(data);
    }
    return this;
  }

  public onReceive(callbackFn: ((data: IResponse) => void) | undefined): Topic {
    this.callbackFn = callbackFn;
    return this;
  }

  public addIdentifiers(identifiersList: INqlIdentifiers): Topic {
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
    this.deleteSavedIdentifiers(identifiers ?? []);

    const commands = transportCommands().setCommand(
      ETransportCommand.Topic,
      this.topicName,
    );

    if (identifiers.length > 0) {
      commands.setCommand(ETransportCommand.Identifier, identifiers);
    }

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
