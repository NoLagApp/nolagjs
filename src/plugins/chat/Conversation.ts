import { FileDetails, IFileDetails } from "./FileDetails";
import { EConversationType } from "../../shared/enum/EConversationType";
import { Message } from "./Message";
import { ReadReceipt } from "./ReadReceipt";
import { Reaction } from "./Reaction";
import { ITransport } from "../../shared/interfaces";
import {
  findIdentifierId,
  setIdentifierId,
} from "../../shared/utils/identifiers";
import { bufferToString } from "../../shared/utils";
import { Notification } from "./Notification";
import { ENotificationType } from "../../shared/enum/ENotificationType";
import { ITopic } from "../../shared/models/Topic";
import { ISendMessage } from "./MessageSend";
import { messageTag, notificationTag } from "./Tags";

export interface IConversation {
  /**
   * ConversationId of the Chat conversation
   */
  conversationId: string;

  /**
   * The Tunnel the Conversation is attached to
   */
  tunnelId: string;

  /**
   * The Project this conversation is attached to
   */
  projectId: string;

  /**
   * Conversation Type, DM or GROUP
   */
  type: EConversationType;

  /**
   * Is this conversation private?
   */
  privateConversation: boolean;

  /**
   * Conversation avatar
   */
  avatar?: IFileDetails;
}

export class Conversation implements IConversation {
  conversationId: string;
  tunnelId: string;
  projectId: string;
  type: EConversationType;
  privateConversation: boolean;
  avatar?: IFileDetails;
  messageNotificationCount = 0;
  chatTopic: ITopic | undefined;
  _messages: Message[] = [];
  _notificationCallback: ((notification: Notification) => void)[] = [];
  _onMessages?: (message: Message[]) => void;

  constructor(data: IConversation) {
    this.conversationId = data.conversationId;
    this.tunnelId = data.tunnelId;
    this.projectId = data.projectId;
    this.type = data.type;
    this.privateConversation = data.privateConversation;
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

  private actionNotificationCallback(notification: Notification) {
    this._notificationCallback.forEach((callback) => {
      console.log(notification);
      console.log(callback);
      callback(notification);
    })
  }

  private notificationHandler(data: ArrayBuffer) {
    const notification = new Notification(JSON.parse(bufferToString(data)));
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
   * Send a new message in the context of the active Conversation
   * @param sendMessage
   */
  sendMessage(sendMessage: ISendMessage) {
    if (!this.chatTopic || !this.userId) return;

    const message = new Message({
      userId: this.userId,
      ...sendMessage,
    });

    // send a message to all users in the conversation
    this.chatTopic.publish(message.serialize(), [
      setIdentifierId(messageTag, this.conversationId ?? ""),
    ]);
    // add a sent message to conversation messages
    this._messages.push(message);
    if (this._onMessages) this._onMessages(this._messages);

    const notification = new Notification({
      type: ENotificationType.NewMessage,
      userId: this.userId,
    });

    // send notification that there is a new message sent in this conversation
    this.chatTopic.publish(notification.serialize(), [
      setIdentifierId(notificationTag, this.conversationId ?? ""),
    ]);
  }

  /**
   * Send user interaction like keystrokes
   */
  sendKeyStroke() {
    if (!this.chatTopic || !this.userId) return;

    const notification = new Notification({
      type: ENotificationType.KeyStroke,
      userId: this.userId,
    });
    // send notification that there is a new message sent in this conversation
    this.chatTopic.publish(notification.serialize(), [
      setIdentifierId(notificationTag, this.conversationId ?? ""),
    ]);
  }

  /**
   * Conversations user KeyStroke Callback
   * This callback will fire when any of the user in the conversation sends a keyStroke
   * @param callback
   */
  onNotificationCallback(callback?: (notification: Notification) => void) {
    if (callback) {
      console.log("notificationcallback", callback);
      this._notificationCallback.push(callback);
    }
  }

  onMessagesCallback(callback?: (message: Message[]) => void) {
    if (callback) {
      this._onMessages = callback;
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
   * When the conversation comes into view, reset the message received count
   */
  clearMessageReceivedCount() {
    this.messageNotificationCount = 0;
  }

  get conversationMessages() {
    return this._messages;
  }

  serialize() {
    return {
      conversationId: this.conversationId,
      tunnelId: this.tunnelId,
      projectId: this.projectId,
      type: this.type,
      privateConversation: this.privateConversation,
      avatar: this.avatar,
    };
  }
}
