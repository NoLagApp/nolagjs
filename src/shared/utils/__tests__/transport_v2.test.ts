import { ETransportCommand } from "../../../shared/enum/ETransportCommand";
import { Commands } from "../Commands";
import { stringToArrayBuffer } from "../Encodings";
import { NqlTransport } from "../transport_v2";

describe("Transport", () => {
  // Topic-name
  const topicNameString = "Topic-name";
  const topicName = [84, 111, 112, 105, 99, 45, 110, 97, 109, 101];

  // 1234567890
  const tokenIdString = "1234567890";
  const tokenId = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48];

  // identifierOne
  const identifierOneString = "identifierOne";
  const identifierOne = [
    105, 100, 101, 110, 116, 105, 102, 105, 101, 114, 79, 110, 101,
  ];

  // identifierTwo
  const identifierTwoString = "identifierTwo";
  const identifierTwo = [
    105, 100, 101, 110, 116, 105, 102, 105, 101, 114, 84, 119, 111,
  ];

  const authenticate = [ETransportCommand.Authenticate, ...tokenId];

  const reconnect = [
    ETransportCommand.Authenticate,
    ...tokenId,
    ETransportCommand.Reconnect,
  ];

  const subscribeToTopicOnly = [
    ETransportCommand.Topic,
    ...topicName,
    ETransportCommand.AddAction,
  ];

  const subscribeToTopicAndIdentifiers = [
    ETransportCommand.Topic,
    ...topicName,
    ETransportCommand.Identifier,
    ...identifierOne,
    ETransportCommand.Identifier,
    ...identifierTwo,
    ETransportCommand.AddAction,
  ];

  const unSubscribeToTopicOnly = [
    ETransportCommand.Topic,
    ...topicName,
    ETransportCommand.DeleteAction,
  ];

  const unSubscribeToTopicIdentifiers = [
    ETransportCommand.Topic,
    ...topicName,
    ETransportCommand.Identifier,
    ...identifierOne,
    ETransportCommand.Identifier,
    ...identifierTwo,
    ETransportCommand.DeleteAction,
  ];

  const payloadString = "Data to be sent";

  const payload = stringToArrayBuffer(payloadString);

  const publishPayload = [
    ETransportCommand.Topic,
    ...topicName,
    ETransportCommand.Identifier,
    ...identifierOne,
    ETransportCommand.Identifier,
    ...identifierTwo,
    ...Array.from(new Uint8Array(payload)),
  ];

  test("Authenticate Command", () => {
    const commands = Commands.init().setCommand(
      ETransportCommand.Authenticate,
      tokenIdString,
    );

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(authenticate);
  });

  test("Reconnect Command", () => {
    const commands = Commands.init()
      .setCommand(ETransportCommand.Authenticate, tokenIdString)
      .setCommand(ETransportCommand.Reconnect);

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(reconnect);
  });

  test("Subscribe to Topic Command", () => {
    const commands = Commands.init()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.AddAction);

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(
      subscribeToTopicOnly,
    );
  });

  test("Subscribe to Topic and Identifiers Command", () => {
    const commands = Commands.init()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.Identifier, identifierOneString)
      .setCommand(ETransportCommand.Identifier, identifierTwoString)
      .setCommand(ETransportCommand.AddAction);

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(
      subscribeToTopicAndIdentifiers,
    );
  });

  test("Unsubscribe to Topic only", () => {
    const commands = Commands.init()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.DeleteAction);

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(
      unSubscribeToTopicOnly,
    );
  });

  test("Unsubscribe to Topic Identifiers", () => {
    const commands = Commands.init()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.Identifier, identifierOneString)
      .setCommand(ETransportCommand.Identifier, identifierTwoString)
      .setCommand(ETransportCommand.DeleteAction);

    const encodedBuffer = NqlTransport.encode(commands);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(
      unSubscribeToTopicIdentifiers,
    );
  });

  test("Publish to Topic Identifiers", () => {
    const commands = Commands.init()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.Identifier, identifierOneString)
      .setCommand(ETransportCommand.Identifier, identifierTwoString);

    const encodedBuffer = NqlTransport.encode(commands, payload);

    expect(Array.from(new Uint8Array(encodedBuffer))).toEqual(publishPayload);
  });
});
