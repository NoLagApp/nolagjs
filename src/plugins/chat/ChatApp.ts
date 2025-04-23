import { Conversation } from "./Conversation";
import { ITunnel } from "../../client";
import { ITopic } from "../../shared/models/Topic";
import { ITransport } from "../../shared/interfaces";
import {
  findIdentifierId,
  setIdentifierId,
} from "../../shared/utils/identifiers";
import { ISendMessage } from "./MessageSend";
import { chatTag, messageTag, notificationTag } from "./Tags";
import { EConversationType } from "../../shared/enum/EConversationType";
import { Message } from "./Message";
import { Notification } from "./Notification";

export interface IChat {
  /**
   * Retrieve a list of conversations a user has joined, or was invited to.
   * The user's access token will be used to retrieve the list
   */
  retrieveConversations(): Promise<Conversation[]>;

  /**
   * Join a single chat conversation
   * @param conversationId
   */
  joinConversation(conversationId: string): Conversation | undefined;

  /**
   * Leave a single chat conversation
   * @param conversationId
   */
  leaveConversation(conversationId: string): ChatApp;

  /**
   * Join a list of conversations based on selected conversationsIds
   * A user might have access to multiple Conversations, but they only want to join
   * some of them for messages
   * @param conversationIds
   */
  joinConversations(conversationIds: string[]): ChatApp;

  /**
   * Can leave joined conversations
   * @param conversationIds
   */
  leaveConversations(conversationIds: string[]): ChatApp;

  /**
   * Set the current active conversation view,
   * a user might view multiple conversations at the same time,
   * but they can only send a message in one conversation
   * @param conversationId
   */
  setActiveConversation(conversationId: string): Conversation | undefined;

  /**
   * Get the current active conversation context
   */
  get activeConversation(): Conversation | undefined;

  /**
   * Send a new message in the context of the active Conversation
   * @param sendMessage
   */
  sendMessage(sendMessage: ISendMessage): void;

  /**
   * Send user interaction like keystrokes
   */
  sendKeyStroke(): void;

  /**
   * List joined conversations
   */
  joinedConversations: Conversation[];

  /**
   * Active conversation messages received
   * @param callback
   */
  onConversationMessages(callback: (messages: Message[]) => void): void;

  /**
   * Active conversation notification received
   * @param callback
   */
  onConversationNotifications(callback: (notification: Notification) => void): void;
}

export class ChatApp implements IChat {
  private chatAppName: string;
  private tunnel: ITunnel;
  private chatTopic: ITopic;
  private notificationIdentifier?: string;
  private userConversations: Conversation[] = [];
  private _joinedConversations: Record<string, Conversation | null> = {};
  private activeConversationId?: string;
  private _activeConversation?: Conversation;

  constructor(chatAppName: string, tunnel: ITunnel) {
    this.chatAppName = chatAppName;
    this.tunnel = tunnel;
    this.chatTopic = this.tunnel.subscribe(chatAppName);
    this.setChatAppNotificationIdentifier();
    this.onReceive();
  }

  private onReceive() {
    // Handle incoming transmissions, these could be messages or notifications
    this.chatTopic.onReceive((transport: ITransport) => {
      const { identifiers } = transport;
      const conversationId = this.conversationIdFromIdentifier(identifiers);
      if (conversationId && this._joinedConversations[conversationId]) {
        this._joinedConversations[conversationId].transportHandler(transport);
      }
    });
  }

  /**
   * Get the conversation ID from received Identifiers
   * We use the ID to pass the transport to the transportHandler attached to the conversation
   * @param identifiers
   * @private
   */
  private conversationIdFromIdentifier(identifiers: string[]): string | undefined {
    if (!identifiers?.[0]) return;

    return (
      findIdentifierId(notificationTag, identifiers[0]) ??
      findIdentifierId(messageTag, identifiers[0])
    );
  }

  /**
   * Helper to quickly generate conversation identifiers
   * @param conversationIds
   * @private
   */
  private generateConversationIdentifiers(conversationIds: string[]) {
    return [
      ...conversationIds.map((conversationId) => setIdentifierId(messageTag, conversationId)),
      ...conversationIds.map((conversationId) => setIdentifierId(notificationTag, conversationId)),
    ];
  }

  /**
   * Set the chat app notification identifier
   * This allows us to send notifications to users that are part of the chat App.
   * Notification could be something like "new invite to conversation"
   * @private
   */
  private setChatAppNotificationIdentifier() {
    this.notificationIdentifier = setIdentifierId(chatTag, this.chatAppName);
    this.chatTopic.addIdentifiers({
      OR: [this.notificationIdentifier],
    });
  }

  get joinedConversations() {
    return Object.values(this._joinedConversations).filter((i) => i) as Conversation[];
  }

  public retrieveConversations(): Promise<Conversation[]> {
    // Use API call to retrieve a list of conversations
    // IS FAKE
    this.userConversations = [
      new Conversation({
        conversationId: "1",
        tunnelId: "29a3d020-0f31-498b-9e41-ee90f14d84b7",
        projectId: "849ea6bf-1f49-46e6-a7b5-9365abe17a87",
        type: EConversationType.GROUP,
        privateConversation: true,
      }),
    ];

    return new Promise((resolve, reject) => {
      resolve(this.userConversations);
    });
  }

  public joinConversation(conversationId: string): Conversation | undefined {
    const foundLocalUserConversation = this.userConversations.find((i) => i.conversationId === conversationId);
    if (!foundLocalUserConversation) {
      console.error(
        `Conversation ${conversationId} not found in local store. Please call retrieveConversations() first.`,
      );
      return;
    }

    this._joinedConversations[conversationId] = new Conversation(foundLocalUserConversation.serialize());
    this._joinedConversations[conversationId].setChatTopic(this.chatTopic);

    this.chatTopic.addIdentifiers({
      OR: this.generateConversationIdentifiers([conversationId]),
    });

    return this._joinedConversations[conversationId];
  }

  public joinConversations(conversationIds: string[]): ChatApp {
    // set all joined conversations
    conversationIds.forEach((conversationId) => this.joinConversation(conversationId));

    return this;
  }

  public leaveConversation(conversationId: string): ChatApp {
    if (!this._joinedConversations[conversationId]) {
      console.error(`User never joined conversation ${conversationId}.`);
      return this;
    }

    this._joinedConversations[conversationId] = null;
    delete this._joinedConversations[conversationId];

    this.chatTopic.removeIdentifiers(this.generateConversationIdentifiers([conversationId]));

    return this;
  }

  /**
   * Leave a list of conversations, and stop notifications for each conversation
   * @param conversationIds
   */
  public leaveConversations(conversationIds: string[]): ChatApp {
    conversationIds.forEach((conversationId) => this.leaveConversation(conversationId));

    return this;
  }

  setActiveConversation(conversationId: string): Conversation | undefined {
    this.activeConversationId = conversationId;

    if (this._joinedConversations[conversationId]) {
      this._activeConversation = this._joinedConversations[conversationId];
    }

    return this._activeConversation;
  }

  get activeConversation(): Conversation | undefined {
    return this._activeConversation;
  }

  sendMessage(sendMessage: ISendMessage) {
    this._activeConversation?.sendMessage(sendMessage);
  }

  sendKeyStroke() {
    this._activeConversation?.sendKeyStroke();
  }

  onConversationMessages(callback: (messages: Message[]) => void) {
    this._activeConversation?.onMessagesCallback(callback);
  }

  onConversationNotifications(callback: (notification: Notification) => void) {
    this._activeConversation?.onNotificationCallback(callback);
  }
}
