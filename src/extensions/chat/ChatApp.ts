import { Space } from "./Space";
import { ITunnel } from "../../client";
import { ITopic } from "../../shared/models/Topic";
import { ITransport } from "../../shared/interfaces";
import {
  findIdentifierId,
  setIdentifierId,
} from "../../shared/utils/identifiers";
import { ISendMessage } from "./MessageSend";
import { chatTag, messageTag, notificationTag } from "./Tags";
import { ESpaceType } from "../../shared/enum/ESpaceType";
import { Message } from "./Message";
import { ChatNotification } from "./ChatNotification";

const fakeSpaces = [
  new Space({
    name: "A space to chill",
    description: "Where the cool kids come to have fun!",
    spaceId: "1",
    tunnelId: "29a3d020-0f31-498b-9e41-ee90f14d84b7",
    projectId: "849ea6bf-1f49-46e6-a7b5-9365abe17a87",
    type: ESpaceType.GROUP,
    privateSpace: true,
  }),
  new Space({
    name: "Space the final frontier",
    description: "Talk about all things space!",
    spaceId: "2",
    tunnelId: "29a3d020-0f31-498b-9e41-ee90f14d84b7",
    projectId: "849ea6bf-1f49-46e6-a7b5-9365abe17a87",
    type: ESpaceType.GROUP,
    privateSpace: true,
  }),
];

export interface IChat {
  /**
   * Retrieve a list of spaces a user has joined, or was invited to.
   * The user's access token will be used to retrieve the list
   */
  retrieveSpaces(): Promise<Space[]>;

  /**
   * Join a single chat space
   * @param space
   */
  joinSpace(space: Space): Space;

  /**
   * Leave a single chat space
   * @param spaceId
   */
  leaveSpace(spaceId: string): ChatApp;

  /**
   * Join a list of spaces based on selected spacesIds
   * A user might have access to multiple Spaces, but they only want to join
   * some of them for messages
   * @param spaceIds
   */
  joinSpaces(spaceIds: Space[]): ChatApp;

  /**
   * Can leave joined spaces
   * @param spaceIds
   */
  leaveSpaces(spaceIds: string[]): ChatApp;

  /**
   * Set the current active space view,
   * a user might view multiple spaces at the same time,
   * but they can only send a message in one space
   * @param spaceId
   */
  setActiveSpace(spaceId: string): Space | undefined;

  /**
   * Send a new message in the context of the active Space
   * @param sendMessage
   */
  sendMessage(sendMessage: ISendMessage): void;

  /**
   * Send user interaction like keystrokes
   */
  sendKeyStroke(): void;

  /**
   * List joined spaces
   */
  joinedSpaces: Space[];

  /**
   * Active space messages received
   * @param callback
   */
  onSpaceMessagesEvent(callback: (messages: Message[]) => void): void;

  /**
   * Remove callback
   */
  removeSpaceMessagesEvent(): void;

  /**
   * Active space notification received
   * @param callback
   */
  onSpaceNotificationEvent(
    callback: (notification: ChatNotification) => void,
  ): void;

  /**
   * Remove Notification events
   */
  removeNotificationEvent(): void;
}

export class ChatApp implements IChat {
  private chatAppName: string;
  private tunnel: ITunnel;
  private chatTopic: ITopic;
  private notificationIdentifier?: string;
  private userSpaces: Space[] = [];
  private _joinedSpaces: Record<string, Space | null> = {};
  private activeSpaceId?: string;
  private _activeSpace?: Space;
  private _onSpaceMessagesEvent?: (messages: Message[]) => void;
  private _onSpaceNotificationEvent?: (messages: ChatNotification) => void;

  constructor(chatAppName: string, tunnel: ITunnel) {
    this.chatAppName = chatAppName;
    this.tunnel = tunnel;
    this.chatTopic = this.tunnel.subscribe(chatAppName);
    this.setChatAppNotificationIdentifier();
    this.onReceive();
  }

  private onReceive() {
    // Handle incoming transmissions, these could be messages or notifications
    this.chatTopic.onReceive((transport: ITransport) => {
      const { identifiers } = transport;
      const spaceId = this.spaceIdFromIdentifier(identifiers);
      if (spaceId && this._joinedSpaces[spaceId]) {
        this._joinedSpaces[spaceId].transportHandler(transport);
      }
    });
  }

  /**
   * Get the space ID from received Identifiers
   * We use the ID to pass the transport to the transportHandler attached to the space
   * @param identifiers
   * @private
   */
  private spaceIdFromIdentifier(identifiers: string[]): string | undefined {
    if (!identifiers?.[0]) return;

    return (
      findIdentifierId(notificationTag, identifiers[0]) ??
      findIdentifierId(messageTag, identifiers[0])
    );
  }

  /**
   * Helper to quickly generate space identifiers
   * @param spaceIds
   * @private
   */
  private generateSpaceIdentifiers(spaceIds: string[]) {
    return [
      ...spaceIds.map((spaceId) => setIdentifierId(messageTag, spaceId)),
      ...spaceIds.map((spaceId) => setIdentifierId(notificationTag, spaceId)),
    ];
  }

  /**
   * Set the chat app notification identifier
   * This allows us to send notifications to users that are part of the chat App.
   * Notification could be something like "new invite to space"
   * @private
   */
  private setChatAppNotificationIdentifier() {
    this.notificationIdentifier = setIdentifierId(chatTag, this.chatAppName);
    this.chatTopic.addIdentifiers({
      OR: [this.notificationIdentifier],
    });
  }

  get joinedSpaces() {
    return Object.values(this._joinedSpaces).filter((i) => i) as Space[];
  }

  public retrieveSpaceById(spaceId: string): Promise<Space | undefined> {
    // Use API call to retrieve a list of spaces
    // IS FAKE

    return new Promise((resolve, reject) => {
      const foundSpace = fakeSpaces.find((space) => space.spaceId === spaceId);
      if(foundSpace) {
        resolve(foundSpace);
      }
    });
  }

  public retrieveSpaces(): Promise<Space[]> {
    // Use API call to retrieve a list of spaces
    // IS FAKE

    return new Promise((resolve, reject) => {
      resolve(fakeSpaces);
    });
  }

  public joinSpace(space: Space): Space {
    this._joinedSpaces[space.spaceId] = new Space(space.serialize());
    this._joinedSpaces[space.spaceId]?.setChatTopic(this.chatTopic);

    this.chatTopic.addIdentifiers({
      OR: this.generateSpaceIdentifiers([space.spaceId]),
    });

    return this._joinedSpaces[space.spaceId] as Space;
  }

  public joinSpaces(spaceIds: Space[]): ChatApp {
    // set all joined spaces
    spaceIds.forEach((space) => this.joinSpace(space));

    return this;
  }

  public leaveSpace(spaceId: string): ChatApp {
    if (!this._joinedSpaces[spaceId]) {
      console.error(`User never joined space ${spaceId}.`);
      return this;
    }

    this._joinedSpaces[spaceId] = null;
    delete this._joinedSpaces[spaceId];

    this.chatTopic.removeIdentifiers(this.generateSpaceIdentifiers([spaceId]));

    return this;
  }

  /**
   * Leave a list of spaces, and stop notifications for each space
   * @param spaceIds
   */
  public leaveSpaces(spaceIds: string[]): ChatApp {
    spaceIds.forEach((spaceId) => this.leaveSpace(spaceId));

    return this;
  }

  setActiveSpace(spaceId: string): Space | undefined {
    if (this._activeSpace) {
      this._activeSpace.removeMessagesCallback();
      this._activeSpace.removeNotificationCallback();
    }

    this.activeSpaceId = spaceId;

    if (this._joinedSpaces[spaceId]) {
      this._activeSpace = this._joinedSpaces[spaceId];
    }

    this._activeSpace?.onMessagesCallback(this._onSpaceMessagesEvent);
    this._activeSpace?.onNotificationCallback(this._onSpaceNotificationEvent);

    return this._activeSpace;
  }

  sendMessage(sendMessage: ISendMessage) {
    this._activeSpace?.sendMessage(sendMessage);
  }

  sendKeyStroke() {
    this._activeSpace?.sendKeyStroke();
  }

  onSpaceMessagesEvent(callback: (messages: Message[]) => void) {
    if (callback) {
      this._onSpaceMessagesEvent = callback;
    }
  }

  removeSpaceMessagesEvent() {
    this._activeSpace?.removeMessagesCallback();
    this._onSpaceMessagesEvent = undefined;
  }

  onSpaceNotificationEvent(callback: (notification: ChatNotification) => void) {
    this._activeSpace?.onNotificationCallback(callback);
    if (callback) {
      this._onSpaceNotificationEvent = callback;
    }
  }

  removeNotificationEvent() {
    this._activeSpace?.removeNotificationCallback();
    this._onSpaceNotificationEvent = undefined;
  }
}
