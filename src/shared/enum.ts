export enum EConnectionStatus {
  Idle = "idle",
  // Connecting = "cng",
  Connecting = 6,
  Connected = 66,
  // Connected = "cnd",
  Disconnected = 666,
}

export enum EEnvironment {
  Nodejs = "nodejs",
  Browser = "browser",
}

/**
 * Used as a command to indicate to the Message Broker that a device wants to add or delete a subscription to a topic, or to add and delete identifiers set on a topic.
 */
export enum EAction {
  Add = "a",
  Delete = "d",
}

export enum EEncoding {
  Arraybuffer = "arraybuffer",
}

export enum EVisibilityState {
  Hidden = "hidden",
  Visible = "visible",
}

export enum ESeparator {
  Group = 29,
  Record = 30,
  Unit = 31,
  Vertical = 11,
  NegativeAck = 21,
  BellAlert = 7,
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

export enum ESocketType {
  WebSocket = "webSocket",
  TcpSocket = "tcpSocket",
}