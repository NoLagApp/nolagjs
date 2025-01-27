import {
  shouldCreateTunnel,
  canNotCreateDuplicateTunnelName,
  canNotCreateEmptyTunnelName,
  IApiTunnelCreate,
} from "../../procedures/001_api_tunnel_create.ts";
import type {
  IErrorMessage,
  IPaginated,
  ITopicModel,
  ITunnelModel,
} from "nolagjs";
import {
  IApiTunnelList,
  queryForASpecificTunnel,
  shouldRetrieveAListOfTunnels,
} from "../../procedures/002_api_tunnel_list.ts";
import {
  editTunnelNameUsingTunnelId,
  IApiTunnelEdit,
} from "../../procedures/003_api_tunnel_edit.ts";
import { getTunnelUsingTunnelId } from "../../procedures/004_api_tunnel_get.ts";
import {
  createTunnelTopicUsingTunnelID,
  IApiTopicCreate,
} from "../../procedures/005_api_topic_create.ts";
import {
  editTunnelTopicUsingTopicId, IApiTopicEdit,
  setHydrationWebhook,
  setNoEchoToFalse, setStatusToActive,
  setStatusToInactive,
  setTriggerWebhook,
} from "../../procedures/006_api_topic_edit.ts";
import { getTunnelTopicUsingTopicId, IApiTopicGet } from "../../procedures/007_api_topic_get.ts";

declare global {
  interface Window {
    // 001_api_tunnel_create
    shouldCreateTunnel: (arg: IApiTunnelCreate) => Promise<ITunnelModel>;
    canNotCreateDuplicateTunnelName: (
      arg: IApiTunnelCreate,
    ) => Promise<IErrorMessage | undefined>;
    canNotCreateEmptyTunnelName: (
      arg: IApiTunnelCreate,
    ) => Promise<IErrorMessage | undefined>;
    // 002_api_tunnel_list
    shouldRetrieveAListOfTunnels: (
      arg: IApiTunnelList,
    ) => Promise<IPaginated<ITunnelModel>>;
    queryForASpecificTunnel: (
      arg: IApiTunnelList,
    ) => Promise<ITunnelModel | undefined>;
    // 003_api_tunnel_edit
    editTunnelNameUsingTunnelId: (arg: IApiTunnelEdit) => Promise<ITunnelModel>;
    // 004_api_tunnel_get
    getTunnelUsingTunnelId: (arg: IApiTunnelEdit) => Promise<ITunnelModel>;
    // 005_api_topic_create
    createTunnelTopicUsingTunnelID: (
      arg: IApiTopicCreate,
    ) => Promise<ITopicModel>;
    // 006_api_topic_create
    editTunnelTopicUsingTopicId: (arg: IApiTopicEdit) => Promise<ITopicModel>;
    setNoEchoToFalse: (arg: IApiTopicEdit) => Promise<ITopicModel>;
    setTriggerWebhook: (arg: IApiTopicEdit) => Promise<ITopicModel>;
    setHydrationWebhook: (arg: IApiTopicEdit) => Promise<ITopicModel>;
    setStatusToInactive: (arg: IApiTopicEdit) => Promise<ITopicModel>;
    setStatusToActive: (arg: IApiTopicEdit) => Promise<ITopicModel>;
    // 007_api_topic_get
    getTunnelTopicUsingTopicId: (arg: IApiTopicGet) => Promise<ITopicModel>;
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

// 005_api_topic_create
window.createTunnelTopicUsingTunnelID = createTunnelTopicUsingTunnelID;

// 006_api_topic_create
window.editTunnelTopicUsingTopicId = editTunnelTopicUsingTopicId;
window.setNoEchoToFalse = setNoEchoToFalse;
window.setTriggerWebhook = setTriggerWebhook;
window.setHydrationWebhook = setHydrationWebhook;
window.setStatusToInactive = setStatusToInactive;
window.setStatusToActive = setStatusToActive;

// 007_api_topic_get
window.getTunnelTopicUsingTopicId = getTunnelTopicUsingTopicId;
