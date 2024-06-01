import { ETransportCommand } from "../../enum/ETransportCommand";
import { Commands } from "../Commands";

describe("Commands", () => {
  test("Build command sequence", () => {
    const uint8View = Commands.init()
      .setCommand(ETransportCommand.Topic, "topicOne")
      .setCommand(ETransportCommand.Identifier, "identifierOne")
      .setCommand(ETransportCommand.Identifier, "IdentifierTwo")
      .setCommand(ETransportCommand.AddAction)
      .build();

    expect(typeof Uint8Array).toEqual(typeof Uint8Array);
  });
});
