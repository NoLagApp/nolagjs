import { FileDetails, IFileDetails } from "./FileDetails";
import { IReadReceipt, ReadReceipt } from "./ReadReceipt";
import { IReaction, Reaction } from "./Reaction";
export interface IMessage {
    messageId?: string;
    sentDate?: string;
    messageText: string;
    files?: IFileDetails[];
    mentionMessageId?: string;
    originalMessageId?: string;
    userId: string;
    readReceipts?: IReadReceipt[];
    reactions?: IReaction[];
}
export declare class Message {
    messageId: string;
    sentDate: string;
    messageText: string;
    files: FileDetails[];
    mentionMessageId?: string;
    originalMessageId: string;
    userId: string;
    readReceipts: ReadReceipt[];
    reactions: Reaction[];
    constructor(data: IMessage);
    setReadReceipt(readReceipt: ReadReceipt): void;
    setReaction(reaction: Reaction): void;
    serialize(): {
        messageId: string;
        sentDate: string;
        messageText: string;
        files: FileDetails[];
        mentionMessageId: string | undefined;
        originalMessageId: string;
        userId: string;
    };
}
//# sourceMappingURL=Message.d.ts.map