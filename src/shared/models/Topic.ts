import { NoLagClient } from "../../client/NoLagClient";
import { ETransportCommand } from "../enum/ETransportCommand";
import { INqlIdentifiers, ITransport } from "../interfaces";
import {
  TransportCommands,
  transportCommands,
} from "../utils/TransportCommands";
import { NqlTransport } from "../utils/transport";
import { Tunnel } from "../../client";
import { AcknowledgeQueueManager } from "../utils/AcknowledgeQueue/AcknowledgeQueueManager";
import { AcknowledgeQueueIdentifier } from "../utils/AcknowledgeQueue/AcknowledgeQueueIdentifier";
import { ESendAction } from "../enum";
import { publishData } from "../constants";

export interface ITopic {
  subscribe(
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): ITopic;
  /**
   * Add NQL identifers to the Topic
   * @param identifiers
   * @param callbackFn
   */
  addIdentifiers(
    identifiers: INqlIdentifiers,
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): ITopic;
  /**
   * Remove saved NQL identifiers
   * @param identifiers
   * @param callbackFn
   */
  removeIdentifiers(
    identifiers: string[],
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): ITopic;
  /**
   * Unsubscribe from current Topic. You will not receive messages from this
   * Topic in the future
   */
  unsubscribe(
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): boolean;
  /**
   * Fire callback function after any data send to the Topic from the Message Broker with matching NQL identifiers
   * is onReceive
   * @param callbackFn
   */
  onReceive(callbackFn: ((transport: ITransport) => void) | undefined): Topic;
  /**
   * Publish topic data with optional attached identifiers
   * @param data Data being sent is an ArrayBuffer
   * @param identifiers List of identifiers used to send targeted messages
   * @returns
   */
  publish(data: publishData, identifiers?: string[]): Topic;
  /**
   * PRIVATE Inject messages into the Topic instance
   * @param transport
   */
  _onReceiveMessage(transport: ITransport): Topic;
  /**
   * Set presence data on this topic. Presence data could be anything that identifies this device.
   * Updated list of shared data is shared with all devices subscribed to the same Topic and Identifiers when a devices
   * connect and disconnects.
   * @param presence
   * @param callbackFn
   * @returns
   */
  setPresence(
    presence: string,
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): ITopic;

  /**
   * Tunnel attached to Topic
   */
  tunnel(): Tunnel;
}

export interface ICallbackQueue {
  topicName: string;
  identifiers: string[];
  callbackFn: (error: Error, transport: ITransport) => void;
}

export class Topic implements ITopic {
  private connection: NoLagClient | undefined;
  private readonly topicName: string;
  private onReceiveCallback: ((transport: ITransport) => void) | undefined;
  private identifiers: string[] = [];
  private presence: string | undefined;
  private acknowledgeQueueManager: AcknowledgeQueueManager;
  private _tunnel: Tunnel;

  constructor(
    tunnel: Tunnel,
    connection: NoLagClient,
    topicName: string,
    identifiers: INqlIdentifiers,
    acknowledgeQueueManager: AcknowledgeQueueManager,
  ) {
    this._tunnel = tunnel;
    this.acknowledgeQueueManager = acknowledgeQueueManager;
    this.setConnection(connection);
    this.topicName = topicName;
    this.saveIdentifiers(identifiers?.OR ?? []);
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

  private async _subscribeAction(
    sendAction: ESendAction,
    commands: TransportCommands,
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): Promise<void> {
    const transport = NqlTransport.encode(commands);

    this.send(sendAction, transport);

    await this.acknowledgeQueueManager.addToSentQueue(
      new AcknowledgeQueueIdentifier({
        presence: this.presence ? this.presence : undefined,
        topicName: this.topicName,
        identifiers: this.identifiers,
      }),
      callbackFn,
    );
  }

  tunnel(): Tunnel {
    return this._tunnel;
  }

  public subscribe(
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): ITopic {
    if (!this.topicName) {
      const error = new Error("Topic name is required");
      if (callbackFn) {
        callbackFn(error, null);
      } else {
        throw error;
      }
    }

    const commands = transportCommands().setCommand(
      ETransportCommand.Topic,
      this.topicName,
    );

    if (this.identifiers?.length && this.identifiers.length > 0) {
      commands.setCommand(ETransportCommand.Identifier, this.identifiers);
    }

    commands.setCommand(ETransportCommand.AddAction);

    this._subscribeAction(
      ESendAction.TopicSubscribe,
      commands,
      callbackFn,
    );

    return this as unknown as ITopic;
  }

  public setPresence(
    presence: string,
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): ITopic {
    const topicInstance = this;
    topicInstance.presence = presence;

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

    this._subscribeAction(
      ESendAction.TopicPresence,
      commands,
      callbackFn,
    );
    return this;
  }

  public setConnection(connection: NoLagClient): Topic {
    this.connection = connection;
    return this;
  }

  public _onReceiveMessage(transport: ITransport): Topic {
    if (this.onReceiveCallback) {
      this.onReceiveCallback(transport);
    }
    return this;
  }

  public onReceive(
    callbackFn: ((transport: ITransport) => void) | undefined,
  ): Topic {
    this.onReceiveCallback = callbackFn;
    return this;
  }

  public addIdentifiers(
    identifiersList: INqlIdentifiers,
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): ITopic {
    if (!identifiersList?.OR?.length || identifiersList?.OR?.length === 0) {
      const error = new Error("Identifiers are required.");
      if (callbackFn) {
        callbackFn(error, null);
      } else {
        throw error;
      }
    }

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

    this.send(ESendAction.TopicAddIdentifier, transport);

    this.acknowledgeQueueManager.addToSentQueue(
      new AcknowledgeQueueIdentifier({
        topicName: this.topicName,
        identifiers: this.identifiers,
      }),
      callbackFn,
    );

    return this as unknown as ITopic;
  }

  public removeIdentifiers(
    identifiers: string[],
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): ITopic {
    if (!identifiers?.length || identifiers?.length === 0) {
      const error = new Error("Identifiers are required.");
      if (callbackFn) {
        callbackFn(error, null);
      } else {
        throw error;
      }
    }

    this.deleteSavedIdentifiers(identifiers ?? []);

    const commands = transportCommands().setCommand(
      ETransportCommand.Topic,
      this.topicName,
    );

    commands.setCommand(ETransportCommand.Identifier, identifiers);

    commands.setCommand(ETransportCommand.DeleteAction);

    const transport = NqlTransport.encode(commands);

    this.send(ESendAction.TopicRemoveIdentifier, transport);

    this.acknowledgeQueueManager.addToSentQueue(
      new AcknowledgeQueueIdentifier({
        topicName: this.topicName,
        identifiers: this.identifiers,
      }),
      callbackFn,
    );

    return this as unknown as ITopic;
  }

  public unsubscribe(
    callbackFn?: (error: Error | null, transport: ITransport | null) => void,
  ): boolean {
    const commands = transportCommands()
      .setCommand(ETransportCommand.Topic, this.topicName)
      .setCommand(ETransportCommand.DeleteAction);

    const transport = NqlTransport.encode(commands);

    this.send(ESendAction.TopicUnsubscribe, transport);

    this.acknowledgeQueueManager.addToSentQueue(
      new AcknowledgeQueueIdentifier({
        topicName: this.topicName,
        identifiers: this.identifiers,
      }),
      callbackFn,
    );

    return true;
  }

  public publish(data: publishData, identifiers?: string[]): Topic {
    const commands = transportCommands().setCommand(
      ETransportCommand.Topic,
      this.topicName,
    );

    if (identifiers && identifiers?.length > 0) {
      commands.setCommand(ETransportCommand.Identifier, identifiers);
    }

    const transport = NqlTransport.encode(commands, data);

    this.send(ESendAction.TopicPublish, transport);

    return this;
  }

  private send(sendAction: ESendAction, transport: ArrayBuffer) {
    if (this.connection) {
      this.connection.send(sendAction, transport);
    }
  }
}
