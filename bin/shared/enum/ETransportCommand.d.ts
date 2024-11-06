/**
 * Used as a command to indicate to the Message Broker
 * that a device wants to add or delete a subscription to a topic,
 * or to add and delete identifiers set on a topic.
 */
export declare enum ETransportCommand {
    InitConnection = 1,
    Authenticate = 15,
    Acknowledge = 6,
    Reconnect = 22,
    Topic = 26,
    Identifier = 11,
    Error = 21,
    Alert = 7,
    AddAction = 12,
    DeleteAction = 16,
    Server = 24,
    Payload = 29,
    Presence = 14
}
export declare enum ETransportCommandSeparator {
    ArraySeparator = 31
}
