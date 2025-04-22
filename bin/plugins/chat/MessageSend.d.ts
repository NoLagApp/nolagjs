import { FileDetails, IFileDetails } from "./FileDetails";
export interface ISendMessage {
    messageText: string;
    files?: IFileDetails[];
    mentionMessageId?: string;
}
export declare class MessageSend {
    messageText: string;
    files: FileDetails[];
    replyMessageId?: string;
    constructor(data: ISendMessage);
    serialize(): {
        messageText: string;
        files: FileDetails[];
        mentionMessageId: string | undefined;
    };
}
//# sourceMappingURL=MessageSend.d.ts.map