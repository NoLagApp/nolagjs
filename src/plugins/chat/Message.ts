import { FileDetails, IFileDetails } from "./FileDetails";
import { IReadReceipt, ReadReceipt } from "./ReadReceipt";
import { IReaction, Reaction } from "./Reaction";

export interface IMessage {
  messageId: string;
  sentDate: string;
  messageText: string;
  files: IFileDetails[];
  mentionMessageId: string;
  originalMessageId: string;
  chunk: number;
  userId: string;
  readReceipts: IReadReceipt[];
  reactions: IReaction[];
}

export class Message {
  messageId: string;
  sentDate: string;
  messageText: string;
  files: FileDetails[] = [];
  mentionMessageId: string;
  originalMessageId: string;
  chunk: number;
  userId: string;
  readReceipts: ReadReceipt[] = [];
  reactions: Reaction[] = [];

  constructor(data: IMessage) {
    this.messageId = data.messageId;
    this.sentDate = data.sentDate;
    this.messageText = data.messageText;
    this.files = Array.isArray(data.files)
      ? data.files.map((file) => new FileDetails(file))
      : [];
    this.mentionMessageId = data.mentionMessageId;
    this.originalMessageId = data.originalMessageId;
    this.chunk = data.chunk;
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
}
