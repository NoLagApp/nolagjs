import { FileDetails, IFileDetails } from "./FileDetails";
import { IReadReceipt, ReadReceipt } from "./ReadReceipt";
import { IReaction, Reaction } from "./Reaction";
import dayjs from "dayjs";
import { uuid } from "../../shared/utils/uuid";

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

export class Message {
  messageId: string;
  sentDate: string;
  messageText: string;
  files: FileDetails[] = [];
  mentionMessageId?: string;
  originalMessageId: string;
  userId: string;
  readReceipts: ReadReceipt[] = [];
  reactions: Reaction[] = [];

  constructor(data: IMessage) {
    this.messageId = data.messageId ?? uuid();
    this.sentDate = data.sentDate ?? dayjs().toISOString();
    this.messageText = data.messageText;
    this.files = Array.isArray(data.files)
      ? data.files.map((file) => new FileDetails(file))
      : [];
    this.mentionMessageId = data.mentionMessageId;
    this.originalMessageId = data.originalMessageId ?? this.messageId;
    this.userId = data.userId;
    this.readReceipts = Array.isArray(data.readReceipts)
      ? data.readReceipts.map((readReceipt) => new ReadReceipt(readReceipt))
      : [];
    this.reactions = Array.isArray(data.reactions)
      ? data.reactions.map((reaction) => new Reaction(reaction))
      : [];
  }

  setReadReceipt(readReceipt: ReadReceipt) {
    this.readReceipts.push(readReceipt);
  }

  setReaction(reaction: Reaction) {
    this.reactions.push(reaction);
  }

  serialize() {
    return {
      messageId: this.messageId,
      sentDate: this.sentDate,
      messageText: this.messageText,
      files: this.files,
      mentionMessageId: this.mentionMessageId,
      originalMessageId: this.originalMessageId,
      userId: this.userId,
    };
  }
}
