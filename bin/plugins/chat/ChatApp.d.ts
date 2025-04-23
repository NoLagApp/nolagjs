import { Conversation } from "./Conversation";
import { ITunnel } from "../../client";
import { ISendMessage } from "./MessageSend";
import { Message } from "./Message";
import { Notification } from "./Notification";
export interface IChat {
    /**
     * Retrieve a list of rooms a user has joined, or was invited to.
     * The user's access token will be used to retrieve the list
     */
    retrieveRooms(): Promise<Conversation[]>;
    /**
     * Join a single chat room
     * @param roomId
     */
    joinRoom(roomId: string): Conversation | undefined;
    /**
     * Leave a single chat room
     * @param roomId
     */
    leaveRoom(roomId: string): ChatApp;
    /**
     * Join a list of rooms based on selected roomsIds
     * A user might have access to multiple Rooms, but they only want to join
     * some of them for messages
     * @param roomIds
     */
    joinRooms(roomIds: string[]): ChatApp;
    /**
     * Can leave joined rooms
     * @param roomIds
     */
    leaveRooms(roomIds: string[]): ChatApp;
    /**
     * Set the current active room view,
     * a user might view multiple rooms at the same time,
     * but they can only send a message in one room
     * @param roomId
     */
    setActiveRoom(roomId: string): Conversation | undefined;
    /**
     * Get the current active room context
     */
    get activeRoom(): Conversation | undefined;
    /**
     * Send a new message in the context of the active Room
     * @param sendMessage
     */
    sendMessage(sendMessage: ISendMessage): void;
    /**
     * Send user interaction like keystrokes
     */
    sendKeyStroke(): void;
    /**
     * List joined rooms
     */
    joinedRooms: Conversation[];
    /**
     * Active room messages received
     * @param callback
     */
    onRoomMessages(callback: (messages: Message[]) => void): void;
    /**
     * Active room notification received
     * @param callback
     */
    onConversationNotifications(callback: (notification: Notification) => void): void;
}
export declare class ChatApp implements IChat {
    private chatAppName;
    private tunnel;
    private chatTopic;
    private notificationIdentifier?;
    private userRooms;
    private _joinedRooms;
    private activeRoomId?;
    private _activeRoom?;
    constructor(chatAppName: string, tunnel: ITunnel);
    private onReceive;
    /**
     * Get the room ID from received Identifiers
     * We use the ID to pass the transport to the transportHandler attached to the room
     * @param identifiers
     * @private
     */
    private roomIdFromIdentifier;
    /**
     * Helper to quickly generate room identifiers
     * @param roomIds
     * @private
     */
    private generateRoomIdentifiers;
    /**
     * Set the chat app notification identifier
     * This allows us to send notifications to users that are part of the chat App.
     * Notification could be something like "new invite to room"
     * @private
     */
    private setChatAppNotificationIdentifier;
    get joinedRooms(): Conversation[];
    retrieveRooms(): Promise<Conversation[]>;
    joinRoom(roomId: string): Conversation | undefined;
    joinRooms(roomIds: string[]): ChatApp;
    leaveRoom(roomId: string): ChatApp;
    /**
     * Leave a list of rooms, and stop notifications for each room
     * @param roomIds
     */
    leaveRooms(roomIds: string[]): ChatApp;
    setActiveRoom(roomId: string): Conversation | undefined;
    get activeRoom(): Conversation | undefined;
    sendMessage(sendMessage: ISendMessage): void;
    sendKeyStroke(): void;
    onRoomMessages(callback: (messages: Message[]) => void): void;
    onConversationNotifications(callback: (notification: Notification) => void): void;
}
//# sourceMappingURL=ChatApp.d.ts.map