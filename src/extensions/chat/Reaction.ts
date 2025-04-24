export interface IReaction {
  messageId?: string;
  emoji?: string;
  userId: string;
}
export class Reaction {
  messageId?: string;
  emoji?: string;
  userId: string;
  constructor(data: IReaction) {
    this.messageId = data.messageId;
    this.emoji = data.emoji;
    this.userId = data.userId;
  }
}