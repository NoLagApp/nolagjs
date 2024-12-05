import { AxiosInstance, AxiosStatic } from "axios";
import { ETransportCommand } from "../../../shared/enum/ETransportCommand";
import { IConnectOptions } from "../../../shared/interfaces";
import { transportCommands } from "../../../shared/utils/TransportCommands";
import { NqlTransport } from "../../../shared/utils/transport";

const routeNamespace = "publish";

export const TunnelPublish = async (
  data: ArrayBuffer,
  topicName: string,
  identifiers: string[],
  tunnelId: string,
  parentRouteNamespace: string,
  request: AxiosInstance,
  connectOptions: IConnectOptions,
): Promise<boolean> => {
  const commands = transportCommands()
    .setCommand(ETransportCommand.Topic, topicName)
    .setCommand(ETransportCommand.Identifier, identifiers)
    .setCommand(ETransportCommand.AddAction);

  const encodedBuffer = NqlTransport.encode(commands, data);

  await request.request({
    baseURL: `${connectOptions?.protocol}://${connectOptions?.wsHost}`,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": connectOptions?.apiKey,
    },
    url: `/${parentRouteNamespace}/${tunnelId}/${routeNamespace}`,
    method: "post",
    data: encodedBuffer,
  });

  return true;
};
