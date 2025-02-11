export enum EConnectionStatus {
  Idle = "idle",
  Initiate = "initiate",
  Authentication = "authentication",
  Connecting = "connecting",
  Connected = "connected",
  Disconnected = "disconnected",
}

export enum EEncoding {
  Arraybuffer = "arraybuffer",
}

export enum EVisibilityState {
  Hidden = "hidden",
  Visible = "visible",
}

/**
 * Used to specify which type of Pub/Sub access the associated Device Token has.
 */
export enum EAccessPermission {
  Subscribe = "subscribe",
  Publish = "publish",
  PubSub = "pubSub",
}

/**
 * Set the status of a Topic. Active, the Topic can be used. Inactive, Topic can not be used.
 */
export enum EStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum ETopicType {
  Standard = "standard",
  Api = "api",
}

export enum ELoadBalanceType {
  RoundRobbin = "roundRobin",
}

export enum ESendAction {
  Subscribe = "subscribe",
  Unsubscribe = "unsubscribe",
  Publish = "publish",
  AddIdentifier = "addIdentifier",
  RemoveIdentifier = "removeIdentifier",
}
