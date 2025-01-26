import {
  shouldCreateTunnel,
  canNotCreateDuplicateTunnelName,
  canNotCreateEmptyTunnelName,
  IApiTunnelCreate,
} from "../../procedures/001_api_tunnel_create.ts";
import type { IErrorMessage, IPaginated, ITunnelModel } from "nolagjs";
import {
  IApiTunnelList,
  queryForASpecificTunnel,
  shouldRetrieveAListOfTunnels,
} from "../../procedures/002_api_tunnel_list.ts";
import { editTunnelNameUsingTunnelId, IApiTunnelEdit } from "../../procedures/003_api_tunnel_edit.ts";
import { getTunnelUsingTunnelId } from "../../procedures/004_api_tunnel_get.ts";

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
      arg: IApiTunnelList,
    ) =>  Promise<IPaginated<ITunnelModel>>;
    queryForASpecificTunnel: (
      arg: IApiTunnelList,
    ) => Promise<ITunnelModel | undefined>;
    editTunnelNameUsingTunnelId: (arg: IApiTunnelEdit) => Promise<ITunnelModel>;
    getTunnelUsingTunnelId: (arg: IApiTunnelEdit) => Promise<ITunnelModel>;
  }
}

// 001_api_tunnel_create
window.shouldCreateTunnel = shouldCreateTunnel;
window.canNotCreateDuplicateTunnelName = canNotCreateDuplicateTunnelName;
window.canNotCreateEmptyTunnelName = canNotCreateEmptyTunnelName;

// 002_api_tunnel_list
window.shouldRetrieveAListOfTunnels = shouldRetrieveAListOfTunnels;
window.queryForASpecificTunnel = queryForASpecificTunnel;

// 003_api_tunnel_edit
window.editTunnelNameUsingTunnelId = editTunnelNameUsingTunnelId;

// 004_api_tunnel_get
window.getTunnelUsingTunnelId = getTunnelUsingTunnelId;