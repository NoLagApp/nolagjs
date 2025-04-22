import { FileDetails, IFileDetails } from "./FileDetails";
import { IReadReceipt, ReadReceipt } from "./ReadReceipt";
import { IReaction, Reaction } from "./Reaction";
import dayjs from "dayjs";
import { uuid } from "../../shared/utils/uuid";

export interface ISendMessage {
  messageText: string;
  files?: IFileDetails[];
  mentionMessageId?: string;
}

export class SendMessage {
  messageText: string;
  files: FileDetails[] = [];
  mentionMessageId?: string;

  constructor(data: ISendMessage) {
    this.messageText = data.messageText;
    this.files = Array.isArray(data.files)
      ? data.files.map((file) => new FileDetails(file))
      : [];
    this.mentionMessageId = data.mentionMessageId;
  }

  serialize() {
    return {
      messageText: this.messageText,
      files: this.files,
      mentionMessageId: this.mentionMessageId,
    };
  }
}
