export interface IReadReceipt {
    messageId: string;
    readDate?: string;
    userId: string;
}
export declare class ReadReceipt implements IReadReceipt {
    messageId: string;
    readDate: string;
    userId: string;
    constructor(data: IReadReceipt);
}
//# sourceMappingURL=ReadReceipt.d.ts.map