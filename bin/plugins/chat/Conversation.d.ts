import { IFileDetails } from "./FileDetails";
import { ERoomType } from "../../shared/enum/ERoomType";
import { Message } from "./Message";
import { ITransport } from "../../shared/interfaces";
import { Notification } from "./Notification";
import { ITopic } from "../../shared/models/Topic";
import { ISendMessage } from "./MessageSend";
export interface IConversation {
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
export declare class Conversation implements IConversation {
    roomId: string;
    tunnelId: string;
    projectId: string;
    type: ERoomType;
    privateRoom: boolean;
    avatar?: IFileDetails;
    messageNotificationCount: number;
    chatTopic: ITopic | undefined;
    _messages: Message[];
    _notificationCallback: ((notification: Notification) => void)[];
    _onMessages?: (message: Message[]) => void;
    constructor(data: IConversation);
    setChatTopic(chatTopic: ITopic): void;
    get userId(): string | null | undefined;
    private setReadReceipt;
    private setReaction;
    private addMessage;
    private actionNotificationCallback;
    private notificationHandler;
    private messageHandler;
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
     * Rooms user KeyStroke Callback
     * This callback will fire when any of the user in the room sends a keyStroke
     * @param callback
     */
    onNotificationCallback(callback?: (notification: Notification) => void): void;
    onMessagesCallback(callback?: (message: Message[]) => void): void;
    /**
     * Split messages and notifications received
     * @param identifiers
     * @param data
     * @param presences
     */
    transportHandler({ identifiers, data, presences }: ITransport): void;
    /**
     * When the room comes into view, reset the message received count
     */
    clearMessageReceivedCount(): void;
    get roomMessages(): Message[];
    serialize(): {
        roomId: string;
        tunnelId: string;
        projectId: string;
        type: ERoomType;
        privateRoom: boolean;
        avatar: IFileDetails | undefined;
    };
}
//# sourceMappingURL=Conversation.d.ts.map