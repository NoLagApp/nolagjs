import { AxiosInstance } from "axios";
import { TData } from "../../../shared/constants";
import { IConnectOptions } from "../../../shared/interfaces";
import { generateTransport } from "../../../shared/utils/transport";

const routeNamespace = "publish";

export const TunnelPublish = async (
  data: TData,
  topicName: string,
  identifiers: string[],
  tunnelId: string,
  parentRouteNamespace: string,
  request: AxiosInstance,
  connectOptions: IConnectOptions,
): Promise<boolean> => {
  const transport = generateTransport(data, topicName, identifiers);
  await request.request({
    baseURL: `${connectOptions?.protocol}://${connectOptions?.wsHost}`,
    headers: { "Content-Type": "application/json" },
    url: `/${parentRouteNamespace}/${tunnelId}/${routeNamespace}`,
    method: "post",
    data: transport,
  });

  return true;
};
