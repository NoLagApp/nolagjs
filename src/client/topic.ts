import { TData } from "../shared/constants";
import { EAction, ESeparator } from "../shared/enum";
import { INqlIdentifiers, IResponse } from "../shared/interfaces";
import {
  arrayOfString,
  generateTransport,
  nqlPayload,
  topicPayload,
  toRecordSeparator,
  toTransportSeparator,
} from "../shared/utils/transport";
import { NoLagClient } from "./NoLagClient";

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
   * Trigger the reconnect procedure
   */
  reSubscribe(): void;
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
    const topicName = topicPayload(this.topicName);
    const nql = nqlPayload(arrayOfString(identifiers), EAction.Add);

    const records = toRecordSeparator([topicName, nql]);

    if (this.connection) {
      this.connection.send(records.buffer);
    }
  }

  public reSubscribe() {
    this.addIdentifiers({
      OR: this.identifiers,
    });
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

  public addIdentifiers(identifiers: INqlIdentifiers): Topic {
    this.saveIdentifiers(identifiers.OR ?? []);
    const topicName = topicPayload(this.topicName);
    const nql = nqlPayload(arrayOfString(identifiers.OR), EAction.Add);

    const records = toRecordSeparator([topicName, nql]);

    if (this.connection) {
      this.connection.send(records.buffer);
    }

    return this;
  }

  public removeIdentifiers(identifiers: string[]): Topic {
    this.deleteSavedIdentifiers(identifiers ?? []);

    const topicName = topicPayload(this.topicName);
    const nql = nqlPayload(arrayOfString(identifiers), EAction.Delete);

    const records = toRecordSeparator([topicName, nql]);

    if (this.connection) {
      this.connection.send(records.buffer);
    }

    return this;
  }

  unsubscribe(): boolean {
    const topicName = topicPayload(this.topicName, EAction.Delete);
    const nql = nqlPayload(new Uint8Array(0));

    const records = toRecordSeparator([topicName, nql]);

    if (this.connection) {
      this.connection.send(records.buffer);
    }
    return true;
  }

  public publish(data: ArrayBuffer, identifiers: string[]): Topic {
    const transport = generateTransport(data, this.topicName, identifiers);

    if (this.connection) {
      this.connection.send(transport);
    }

    return this;
  }
}
