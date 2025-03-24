import { EAccessPermission, EStatus } from "./enum";
import { dataType } from "./types";
import { publishData } from "./constants";

/**
 * Disconnect from message broker when tab is not in view
 */
export interface ITunnelOptions {
  disconnectOnNoVisibility?: boolean;
  bufferOnDisconnect?: boolean;
  debug?: boolean;
}

/**
 * NOT FOR NORMAL USE
 */
export interface IConnectOptions {
  host?: string;
  wsHost?: string;
  port?: number;
  path?: string;
  protocol?: string;
  url?: string;
  wsUrl?: string;
  devMode?: boolean;
  checkConnectionInterval?: number;
  checkConnectionTimeout?: number;
  apiKey?: string;
  bufferOnDisconnect?: boolean;
  debug?: boolean;
}

export interface IBaseModel {
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}

/**
 * Response received from Message Broker
 */
export interface ITransport {
  data: ArrayBuffer;
  presences: string[];
  identifiers: string[];
  topicName: string;
  acknowledge?: string | boolean | string[];
}

/**
 * Pagination details indicating the current status of your pagination query
 */
export interface IPagination {
  page?: number;
  size?: number;
  hasPrevious?: boolean;
  hasNext?: boolean;
  total?: number;
}

/**
 * Paginated result received from the API end-point
 */
export interface IPaginated<T> {
  records: T[];
  pagination: IPagination;
}

/**
 * Available query parameters to query a device list.
 */
export interface IDeviceQuery {
  deviceAccessToken?: string;
  expireFromDate?: number;
  expireToDate?: number;
  name?: string;
  search?: string;
  size?: number;
  page?: number;
}

/**
 * Properties in creating or updating a Device. We use the attached Token as the access key
 */
export interface IDeviceModel extends IBaseModel {
  name?: string;
  accessPermission?: EAccessPermission;
  deviceTokenId?: string;
  deviceAccessToken?: string;
  projectId?: string;
  tunnelId?: string;
  staticTopics?: IStaticTopic[];
  lockTopics?: boolean;
  expireIn?: number;
  expireDate?: number;
}

/**
 * Static Topics, are a group of Topic names and Identifiers.  These are attached to a Device Token
 * In the scenario where the Device Token is locked, the Device only has access to its Static Topics
 */
export interface IStaticTopic {
  name: string;
  identifiers?: string[];
}

/**
 * Sending messages to the Message Broker via HTTP call
 */
export interface IHttpPublish {
  data: publishData;
  topicName: string;
  identifiers: string[];
}

/**
 * Topic properties used to creating or updating a model
 */
export interface ITopicModel extends IBaseModel {
  topicId?: string;
  projectId?: string;
  tunnelId?: string;
  status?: EStatus;
  name?: string;
  triggerApi?: ITopicApiModel;
  hydrateApi?: ITopicApiModel;
  noEcho?: boolean;
}

/**
 * Topic API model
 * Used to save Trigger and Hydration API's
 */
export interface ITopicApiModel extends IBaseModel {
  url: string;
  queryParams?: dataType;
  headers?: dataType;
}

/**
 * Query parameters available for a Topic
 */
export interface ITopicQuery {
  status?: EStatus;
  name?: string;
  size?: number;
  page?: number;
  search?: string;
}

/**
 * Query parameters available for a Tunnel
 */
export interface ITunnelQuery {
  status?: EStatus;
  size?: number;
  page?: number;
  search?: string;
}

export interface ITunnelModel extends IBaseModel {
  tunnelId?: string;
  projectId?: string;
  status?: EStatus;
  name?: string;
  secure?: boolean;
  sandbox?: boolean;
}

/**
 * Error model received from Message Broker or API
 */
export interface IErrorMessage {
  id?: string;
  code?: number;
  msg?: string;
  description?: string;
  errors?: IErrorsModel[];
}

/**
 * List of field related error, it can also contain a nested list of error
 */
export interface IErrorsModel {
  property?: string;
  value?: string;
  descriptions?: string[];
  errors?: IErrorsModel[] | undefined;
}

export interface INqlIdentifiers {
  OR?: string[];
  // AND: string[];
}

export interface IUnifiedWebsocket {
  onOpen?: (onOpenCallback: (event: unknown) => void) => void | undefined;
  onMessage?: (onMessageCallback: (event: unknown) => void) => void | undefined;
  onClose?: (onCloseCallback: (event: unknown) => void) => void | undefined;
  onError?: (onErrorCallback: (event: unknown) => void) => void | undefined;
  close?: () => void;
  send?: (message: ArrayBuffer) => void;
}

export interface IRequestParams {
  baseURL: string;
  headers: Record<string, string>;
}

export interface IGlobalVars {
  PROJECT_API_KEY: string;
}
