import { ENotificationType } from "../../shared/enum/ENotificationType";
import { ReadReceipt } from "./ReadReceipt";
import { Reaction } from "./Reaction";

export interface IChatNotification {
  type: ENotificationType,
  userId: string,
  message?: string,
  readReceipt?: ReadReceipt,
  reaction?: Reaction
}

export class ChatNotification implements IChatNotification {
  type: ENotificationType;
  userId: string;
  message?: string;
  readReceipt?: ReadReceipt;
  reaction?: Reaction

  constructor(data: IChatNotification) {
    this.type = data.type;
    this.userId = data.userId;
    this.message = data.message;
    this.readReceipt = data.readReceipt;
    this.reaction = data.reaction;
  }

  serialize() {
    return {
      type: this.type,
      userId: this.userId,
      message: this.message,
      readReceipt: this.readReceipt,
      reaction: this.reaction
    }
  }
}