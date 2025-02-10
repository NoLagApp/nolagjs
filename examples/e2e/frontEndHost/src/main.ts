import {
  shouldCreateTunnel,
  canNotCreateDuplicateTunnelName,
  canNotCreateEmptyTunnelName,
  IApiTunnelCreate,
} from "../../procedures/001_api_tunnel_create.ts";
import type {
  IDeviceModel,
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
  editTunnelTopicUsingTopicId,
  IApiTopicEdit,
  setHydrationWebhook,
  setNoEchoToFalse,
  setStatusToActive,
  setStatusToInactive,
  setTriggerWebhook,
} from "../../procedures/006_api_topic_edit.ts";
import {
  getTunnelTopicUsingTopicId,
  IApiTopicGet,
} from "../../procedures/007_api_topic_get.ts";
import {
  IApiTopicList,
  queryForASpecificTopicName,
  shouldRetrieveAListOfTopics,
} from "../../procedures/008_api_topic_list.ts";
import {
  canNotCreateDuplicateDeviceName,
  canNotCreateEmptyDeviceName,
  IApiDeviceCreate,
  shouldCreateNewDevice,
} from "../../procedures/009_api_device_create.ts";
import {
  IApiDeviceList,
  shouldSeeAListOfDevices,
  shouldSeeAListOfSearchResultsForDevices,
} from "../../procedures/010_api_device_list.ts";
import {
  editTunnelDeviceSetAccessPermissionsPublish,
  editTunnelDeviceSetAccessPermissionsPubSub,
  editTunnelDeviceSetAccessPermissionsSubscribe,
  editTunnelDeviceUsingDeviceTokenId,
  IApiDeviceEdit,
  lockDeviceTopics,
  setExpireInSeconds,
  setStaticTopics,
} from "../../procedures/011_api_device_edit.ts";
import {
  // clientTunnelConnect, clientTunnelDisconnect,
  // clientTunnelOnReceive,
  // clientTunnelPublish,
  // clientTunnelSubscribe, clientTunnelUnsubscribe,
  IClientPubSub,
  // IPresenceReceive,
  // TOPIC_addIdentifiersToInstance,
  // TOPIC_deviceOneSetPresenceDeviceTwoReceivePresence,
  // TOPIC_publishUnsubscribe,
  // TOPIC_removeIdentifiersToInstance,
  TUNNEL_standardPubSub,
  // TUNNEL_standardPubSubAddIdentifiers,
  // TUNNEL_standardPubSubWithIdentifiers,
  // TUNNEL_unsubscribe,
} from "../../procedures/012_client_pub_sub.ts";
import { IExampleApiTunnelCallbackOnReceiveResponse } from "../../../SDK/Client/tunnel_instance/example_client_tunnel_callback_on_receive.ts";
import { delay } from "../../../constants/util/delay.ts";

declare global {
  interface Window {
    delay: typeof delay;
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
    // 008_api_topic_list
    shouldRetrieveAListOfTopics: (
      arg: IApiTopicList,
    ) => Promise<IPaginated<ITopicModel>>;
    queryForASpecificTopicName: (
      arg: IApiTopicList,
    ) => Promise<IPaginated<ITopicModel>>;
    // 009_api_device_create
    shouldCreateNewDevice: (arg: IApiDeviceCreate) => Promise<IDeviceModel>;
    canNotCreateDuplicateDeviceName: (
      arg: IApiDeviceCreate,
    ) => Promise<IErrorMessage | undefined>;
    canNotCreateEmptyDeviceName: (
      arg: IApiDeviceCreate,
    ) => Promise<IErrorMessage | undefined>;
    // 010_api_device_list
    shouldSeeAListOfDevices: (
      arg: IApiDeviceList,
    ) => Promise<IPaginated<IDeviceModel>>;
    shouldSeeAListOfSearchResultsForDevices: (
      arg: IApiDeviceList,
    ) => Promise<IPaginated<IDeviceModel>>;
    // 011_api_device_edit
    editTunnelDeviceUsingDeviceTokenId: (
      arg: IApiDeviceEdit,
    ) => Promise<IDeviceModel>;
    editTunnelDeviceSetAccessPermissionsSubscribe: (
      arg: IApiDeviceEdit,
    ) => Promise<IDeviceModel>;
    editTunnelDeviceSetAccessPermissionsPublish: (
      arg: IApiDeviceEdit,
    ) => Promise<IDeviceModel>;
    editTunnelDeviceSetAccessPermissionsPubSub: (
      arg: IApiDeviceEdit,
    ) => Promise<IDeviceModel>;
    setStaticTopics: (arg: IApiDeviceEdit) => Promise<IDeviceModel>;
    lockDeviceTopics: (arg: IApiDeviceEdit) => Promise<IDeviceModel>;
    setExpireInSeconds: (arg: IApiDeviceEdit) => Promise<IDeviceModel>;
    // 012_client_pub_sub
    // clientTunnelConnect: (arg: IClientPubSub) => Promise<ITunnel>;
    // clientTunnelSubscribe: (arg: IClientPubSub) => Promise<ITopic | undefined>;
    // clientTunnelPublish: (arg: IClientPubSub) => Promise<void>;
    // clientTunnelOnReceive: (
    //   arg: IClientPubSub,
    //   callback: (
    //     data: IExampleApiTunnelCallbackOnReceiveResponse,
    //   ) => void | undefined,
    // ) => Promise<IExampleApiTunnelCallbackOnReceiveResponse>;
    // clientTunnelUnsubscribe: (arg: IClientPubSub) => Promise<boolean>;
    // clientTunnelDisconnect: (arg: IClientPubSub) => Promise<void>;
    TUNNEL_standardPubSub: (arg: IClientPubSub) => Promise<IExampleApiTunnelCallbackOnReceiveResponse>;
    // TUNNEL_standardPubSubAddIdentifiers: (arg: IClientPubSub) => Promise<IExampleApiTunnelCallbackOnReceiveResponse>;
    // TUNNEL_standardPubSubWithIdentifiers: (arg: IClientPubSub) => Promise<IExampleApiTunnelCallbackOnReceiveResponse>;
    // TUNNEL_unsubscribe: (arg: IClientPubSub) => Promise<boolean>;
    // TOPIC_addIdentifiersToInstance: (arg: IClientPubSub) => Promise<IExampleApiTunnelCallbackOnReceiveResponse | null>;
    // TOPIC_removeIdentifiersToInstance: (arg: IClientPubSub) => Promise<boolean>;
    // TOPIC_deviceOneSetPresenceDeviceTwoReceivePresence: (
    //   arg: IClientPubSub,
    // ) => Promise<IPresenceReceive>;
    // TOPIC_publishUnsubscribe: (arg: IClientPubSub) => Promise<boolean>;
  }
}

// utils
window.delay = delay;

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

// 008_api_topic_list
window.shouldRetrieveAListOfTopics = shouldRetrieveAListOfTopics;
window.queryForASpecificTopicName = queryForASpecificTopicName;

// 009_api_device_create
window.shouldCreateNewDevice = shouldCreateNewDevice;
window.canNotCreateDuplicateDeviceName = canNotCreateDuplicateDeviceName;
window.canNotCreateEmptyDeviceName = canNotCreateEmptyDeviceName;

// 010_api_device_list
window.shouldSeeAListOfDevices = shouldSeeAListOfDevices;
window.shouldSeeAListOfSearchResultsForDevices =
  shouldSeeAListOfSearchResultsForDevices;

// 011_api_device_edit
window.editTunnelDeviceUsingDeviceTokenId = editTunnelDeviceUsingDeviceTokenId;
window.editTunnelDeviceSetAccessPermissionsSubscribe =
  editTunnelDeviceSetAccessPermissionsSubscribe;
window.editTunnelDeviceSetAccessPermissionsPublish =
  editTunnelDeviceSetAccessPermissionsPublish;
window.editTunnelDeviceSetAccessPermissionsPubSub =
  editTunnelDeviceSetAccessPermissionsPubSub;
window.setStaticTopics = setStaticTopics;
window.lockDeviceTopics = lockDeviceTopics;
window.setExpireInSeconds = setExpireInSeconds;

// 012_client_pub_sub
// window.clientTunnelConnect = clientTunnelConnect;
// window.clientTunnelDisconnect = clientTunnelDisconnect;
// window.clientTunnelSubscribe = clientTunnelSubscribe;
// window.clientTunnelPublish = clientTunnelPublish;
// window.clientTunnelOnReceive = clientTunnelOnReceive;
// window.clientTunnelUnsubscribe = clientTunnelUnsubscribe;
window.TUNNEL_standardPubSub = TUNNEL_standardPubSub;
// window.TUNNEL_standardPubSubAddIdentifiers = TUNNEL_standardPubSubAddIdentifiers;
// window.TUNNEL_unsubscribe = TUNNEL_unsubscribe;
// window.TOPIC_addIdentifiersToInstance = TOPIC_addIdentifiersToInstance;
// window.TOPIC_removeIdentifiersToInstance = TOPIC_removeIdentifiersToInstance;
// window.TOPIC_deviceOneSetPresenceDeviceTwoReceivePresence = TOPIC_deviceOneSetPresenceDeviceTwoReceivePresence;
// window.TOPIC_publishUnsubscribe = TOPIC_publishUnsubscribe;
