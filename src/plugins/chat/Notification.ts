import { ENotificationType } from "../../shared/enum/ENotificationType";
import { ReadReceipt } from "./ReadReceipt";
import { Reaction } from "./Reaction";

export interface INotification {
  type: ENotificationType,
  userId: string,
  message?: string,
  readReceipt?: ReadReceipt,
  reaction?: Reaction
}

export class Notification implements INotification {
  type: ENotificationType;
  userId: string;
  message?: string;
  readReceipt?: ReadReceipt;
  reaction?: Reaction

  constructor(data: INotification) {
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