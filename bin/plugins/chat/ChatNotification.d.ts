import { ENotificationType } from "../../shared/enum/ENotificationType";
import { ReadReceipt } from "./ReadReceipt";
import { Reaction } from "./Reaction";
export interface IChatNotification {
    type: ENotificationType;
    userId: string;
    message?: string;
    readReceipt?: ReadReceipt;
    reaction?: Reaction;
}
export declare class ChatNotification implements IChatNotification {
    type: ENotificationType;
    userId: string;
    message?: string;
    readReceipt?: ReadReceipt;
    reaction?: Reaction;
    constructor(data: IChatNotification);
    serialize(): {
        type: ENotificationType;
        userId: string;
        message: string | undefined;
        readReceipt: ReadReceipt | undefined;
        reaction: Reaction | undefined;
    };
}
//# sourceMappingURL=ChatNotification.d.ts.map