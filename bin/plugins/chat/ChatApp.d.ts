import { Room } from "./Room";
import { ITunnel } from "../../client";
import { ISendMessage } from "./MessageSend";
export interface IChat {
    /**
     * Retrieve a list of rooms a user has joined, or was invited to.
     * The user's access token will be used to retrieve the list
     */
    retrieveRooms(): Promise<Room[]>;
    /**
     * Join a single chat room
     * @param roomId
     */
    joinRoom(roomId: string): Room | undefined;
    /**
     * Leave a single chat room
     * @param roomId
     */
    leaveRoom(roomId: string): string | undefined;
    /**
     * Join a list of rooms based on selected roomsIds
     * A user might have access to multiple Rooms, but they only want to join
     * some of them for messages
     * @param roomIds
     */
    joinRooms(roomIds: string[]): void;
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
    setActiveRoom(roomId: string): Room | undefined;
    /**
     * Get the current active room context
     */
    activeRoom(): Room | undefined;
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
    joinedRooms: Room[];
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
    get joinedRooms(): Room[];
    retrieveRooms(): Promise<Room[]>;
    joinRoom(roomId: string): Room | undefined;
    joinRooms(roomIds: string[]): void;
    leaveRoom(roomId: string): string | undefined;
    /**
     * Leave a list of rooms, and stop notifications for each room
     * @param roomIds
     */
    leaveRooms(roomIds: string[]): ChatApp;
    setActiveRoom(roomId: string): Room | undefined;
    activeRoom(): Room | undefined;
    sendMessage(sendMessage: ISendMessage): void;
    sendKeyStroke(): void;
}
//# sourceMappingURL=ChatApp.d.ts.map