import { ETransportCommand } from "../../../shared/enum/ETransportCommand";
import { IConnectOptions, IRequestParams } from "../../../shared/interfaces";
import { transportCommands } from "../../../shared/utils/TransportCommands";
import { NqlTransport } from "../../../shared/utils";

const routeNamespace = "publish";

export const TunnelPublish = async (
  data: ArrayBuffer,
  topicName: string,
  identifiers: string[],
  tunnelId: string,
  parentRouteNamespace: string,
  requestParams: IRequestParams,
  connectOptions: IConnectOptions,
): Promise<boolean> => {
  const commands = transportCommands()
    .setCommand(ETransportCommand.Topic, topicName)
    .setCommand(ETransportCommand.Identifier, identifiers)
    .setCommand(ETransportCommand.AddAction);

  const encodedBuffer = NqlTransport.encode(commands, data);

  const baseUrl = `${connectOptions?.protocol}://${connectOptions?.wsHost}`;

  await fetch(
    `${baseUrl}/${parentRouteNamespace}/${tunnelId}/${routeNamespace}`,
    {
      headers: requestParams.headers,
      method: "POST",
      body: encodedBuffer,
    },
  );

  return true;
};
