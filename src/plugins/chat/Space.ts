import { FileDetails, IFileDetails } from "./FileDetails";
import { ESpaceType } from "../../shared/enum/ESpaceType";
import { Message } from "./Message";
import { ReadReceipt } from "./ReadReceipt";
import { Reaction } from "./Reaction";
import { ITransport } from "../../shared/interfaces";
import {
  findIdentifierId,
  setIdentifierId,
} from "../../shared/utils/identifiers";
import { bufferToString } from "../../shared/utils";
import { ChatNotification } from "./ChatNotification";
import { ENotificationType } from "../../shared/enum/ENotificationType";
import { ITopic } from "../../shared/models/Topic";
import { ISendMessage } from "./MessageSend";
import { messageTag, notificationTag } from "./Tags";

export interface ISpace {
  /**
   * SpaceId of the Chat space
   */
  spaceId: string;

  /**
   * The Tunnel the Space is attached to
   */
  tunnelId: string;

  /**
   * The Project this space is attached to
   */
  projectId: string;

  /**
   * Space Type, DM or GROUP
   */
  type: ESpaceType;

  /**
   * Is this space private?
   */
  privateSpace: boolean;

  /**
   * Name of the space
   */
  name: string;

  /**
   * What this space is all about
   */
  description: string;

  /**
   * Space avatar
   */
  avatar?: IFileDetails;
}

export class Space implements ISpace {
  spaceId: string;
  tunnelId: string;
  projectId: string;
  type: ESpaceType;
  privateSpace: boolean;
  name: string;
  description: string;
  avatar?: IFileDetails;
  messageNotificationCount = 0;
  chatTopic: ITopic | undefined;
  _messages: Message[] = [];
  _notificationCallback: ((notification: ChatNotification) => void)[] = [];
  _onMessages?: (message: Message[]) => void;

  constructor(data: ISpace) {
    this.spaceId = data.spaceId;
    this.tunnelId = data.tunnelId;
    this.projectId = data.projectId;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.privateSpace = data.privateSpace;
    this.avatar = data.avatar ? new FileDetails(data.avatar) : undefined;
  }

  setChatTopic(chatTopic: ITopic) {
    this.chatTopic = chatTopic;
  }

  get userId() {
    return this.chatTopic?.tunnel().deviceTokenId;
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
    if (this._onMessages) this._onMessages(this._messages);
  }

  private actionNotificationCallback(notification: ChatNotification) {
    this._notificationCallback.forEach((callback) => {
      callback(notification);
    })
  }

  private notificationHandler(data: ArrayBuffer) {
    const notification = new ChatNotification(JSON.parse(bufferToString(data)));
    switch (notification.type) {
      case ENotificationType.NewMessage:
        this.messageNotificationCount = this.messageNotificationCount++;
        break;
      case ENotificationType.KeyStroke:
        // maybe have a keystroke-specific notification?
        break;
      case ENotificationType.Reaction:
        if (!notification.reaction) return;
        this.setReaction(notification.reaction);
        break;
      case ENotificationType.ReadReceipt:
        if (!notification.readReceipt) return;
        this.setReadReceipt(notification.readReceipt);
        break;
    }
    this.actionNotificationCallback(notification);
  }

  private messageHandler(data: ArrayBuffer) {
    const message = new Message(JSON.parse(bufferToString(data)));
    this.addMessage(message);
  }

  /**
   * Send a new message in the context of the active Space
   * @param sendMessage
   */
  sendMessage(sendMessage: ISendMessage) {
    if (!this.chatTopic || !this.userId) return;

    const message = new Message({
      userId: this.userId,
      ...sendMessage,
    });

    // send a message to all users in the space
    this.chatTopic.publish(message.serialize(), [
      setIdentifierId(messageTag, this.spaceId ?? ""),
    ]);
    // add a sent message to space messages
    this._messages.push(message);
    if (this._onMessages) this._onMessages(this._messages);

    const notification = new ChatNotification({
      type: ENotificationType.NewMessage,
      userId: this.userId,
    });

    // send notification that there is a new message sent in this space
    this.chatTopic.publish(notification.serialize(), [
      setIdentifierId(notificationTag, this.spaceId ?? ""),
    ]);
  }

  /**
   * Send user interaction like keystrokes
   */
  sendKeyStroke() {
    if (!this.chatTopic || !this.userId) return;

    const notification = new ChatNotification({
      type: ENotificationType.KeyStroke,
      userId: this.userId,
    });
    // send notification that there is a new message sent in this space
    this.chatTopic.publish(notification.serialize(), [
      setIdentifierId(notificationTag, this.spaceId ?? ""),
    ]);
  }

  /**
   * Notification callback will fire on all notification types
   * @param callback
   */
  onNotificationCallback(callback?: (notification: ChatNotification) => void) {
    if(callback) {
      this._notificationCallback.push(callback);
    }
  }

  removeNotificationCallback() {
    this._notificationCallback = [];
  }

  /**
   * Will fire on messages received
   * @param callback
   */
  onMessagesCallback(callback?: (message: Message[]) => void) {
    if(callback) {
      this._onMessages = callback;
    }
  }

  /**
   * Remove message callback
   */
  removeMessagesCallback() {
    this._onMessages = undefined;
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
   * When the space comes into view, reset the message received count
   */
  clearMessageReceivedCount() {
    this.messageNotificationCount = 0;
  }

  get spaceMessages() {
    return this._messages;
  }

  serialize() {
    return {
      spaceId: this.spaceId,
      tunnelId: this.tunnelId,
      projectId: this.projectId,
      name: this.name,
      description: this.description,
      type: this.type,
      privateSpace: this.privateSpace,
      avatar: this.avatar,
    };
  }
}
