import { Space } from "./Space";
import { ITunnel } from "../../client";
import { ISendMessage } from "./MessageSend";
import { Message } from "./Message";
import { ChatNotification } from "./ChatNotification";
export interface IChat {
    /**
     * Retrieve a list of spaces a user has joined, or was invited to.
     * The user's access token will be used to retrieve the list
     */
    retrieveSpaces(): Promise<Space[]>;
    /**
     * Join a single chat space
     * @param space
     */
    joinSpace(space: Space): Space;
    /**
     * Leave a single chat space
     * @param spaceId
     */
    leaveSpace(spaceId: string): ChatApp;
    /**
     * Join a list of spaces based on selected spacesIds
     * A user might have access to multiple Spaces, but they only want to join
     * some of them for messages
     * @param spaceIds
     */
    joinSpaces(spaceIds: Space[]): ChatApp;
    /**
     * Can leave joined spaces
     * @param spaceIds
     */
    leaveSpaces(spaceIds: string[]): ChatApp;
    /**
     * Set the current active space view,
     * a user might view multiple spaces at the same time,
     * but they can only send a message in one space
     * @param spaceId
     */
    setActiveSpace(spaceId: string): Space | undefined;
    /**
     * Get the current active space context
     */
    get activeSpace(): Space | undefined;
    /**
     * Send a new message in the context of the active Space
     * @param sendMessage
     */
    sendMessage(sendMessage: ISendMessage): void;
    /**
     * Send user interaction like keystrokes
     */
    sendKeyStroke(): void;
    /**
     * List joined spaces
     */
    joinedSpaces: Space[];
    /**
     * Active space messages received
     * @param callback
     */
    onSpaceMessagesEvent(callback: (messages: Message[]) => void): void;
    /**
     * Remove callback
     */
    removeSpaceMessagesEvent(): void;
    /**
     * Active space notification received
     * @param callback
     */
    onSpaceNotificationEvent(callback: (notification: ChatNotification) => void): void;
    /**
     * Remove Notification events
     */
    removeNotificationEvent(): void;
}
export declare class ChatApp implements IChat {
    private chatAppName;
    private tunnel;
    private chatTopic;
    private notificationIdentifier?;
    private userSpaces;
    private _joinedSpaces;
    private activeSpaceId?;
    private _activeSpace?;
    private _onSpaceMessagesEvent?;
    private _onSpaceNotificationEvent?;
    constructor(chatAppName: string, tunnel: ITunnel);
    private onReceive;
    /**
     * Get the space ID from received Identifiers
     * We use the ID to pass the transport to the transportHandler attached to the space
     * @param identifiers
     * @private
     */
    private spaceIdFromIdentifier;
    /**
     * Helper to quickly generate space identifiers
     * @param spaceIds
     * @private
     */
    private generateSpaceIdentifiers;
    /**
     * Set the chat app notification identifier
     * This allows us to send notifications to users that are part of the chat App.
     * Notification could be something like "new invite to space"
     * @private
     */
    private setChatAppNotificationIdentifier;
    get joinedSpaces(): Space[];
    retrieveSpaceById(spaceId: string): Promise<Space | undefined>;
    retrieveSpaces(): Promise<Space[]>;
    joinSpace(space: Space): Space;
    joinSpaces(spaceIds: Space[]): ChatApp;
    leaveSpace(spaceId: string): ChatApp;
    /**
     * Leave a list of spaces, and stop notifications for each space
     * @param spaceIds
     */
    leaveSpaces(spaceIds: string[]): ChatApp;
    setActiveSpace(spaceId: string): Space | undefined;
    get activeSpace(): Space | undefined;
    sendMessage(sendMessage: ISendMessage): void;
    sendKeyStroke(): void;
    onSpaceMessagesEvent(callback: (messages: Message[]) => void): void;
    removeSpaceMessagesEvent(): void;
    onSpaceNotificationEvent(callback: (notification: ChatNotification) => void): void;
    removeNotificationEvent(): void;
}
//# sourceMappingURL=ChatApp.d.ts.map