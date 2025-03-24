import { EConnectionStatus } from "../../enum";
export interface IFunctionQueueIdentifier {
    topicName?: string;
    initiate?: EConnectionStatus.Initiate;
    authentication?: EConnectionStatus.Authentication;
    identifiers?: string[];
    presence?: string;
}
export declare class AcknowledgeQueueIdentifier {
    private topicName?;
    private initiate?;
    private authentication?;
    private identifiers?;
    private presence?;
    constructor(data: IFunctionQueueIdentifier);
    private identifiersToOrderedString;
    generateKey(): string;
}
//# sourceMappingURL=AcknowledgeQueueIdentifier.d.ts.map