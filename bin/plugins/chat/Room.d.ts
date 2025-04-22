import { IFileDetails } from "./FileDetails";
import { ERoomType } from "../../shared/enum/ERoomType";
import { Message } from "./Message";
import { ITransport } from "../../shared/interfaces";
import { Notification } from "./Notification";
import { ITopic } from "../../shared/models/Topic";
import { ISendMessage } from "./MessageSend";
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
export declare class Room implements IRooms {
    roomId: string;
    tunnelId: string;
    projectId: string;
    type: ERoomType;
    privateRoom: boolean;
    avatar?: IFileDetails;
    messageNotificationCount: number;
    chatTopic: ITopic;
    userId: string;
    _messages: Message[];
    _keyStrokeCallback?: (notification: Notification) => void;
    constructor(data: IRooms, chatTopic: ITopic, userId: string);
    private setReadReceipt;
    private sendReadReceipt;
    private setReaction;
    private addMessage;
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
    keyStrokeCallback(callback?: (notification: Notification) => void): void;
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
    serialize(): {
        roomId: string;
        tunnelId: string;
        projectId: string;
        type: ERoomType;
        privateRoom: boolean;
        avatar: IFileDetails | undefined;
    };
}
//# sourceMappingURL=Room.d.ts.map