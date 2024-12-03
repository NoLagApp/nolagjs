/**
 * Used as a command to indicate to the Message Broker
 * that a device wants to add or delete a subscription to a topic,
 * or to add and delete identifiers set on a topic.
 */
export enum ETransportCommand {
  // first connection was made
  InitConnection = 1,
  // first connection was made
  Authenticate = 15,
  // any acknowledgement
  Acknowledge = 6,
  // trigger connection state hydration
  Reconnect = 22,
  // subscribe to topic
  Topic = 26,
  // list of NQL identifiers
  Identifier = 11,
  // prefix error found
  Error = 21,
  // Error message
  Alert = 7,
  // add action
  AddAction = 12,
  // delete action
  DeleteAction = 16,
  // Server details
  Server = 24,
  // payload command separator
  Payload = 29,
  // set a custom data associated with this topic
  // this data will be sent to all devices subscribed to this topic/identifiers
  Presence = 14,
}

export enum ETransportCommandSeparator {
  ArraySeparator = 31,
}
