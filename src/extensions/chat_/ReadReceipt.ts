import dayjs from "dayjs";

export interface IReadReceipt {
  messageId: string;
  readDate?: string; // ISO8601 with timezone
  userId: string;
}

export class ReadReceipt implements IReadReceipt {
  messageId: string;
  readDate: string; // ISO8601 with timezone
  userId: string;

  constructor(data: IReadReceipt) {
    this.messageId = data.messageId;
    this.readDate = !data.readDate ? dayjs().toISOString() : data.readDate;
    this.userId = data.userId;
  }
}