export interface IFunctionQueueIdentifier {
  topicName: string;
  identifiers?: string[];
}

export class AcknowledgeQueueIdentifier {
  private tunnelName: string;
  private identifiers?: string[];

  constructor(data: IFunctionQueueIdentifier) {
    this.tunnelName = data.topicName;
    this.identifiers = data.identifiers;
  }

  private identifiersToOrderedString(
    identifiers?: string[],
  ): string | undefined {
    if (!identifiers) return undefined;
    return identifiers.sort().join("_");
  }

  generateKey(): string {
    return [
      `${this.tunnelName}`,
      this.identifiersToOrderedString(this.identifiers),
    ]
      .filter((i) => i)
      .join("_");
  }
}
