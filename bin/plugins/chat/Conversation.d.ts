import { IFileDetails } from "./FileDetails";
import { EConversationType } from "../../shared/enum/EConversationType";
import { Message } from "./Message";
import { ITransport } from "../../shared/interfaces";
import { Notification } from "./Notification";
import { ITopic } from "../../shared/models/Topic";
import { ISendMessage } from "./MessageSend";
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
export declare class Conversation implements IConversation {
    conversationId: string;
    tunnelId: string;
    projectId: string;
    type: EConversationType;
    privateConversation: boolean;
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
     * Send a new message in the context of the active Conversation
     * @param sendMessage
     */
    sendMessage(sendMessage: ISendMessage): void;
    /**
     * Send user interaction like keystrokes
     */
    sendKeyStroke(): void;
    /**
     * Conversations user KeyStroke Callback
     * This callback will fire when any of the user in the conversation sends a keyStroke
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
     * When the conversation comes into view, reset the message received count
     */
    clearMessageReceivedCount(): void;
    get conversationMessages(): Message[];
    serialize(): {
        conversationId: string;
        tunnelId: string;
        projectId: string;
        type: EConversationType;
        privateConversation: boolean;
        avatar: IFileDetails | undefined;
    };
}
//# sourceMappingURL=Conversation.d.ts.map