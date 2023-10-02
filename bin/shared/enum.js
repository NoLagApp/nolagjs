"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESocketType = exports.ETopicType = exports.EStatus = exports.EAccessPermission = exports.ESeparator = exports.EVisibilityState = exports.EEncoding = exports.EAction = exports.EEnvironment = exports.EConnectionStatus = void 0;
var EConnectionStatus;
(function (EConnectionStatus) {
    EConnectionStatus["Idle"] = "idle";
    // Connecting = "cng",
    EConnectionStatus[EConnectionStatus["Connecting"] = 6] = "Connecting";
    EConnectionStatus[EConnectionStatus["Connected"] = 66] = "Connected";
    // Connected = "cnd",
    EConnectionStatus[EConnectionStatus["Disconnected"] = 666] = "Disconnected";
})(EConnectionStatus = exports.EConnectionStatus || (exports.EConnectionStatus = {}));
var EEnvironment;
(function (EEnvironment) {
    EEnvironment["Nodejs"] = "nodejs";
    EEnvironment["Browser"] = "browser";
})(EEnvironment = exports.EEnvironment || (exports.EEnvironment = {}));
/**
 * Used as a command to indicate to the Message Broker that a device wants to add or delete a subscription to a topic, or to add and delete identifiers set on a topic.
 */
var EAction;
(function (EAction) {
    EAction["Add"] = "a";
    EAction["Delete"] = "d";
})(EAction = exports.EAction || (exports.EAction = {}));
var EEncoding;
(function (EEncoding) {
    EEncoding["Arraybuffer"] = "arraybuffer";
})(EEncoding = exports.EEncoding || (exports.EEncoding = {}));
var EVisibilityState;
(function (EVisibilityState) {
    EVisibilityState["Hidden"] = "hidden";
    EVisibilityState["Visible"] = "visible";
})(EVisibilityState = exports.EVisibilityState || (exports.EVisibilityState = {}));
var ESeparator;
(function (ESeparator) {
    ESeparator[ESeparator["Group"] = 29] = "Group";
    ESeparator[ESeparator["Record"] = 30] = "Record";
    ESeparator[ESeparator["Unit"] = 31] = "Unit";
    ESeparator[ESeparator["Vertical"] = 11] = "Vertical";
    ESeparator[ESeparator["NegativeAck"] = 21] = "NegativeAck";
    ESeparator[ESeparator["BellAlert"] = 7] = "BellAlert";
})(ESeparator = exports.ESeparator || (exports.ESeparator = {}));
/**
 * Used to specify which type of Pub/Sub access the associated Device Token has.
 */
var EAccessPermission;
(function (EAccessPermission) {
    EAccessPermission["Subscribe"] = "subscribe";
    EAccessPermission["Publish"] = "publish";
    EAccessPermission["PubSub"] = "pubSub";
})(EAccessPermission = exports.EAccessPermission || (exports.EAccessPermission = {}));
/**
 * Set the status of a Topic. Active, the Topic can be used. Inactive, Topic can not be used.
 */
var EStatus;
(function (EStatus) {
    EStatus["Active"] = "active";
    EStatus["Inactive"] = "inactive";
})(EStatus = exports.EStatus || (exports.EStatus = {}));
var ETopicType;
(function (ETopicType) {
    ETopicType["Standard"] = "standard";
    ETopicType["Api"] = "api";
})(ETopicType = exports.ETopicType || (exports.ETopicType = {}));
var ESocketType;
(function (ESocketType) {
    ESocketType["WebSocket"] = "webSocket";
    ESocketType["TcpSocket"] = "tcpSocket";
})(ESocketType = exports.ESocketType || (exports.ESocketType = {}));
//# sourceMappingURL=enum.js.map