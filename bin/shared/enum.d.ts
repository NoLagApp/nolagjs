export declare enum EConnectionStatus {
    Idle = "idle",
    Connecting = "connecting",
    Connected = "connected",
    Disconnected = "disconnected"
}
export declare enum EEnvironment {
    Nodejs = "nodejs",
    Browser = "browser"
}
/**
 * Used as a command to indicate to the Message Broker that a device wants to add or delete a subscription to a topic, or to add and delete identifiers set on a topic.
 */
export declare enum EAction {
    Add = "a",
    Delete = "d"
}
export declare enum EEncoding {
    Arraybuffer = "arraybuffer"
}
export declare enum EVisibilityState {
    Hidden = "hidden",
    Visible = "visible"
}
export declare enum ESeparator {
    Group = 29,
    Record = 30,
    Unit = 31,
    Vertical = 11,
    NegativeAck = 21,
    BellAlert = 7,
    SynchronousIdle = 22
}
/**
 * Used to specify which type of Pub/Sub access the associated Device Token has.
 */
export declare enum EAccessPermission {
    Subscribe = "subscribe",
    Publish = "publish",
    PubSub = "pubSub"
}
/**
 * Set the status of a Topic. Active, the Topic can be used. Inactive, Topic can not be used.
 */
export declare enum EStatus {
    Active = "active",
    Inactive = "inactive"
}
export declare enum ETopicType {
    Standard = "standard",
    Api = "api"
}
