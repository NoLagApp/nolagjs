import { IFileDetails } from "./FileDetails";
import { ESpaceType } from "../../shared/enum/ESpaceType";
import { Message } from "./Message";
import { ITransport } from "../../shared/interfaces";
import { ChatNotification } from "./ChatNotification";
import { ITopic } from "../../shared/models/Topic";
import { ISendMessage } from "./MessageSend";
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
export declare class Space implements ISpace {
    spaceId: string;
    tunnelId: string;
    projectId: string;
    type: ESpaceType;
    privateSpace: boolean;
    name: string;
    description: string;
    avatar?: IFileDetails;
    messageNotificationCount: number;
    chatTopic: ITopic | undefined;
    _messages: Message[];
    _notificationCallback: ((notification: ChatNotification) => void)[];
    _onMessages?: (message: Message[]) => void;
    constructor(data: ISpace);
    setChatTopic(chatTopic: ITopic): void;
    get userId(): string | null | undefined;
    private setReadReceipt;
    private setReaction;
    private addMessage;
    private actionNotificationCallback;
    private notificationHandler;
    private messageHandler;
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
     * Notification callback will fire on all notification types
     * @param callback
     */
    onNotificationCallback(callback?: (notification: ChatNotification) => void): void;
    removeNotificationCallback(): void;
    /**
     * Will fire on messages received
     * @param callback
     */
    onMessagesCallback(callback?: (message: Message[]) => void): void;
    /**
     * Remove message callback
     */
    removeMessagesCallback(): void;
    /**
     * Split messages and notifications received
     * @param identifiers
     * @param data
     * @param presences
     */
    transportHandler({ identifiers, data, presences }: ITransport): void;
    /**
     * When the space comes into view, reset the message received count
     */
    clearMessageReceivedCount(): void;
    get spaceMessages(): Message[];
    serialize(): {
        spaceId: string;
        tunnelId: string;
        projectId: string;
        name: string;
        description: string;
        type: ESpaceType;
        privateSpace: boolean;
        avatar: IFileDetails | undefined;
    };
}
//# sourceMappingURL=Space.d.ts.map