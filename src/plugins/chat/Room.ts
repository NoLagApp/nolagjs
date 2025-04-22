import { FileDetails, IFileDetails } from "./FileDetails";
import { ERoomType } from "../../shared/enum/ERoomType";
import { Message } from "./Message";
import { ReadReceipt } from "./ReadReceipt";
import { Reaction } from "./Reaction";

export interface IRooms {
  roomId: string;
  tunnelId: string;
  projectId: string;
  type: ERoomType;
  privateRoom: boolean;
  avatar?: IFileDetails;
}

export class Room implements IRooms {
  roomId: string;
  tunnelId: string;
  projectId: string;
  type: ERoomType;
  privateRoom: boolean;
  avatar?: IFileDetails;
  _messages: Message[] = [];

  constructor(data: IRooms) {
    this.roomId = data.roomId;
    this.tunnelId = data.tunnelId;
    this.projectId = data.projectId;
    this.type = data.type;
    this.privateRoom = data.privateRoom;
    this.avatar = data.avatar ? new FileDetails(data.avatar) : undefined;
  }

  setReadReceipt(readReceipt: ReadReceipt) {
    const message = this._messages.find((message) => message.messageId === readReceipt.messageId);
    if (message) {
      message.setReadReceipt(readReceipt);
    }
  }

  setReactions(reaction: Reaction) {
    const message = this._messages.find((message) => message.messageId === reaction.messageId);
    if (message) {
      message.setReaction(reaction);
    }
  }

  addMessage(message: Message) {
    // TODO if when we support CHUNKS, this will need to be updated
    this._messages.push(message);
  }


  serialize() {
    return {
      roomId: this.roomId,
      tunnelId: this.tunnelId,
      projectId: this.projectId,
      type: this.type,
      privateRoom: this.privateRoom,
      avatar: this.avatar,
    };
  }
}
