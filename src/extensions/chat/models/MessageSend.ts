import { FileDetails, IFileDetails } from "./FileDetails";

export interface ISendMessage {
  messageText: string;
  files?: IFileDetails[];
  mentionMessageId?: string;
}

export class MessageSend {
  messageText: string;
  files: FileDetails[] = [];
  replyMessageId?: string;

  constructor(data: ISendMessage) {
    this.messageText = data.messageText;
    this.files = Array.isArray(data.files)
      ? data.files.map((file) => new FileDetails(file))
      : [];
    this.replyMessageId = data.mentionMessageId;
  }

  serialize() {
    return {
      messageText: this.messageText,
      files: this.files,
      mentionMessageId: this.replyMessageId,
    };
  }
}
