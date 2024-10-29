import { TData } from "./constants";
import { EAccessPermission, EStatus } from "./enum";
import { dataType } from "./types";
/**
 * Disconnect from message broker when tab is not in view
 */
export interface ITunnelOptions {
    disconnectOnNoVisibility?: boolean;
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
}
/**
 * Response received from Message Broker
 */
export interface ITransport {
    data: ArrayBuffer;
    presences: string[];
    identifiers: string[];
    topicName: string;
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
export interface IDeviceListQuery {
    deviceAccessToken?: string;
    expireFromDate?: number;
    expireToDate?: number;
    name?: string;
    search?: string;
    size?: number;
    page?: number;
}
/**
 * Properties in creating or updating a Device Token
 */
export interface IDeviceTokenModel {
    name: string;
    accessPermission: EAccessPermission;
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
    data: TData;
    tunnelName: string;
    identifiers: string[];
}
/**
 * Topic properties used to creating or updating a model
 */
export interface ITopicModel {
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
export interface ITopicApiModel {
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
    name?: string;
    size?: number;
    page?: number;
    search?: string;
}
export interface ITunnelModel {
    tunnelId: string;
    projectId: string;
    status: EStatus;
    name: string;
    secure: boolean;
    sandbox: boolean;
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
}
