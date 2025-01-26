import {
  shouldCreateTunnel,
  canNotCreateDuplicateTunnelName,
  canNotCreateEmptyTunnelName,
  IApiTunnelCreate,
} from "../../procedures/001_api_tunnel_create.ts";
import type { IErrorMessage, IPaginated, ITunnelModel } from "nolagjs";
import { queryForASpecificTunnel, shouldRetrieveAListOfTunnels } from "../../procedures/002_api_tunnel_list.ts";

declare global {
  interface Window {
    shouldCreateTunnel: (arg: IApiTunnelCreate) => Promise<ITunnelModel>;
    canNotCreateDuplicateTunnelName: (
      arg: IApiTunnelCreate,
    ) => Promise<IErrorMessage | undefined>;
    canNotCreateEmptyTunnelName: (
      arg: IApiTunnelCreate,
    ) => Promise<IErrorMessage | undefined>;
    shouldRetrieveAListOfTunnels: (
      arg: IApiTunnelCreate,
    ) =>  Promise<IPaginated<ITunnelModel>>;
    queryForASpecificTunnel: (
      arg: IApiTunnelCreate,
    ) => Promise<ITunnelModel | undefined>;
  }
}

window.shouldCreateTunnel = shouldCreateTunnel;
window.canNotCreateDuplicateTunnelName = canNotCreateDuplicateTunnelName;
window.canNotCreateEmptyTunnelName = canNotCreateEmptyTunnelName;

window.shouldRetrieveAListOfTunnels = shouldRetrieveAListOfTunnels;
window.queryForASpecificTunnel = queryForASpecificTunnel;