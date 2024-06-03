import { ETransportCommand } from "../../enum/ETransportCommand";
import { transportCommands } from "../TransportCommands";
import {
  identifierOneString,
  identifierTwoString,
  subscribeToTopicAndIdentifiers,
  topicNameString,
} from "./transport_v2.test";

describe("Commands", () => {
  test("Build command sequence", () => {
    const uint8View = transportCommands()
      .setCommand(ETransportCommand.Topic, topicNameString)
      .setCommand(ETransportCommand.Identifier, [
        identifierOneString,
        identifierTwoString,
      ])
      .setCommand(ETransportCommand.AddAction)
      .build();

    expect(Array.from(new Uint8Array(uint8View))).toEqual(
      subscribeToTopicAndIdentifiers,
    );
  });
});
