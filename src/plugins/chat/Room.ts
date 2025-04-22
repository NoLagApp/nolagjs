import { FileDetails, IFileDetails } from "./FileDetails";
import { ERoomType } from "../../shared/enum/ERoomType";
import { Message } from "./Message";
import { ReadReceipt } from "./ReadReceipt";
import { Reaction } from "./Reaction";
import { ITransport } from "../../shared/interfaces";
import { findIdentifierId, setIdentifierId } from "../../shared/utils/identifiers";
import { messageTag, notificationTag } from "./ChatApp";
import { bufferToString, uint8ArrayToString } from "../../shared/utils";
import { Notification } from "./Notification";
import { ENotificationType } from "../../shared/enum/ENotificationType";
import { ITopic } from "../../shared/models/Topic";
import { ISendMessage } from "./SendMessage";

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
}

export class Room implements IRooms {
  roomId: string;
  tunnelId: string;
  projectId: string;
  type: ERoomType;
  privateRoom: boolean;
  avatar?: IFileDetails;
  messageNotificationCount = 0;
  chatTopic: ITopic;
  userId: string;
  _messages: Message[] = [];
  _keyStrokeCallback?: (notification: Notification) => void;

  constructor(data: IRooms, chatTopic: ITopic, userId: string) {
    this.chatTopic = chatTopic;
    this.userId = userId;
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

  private sendReadReceipt(message: Message) {
    if (message) {
     //
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

  /**
   * Send a new message in the context of the active Room
   * @param sendMessage
   */
  sendMessage(sendMessage: ISendMessage) {
    const message = new Message({
      userId: this.userId,
      ...sendMessage,
    });

    // send a message to all users in the room
    this.chatTopic.publish(message.serialize(), [
      setIdentifierId(messageTag, this.roomId ?? ""),
    ]);

    const notification = new Notification({
      type: ENotificationType.NewMessage,
      userId: this.userId,
    });

    // send notification that there is a new message sent in this room
    this.chatTopic.publish(notification.serialize(), [
      setIdentifierId(notificationTag, this.roomId ?? ""),
    ]);
  }

  /**
   * Send user interaction like keystrokes
   */
  sendKeyStroke() {
    const notification = new Notification({
      type: ENotificationType.KeyStroke,
      userId: this.userId,
    });
    // send notification that there is a new message sent in this room
    this.chatTopic.publish(notification.serialize(), [
      setIdentifierId(notificationTag, this.roomId ?? ""),
    ]);
  }

  /**
   * Rooms user KeyStroke Callback
   * This callback will fire when any of the user in the room sends a keyStroke
   * @param callback
   */
  keyStrokeCallback(callback?: (notification: Notification) => void) {
    if(callback) {
      this._keyStrokeCallback = callback;
    }
  }

  /**
   * Split messages and notifications received
   * @param identifiers
   * @param data
   * @param presences
   */
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

  /**
   * When the room comes into view, reset the message received count
   */
  clearMessageReceivedCount() {
    this.messageNotificationCount = 0;
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
