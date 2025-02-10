export declare enum EConnectionStatus {
    Idle = "idle",
    Initiate = "initiate",
    Authentication = "authentication",
    Connecting = "connecting",
    Connected = "connected",
    Disconnected = "disconnected"
}
export declare enum EEnvironment {
    Nodejs = "nodejs",
    Browser = "browser"
}
export declare enum EEncoding {
    Arraybuffer = "arraybuffer"
}
export declare enum EVisibilityState {
    Hidden = "hidden",
    Visible = "visible"
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
export declare enum ELoadBalanceType {
    RoundRobbin = "roundRobin"
}
export declare enum ESendAction {
    Subscribe = "subscribe",
    Unsubscribe = "unsubscribe",
    Publish = "publish",
    AddIdentifier = "addIdentifier",
    RemoveIdentifier = "removeIdentifier"
}
//# sourceMappingURL=enum.d.ts.map