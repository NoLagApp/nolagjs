import { Conversation } from "./Conversation";
import { ITunnel } from "../../client";
import { ISendMessage } from "./MessageSend";
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
export declare class ChatApp implements IChat {
    private chatAppName;
    private tunnel;
    private chatTopic;
    private notificationIdentifier?;
    private userConversations;
    private _joinedConversations;
    private activeConversationId?;
    private _activeConversation?;
    constructor(chatAppName: string, tunnel: ITunnel);
    private onReceive;
    /**
     * Get the conversation ID from received Identifiers
     * We use the ID to pass the transport to the transportHandler attached to the conversation
     * @param identifiers
     * @private
     */
    private conversationIdFromIdentifier;
    /**
     * Helper to quickly generate conversation identifiers
     * @param conversationIds
     * @private
     */
    private generateConversationIdentifiers;
    /**
     * Set the chat app notification identifier
     * This allows us to send notifications to users that are part of the chat App.
     * Notification could be something like "new invite to conversation"
     * @private
     */
    private setChatAppNotificationIdentifier;
    get joinedConversations(): Conversation[];
    retrieveConversations(): Promise<Conversation[]>;
    joinConversation(conversationId: string): Conversation | undefined;
    joinConversations(conversationIds: string[]): ChatApp;
    leaveConversation(conversationId: string): ChatApp;
    /**
     * Leave a list of conversations, and stop notifications for each conversation
     * @param conversationIds
     */
    leaveConversations(conversationIds: string[]): ChatApp;
    setActiveConversation(conversationId: string): Conversation | undefined;
    get activeConversation(): Conversation | undefined;
    sendMessage(sendMessage: ISendMessage): void;
    sendKeyStroke(): void;
    onConversationMessages(callback: (messages: Message[]) => void): void;
    onConversationNotifications(callback: (notification: Notification) => void): void;
}
//# sourceMappingURL=ChatApp.d.ts.map