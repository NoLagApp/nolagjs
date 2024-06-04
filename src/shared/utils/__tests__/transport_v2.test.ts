import {
  ETransportCommand,
  ETransportCommandSeparator,
} from "../../../shared/enum/ETransportCommand";
import { stringToArrayBuffer } from "../Encodings";
import { transportCommands } from "../TransportCommands";
import { NqlTransport } from "../transport_v2";

// Topic-name
export const topicNameString = "Topic-name";
export const topicName = [84, 111, 112, 105, 99, 45, 110, 97, 109, 101];

// 1234567890
export const tokenIdString = "1234567890";
export const tokenId = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48];

// identifierOne
export const identifierOneString = "identifierOne";
export const identifierOne = [
  105, 100, 101, 110, 116, 105, 102, 105, 101, 114, 79, 110, 101,
];

// identifierTwo
export const identifierTwoString = "identifierTwo";
export const identifierTwo = [
  105, 100, 101, 110, 116, 105, 102, 105, 101, 114, 84, 119, 111,
];

export const authenticate = [ETransportCommand.Authenticate, ...tokenId];

export const reconnect = [
  ETransportCommand.Authenticate,
  ...tokenId,
  ETransportCommand.Reconnect,
];

export const subscribeToTopicOnly = [
  ETransportCommand.Topic,
  ...topicName,
  ETransportCommand.AddAction,
];

export const subscribeToTopicAndIdentifiers = [
  ETransportCommand.Topic,
  ...topicName,
  ETransportCommand.Identifier,
  ...identifierOne,
  ETransportCommandSeparator.ArraySeparator,
  ...identifierTwo,
  ETransportCommand.AddAction,
];

export const unSubscribeToTopicOnly = [
  ETransportCommand.Topic,
  ...topicName,
  ETransportCommand.DeleteAction,
];

export const unSubscribeToTopicIdentifiers = [
  ETransportCommand.Topic,
  ...topicName,
  ETransportCommand.Identifier,
  ...identifierOne,
  ETransportCommandSeparator.ArraySeparator,
  ...identifierTwo,
  ETransportCommand.DeleteAction,
];

export const payloadString = "Data to be sent";
export const payload = stringToArrayBuffer(payloadString);

export const publishPayload = [
  ETransportCommand.Topic,
  ...topicName,
  ETransportCommand.Identifier,
  ...identifierOne,
  ETransportCommandSeparator.ArraySeparator,
  ...identifierTwo,
  ETransportCommand.Payload,
  ...Array.from(new Uint8Array(payload)),
];

describe("Transport", () => {
  test("Authenticate Command", () => {
    const commands = transportCommands().setCommand(
      ETransportCommand.Authenticate,
      tokenIdString,
    );

    const encodedBuffer = NqlTransport.encode(commands);
    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(authenticate);
  });

  test("Reconnect Command", () => {
    const commands = transportCommands()
      .setCommand(ETransportCommand.Authenticate, tokenIdString)
      .setCommand(ETransportCommand.Reconnect);

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(reconnect);
  });

  test("Subscribe to Topic Command", () => {
    const commands = transportCommands()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.AddAction);

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(
      subscribeToTopicOnly,
    );
  });

  test("Subscribe to Topic and Identifiers Command", () => {
    const commands = transportCommands()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.Identifier, [
        identifierOneString,
        identifierTwoString,
      ])
      .setCommand(ETransportCommand.AddAction);

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(
      subscribeToTopicAndIdentifiers,
    );
  });

  test("Unsubscribe to Topic only", () => {
    const commands = transportCommands()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.DeleteAction);

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(
      unSubscribeToTopicOnly,
    );
  });

  test("Unsubscribe to Topic Identifiers", () => {
    const commands = transportCommands()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.Identifier, [
        identifierOneString,
        identifierTwoString,
      ])
      .setCommand(ETransportCommand.DeleteAction);

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(
      unSubscribeToTopicIdentifiers,
    );
  });

  test("Publish to Topic Identifiers", () => {
    const commands = transportCommands()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.Identifier, [
        identifierOneString,
        identifierTwoString,
      ]);

    const encodedBuffer = NqlTransport.encode(commands, payload);
    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(publishPayload);
  });

  test("Decode transport", () => {
    const commands = transportCommands()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.Identifier, [
        identifierOneString,
        identifierTwoString,
      ]);

    const encodedBuffer = NqlTransport.encode(commands, payload);
    const decoded = NqlTransport.decode(encodedBuffer);

    expect(decoded.commands).toEqual({
      [ETransportCommand.Topic]: topicNameString,
      [ETransportCommand.Identifier]: [
        identifierOneString,
        identifierTwoString,
      ],
    });
  });
});
