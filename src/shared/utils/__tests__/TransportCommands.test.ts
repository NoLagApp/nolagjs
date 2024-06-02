import { ETransportCommand } from "../../enum/ETransportCommand";
import { transportCommands } from "../TransportCommands";

describe("Commands", () => {
  test("Build command sequence", () => {
    const uint8View = transportCommands()
      .setCommand(ETransportCommand.Topic, "topicOne")
      .setCommand(ETransportCommand.Identifier, "identifierOne")
      .setCommand(ETransportCommand.Identifier, "IdentifierTwo")
      .setCommand(ETransportCommand.AddAction)
      .build();

    expect(uint8View.byteLength).toEqual(38);
  });
});
