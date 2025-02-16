import { EConnectionStatus } from "../../enum";

export interface IFunctionQueueIdentifier {
  topicName?: string;
  initiate?: EConnectionStatus.Initiate
  authentication?: EConnectionStatus.Authentication;
  identifiers?: string[];
  presence?: string[];
}

export class AcknowledgeQueueIdentifier {
  private topicName?: string | undefined;
  private initiate?: EConnectionStatus.Initiate
  private authentication?: EConnectionStatus.Authentication;
  private identifiers?: string[];
  private presence?: string[];

  constructor(data: IFunctionQueueIdentifier) {
    this.topicName = data.topicName;
    this.initiate = data.initiate;
    this.authentication = data.authentication;
    this.identifiers = data.identifiers;
    this.presence = data.presence;
  }

  private identifiersToOrderedString(
    identifiers?: string[],
  ): string | undefined {
    if (!identifiers || !identifiers?.length) return undefined;
    return identifiers.sort().join("_");
  }

  generateKey(): string {
    return [
      this.initiate,
      this.authentication,
      this.topicName,
      this.identifiersToOrderedString(this.identifiers),
      this.identifiersToOrderedString(this.presence),
    ]
      .filter((i) => i)
      .join("_");
  }
}
