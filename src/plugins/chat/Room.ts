import { FileDetails, IFileDetails } from "./FileDetails";
import { ERoomType } from "../../shared/enum/ERoomType";
import { Message } from "./Message";
import { ReadReceipt } from "./ReadReceipt";
import { Reaction } from "./Reaction";
import { ITransport } from "../../shared/interfaces";
import { findIdentifierId } from "../../shared/utils/identifiers";
import { messageTag, notificationTag } from "./Chat";
import { bufferToString, uint8ArrayToString } from "../../shared/utils";
import { Notification } from "./Notification";
import { ENotificationType } from "../../shared/enum/ENotificationType";

export interface IRooms {
  /**
   * RoomId of the Chat room
   */
  roomId: string;

  /**
   * The Tunnel the Room is attached to
   */
  tunnelId: string;

  /**
   * The Project this room is attached to
   */
  projectId: string;

  /**
   * Room Type, DM or GROUP
   */
  type: ERoomType;

  /**
   * Is this room private?
   */
  privateRoom: boolean;

  /**
   * Room avatar
   */
  avatar?: IFileDetails;

  /**
   * Rooms user KeyStroke Callback
   * This callback will fire when any of the user in the room sends a keyStroke
   * @param callback
   */
  keyStrokeCallback(callback?: (notification: Notification) => void): void;

  /**
   * Split messages and notifications received
   * @param identifiers
   * @param data
   * @param presences
   */
  transportHandler({ identifiers, data, presences }: ITransport): void;
}

export class Room implements IRooms {
  roomId: string;
  tunnelId: string;
  projectId: string;
  type: ERoomType;
  privateRoom: boolean;
  avatar?: IFileDetails;
  messageNotificationCount = 0;
  _messages: Message[] = [];
  _keyStrokeCallback?: (notification: Notification) => void;

  constructor(data: IRooms) {
    this.roomId = data.roomId;
    this.tunnelId = data.tunnelId;
    this.projectId = data.projectId;
    this.type = data.type;
    this.privateRoom = data.privateRoom;
    this.avatar = data.avatar ? new FileDetails(data.avatar) : undefined;
  }

  private setReadReceipt(readReceipt: ReadReceipt) {
    const message = this._messages.find(
      (message) => message.messageId === readReceipt.messageId,
    );
    if (message) {
      message.setReadReceipt(readReceipt);
    }
  }

  private setReaction(reaction: Reaction) {
    const message = this._messages.find(
      (message) => message.messageId === reaction.messageId,
    );
    if (message) {
      message.setReaction(reaction);
    }
  }

  private addMessage(message: Message) {
    // TODO if when we support CHUNKS, this will need to be updated
    this._messages.push(message);
  }

  private notificationHandler(data: ArrayBuffer) {
    const notification = new Notification(JSON.parse(bufferToString(data)));
    switch (notification.type) {
      case ENotificationType.NewMessage:
        this.messageNotificationCount = this.messageNotificationCount++;
        break;
      case ENotificationType.KeyStroke:
        if(this._keyStrokeCallback) this._keyStrokeCallback(notification);
        break;
      case ENotificationType.Reaction:
        if(!notification.reaction) return;
        this.setReaction(notification.reaction);
        break;
      case ENotificationType.ReadReceipt:
        if(!notification.readReceipt) return;
        this.setReadReceipt(notification.readReceipt);
        break;
    }
  }

  private messageHandler(data: ArrayBuffer) {
    const message = new Message(JSON.parse(bufferToString(data)));
    this.addMessage(message);
  }

  keyStrokeCallback(callback?: (notification: Notification) => void) {
    if(callback) {
      this._keyStrokeCallback = callback;
    }
  }

  transportHandler({ identifiers, data, presences }: ITransport) {
    const hasNotification = !!findIdentifierId(notificationTag, identifiers[0]);
    const hasMessage = !!findIdentifierId(messageTag, identifiers[0]);

    if (hasNotification) {
      this.notificationHandler(data);
    }

    if (hasMessage) {
      this.messageHandler(data);
    }
  }

  serialize() {
    return {
      roomId: this.roomId,
      tunnelId: this.tunnelId,
      projectId: this.projectId,
      type: this.type,
      privateRoom: this.privateRoom,
      avatar: this.avatar,
    };
  }
}
