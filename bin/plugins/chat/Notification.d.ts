import { ENotificationType } from "../../shared/enum/ENotificationType";
import { ReadReceipt } from "./ReadReceipt";
import { Reaction } from "./Reaction";
export interface INotification {
    type: ENotificationType;
    userId: string;
    message?: string;
    readReceipt?: ReadReceipt;
    reaction?: Reaction;
}
export declare class Notification implements INotification {
    type: ENotificationType;
    userId: string;
    message?: string;
    readReceipt?: ReadReceipt;
    reaction?: Reaction;
    constructor(data: INotification);
    serialize(): {
        type: ENotificationType;
        userId: string;
        message: string | undefined;
        readReceipt: ReadReceipt | undefined;
        reaction: Reaction | undefined;
    };
}
//# sourceMappingURL=Notification.d.ts.map