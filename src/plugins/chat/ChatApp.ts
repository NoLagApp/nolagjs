import { Conversation } from "./Conversation";
import { ITunnel } from "../../client";
import { ITopic } from "../../shared/models/Topic";
import { ITransport } from "../../shared/interfaces";
import {
  findIdentifierId,
  setIdentifierId,
} from "../../shared/utils/identifiers";
import { ISendMessage } from "./MessageSend";
import { chatTag, messageTag, notificationTag } from "./Tags";
import { ERoomType } from "../../shared/enum/ERoomType";
import { Message } from "./Message";
import { Notification } from "./Notification";

export interface IChat {
  /**
   * Retrieve a list of rooms a user has joined, or was invited to.
   * The user's access token will be used to retrieve the list
   */
  retrieveRooms(): Promise<Conversation[]>;

  /**
   * Join a single chat room
   * @param roomId
   */
  joinRoom(roomId: string): Conversation | undefined;

  /**
   * Leave a single chat room
   * @param roomId
   */
  leaveRoom(roomId: string): ChatApp;

  /**
   * Join a list of rooms based on selected roomsIds
   * A user might have access to multiple Rooms, but they only want to join
   * some of them for messages
   * @param roomIds
   */
  joinRooms(roomIds: string[]): ChatApp;

  /**
   * Can leave joined rooms
   * @param roomIds
   */
  leaveRooms(roomIds: string[]): ChatApp;

  /**
   * Set the current active room view,
   * a user might view multiple rooms at the same time,
   * but they can only send a message in one room
   * @param roomId
   */
  setActiveRoom(roomId: string): Conversation | undefined;

  /**
   * Get the current active room context
   */
  get activeRoom(): Conversation | undefined;

  /**
   * Send a new message in the context of the active Room
   * @param sendMessage
   */
  sendMessage(sendMessage: ISendMessage): void;

  /**
   * Send user interaction like keystrokes
   */
  sendKeyStroke(): void;

  /**
   * List joined rooms
   */
  joinedRooms: Conversation[];

  /**
   * Active room messages received
   * @param callback
   */
  onRoomMessages(callback: (messages: Message[]) => void): void;

  /**
   * Active room notification received
   * @param callback
   */
  onConversationNotifications(callback: (notification: Notification) => void): void;
}

export class ChatApp implements IChat {
  private chatAppName: string;
  private tunnel: ITunnel;
  private chatTopic: ITopic;
  private notificationIdentifier?: string;
  private userRooms: Conversation[] = [];
  private _joinedRooms: Record<string, Conversation | null> = {};
  private activeRoomId?: string;
  private _activeRoom?: Conversation;

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
      const roomId = this.roomIdFromIdentifier(identifiers);
      if (roomId && this._joinedRooms[roomId]) {
        this._joinedRooms[roomId].transportHandler(transport);
      }
    });
  }

  /**
   * Get the room ID from received Identifiers
   * We use the ID to pass the transport to the transportHandler attached to the room
   * @param identifiers
   * @private
   */
  private roomIdFromIdentifier(identifiers: string[]): string | undefined {
    if (!identifiers?.[0]) return;

    return (
      findIdentifierId(notificationTag, identifiers[0]) ??
      findIdentifierId(messageTag, identifiers[0])
    );
  }

  /**
   * Helper to quickly generate room identifiers
   * @param roomIds
   * @private
   */
  private generateRoomIdentifiers(roomIds: string[]) {
    return [
      ...roomIds.map((roomId) => setIdentifierId(messageTag, roomId)),
      ...roomIds.map((roomId) => setIdentifierId(notificationTag, roomId)),
    ];
  }

  /**
   * Set the chat app notification identifier
   * This allows us to send notifications to users that are part of the chat App.
   * Notification could be something like "new invite to room"
   * @private
   */
  private setChatAppNotificationIdentifier() {
    this.notificationIdentifier = setIdentifierId(chatTag, this.chatAppName);
    this.chatTopic.addIdentifiers({
      OR: [this.notificationIdentifier],
    });
  }

  get joinedRooms() {
    return Object.values(this._joinedRooms).filter((i) => i) as Conversation[];
  }

  public retrieveRooms(): Promise<Conversation[]> {
    // Use API call to retrieve a list of rooms
    // IS FAKE
    this.userRooms = [
      new Conversation({
        roomId: "1",
        tunnelId: "29a3d020-0f31-498b-9e41-ee90f14d84b7",
        projectId: "849ea6bf-1f49-46e6-a7b5-9365abe17a87",
        type: ERoomType.GROUP,
        privateRoom: true,
      }),
    ];

    return new Promise((resolve, reject) => {
      resolve(this.userRooms);
    });
  }

  public joinRoom(roomId: string): Conversation | undefined {
    const foundLocalUserRoom = this.userRooms.find((i) => i.roomId === roomId);
    if (!foundLocalUserRoom) {
      console.error(
        `Room ${roomId} not found in local store. Please call retrieveRooms() first.`,
      );
      return;
    }

    this._joinedRooms[roomId] = new Conversation(foundLocalUserRoom.serialize());
    this._joinedRooms[roomId].setChatTopic(this.chatTopic);

    this.chatTopic.addIdentifiers({
      OR: this.generateRoomIdentifiers([roomId]),
    });

    return this._joinedRooms[roomId];
  }

  public joinRooms(roomIds: string[]): ChatApp {
    // set all joined rooms
    roomIds.forEach((roomId) => this.joinRoom(roomId));

    return this;
  }

  public leaveRoom(roomId: string): ChatApp {
    if (!this._joinedRooms[roomId]) {
      console.error(`User never joined room ${roomId}.`);
      return this;
    }

    this._joinedRooms[roomId] = null;
    delete this._joinedRooms[roomId];

    this.chatTopic.removeIdentifiers(this.generateRoomIdentifiers([roomId]));

    return this;
  }

  /**
   * Leave a list of rooms, and stop notifications for each room
   * @param roomIds
   */
  public leaveRooms(roomIds: string[]): ChatApp {
    roomIds.forEach((roomId) => this.leaveRoom(roomId));

    return this;
  }

  setActiveRoom(roomId: string): Conversation | undefined {
    this.activeRoomId = roomId;

    if (this._joinedRooms[roomId]) {
      this._activeRoom = this._joinedRooms[roomId];
    }

    return this._activeRoom;
  }

  get activeRoom(): Conversation | undefined {
    return this._activeRoom;
  }

  sendMessage(sendMessage: ISendMessage) {
    this._activeRoom?.sendMessage(sendMessage);
  }

  sendKeyStroke() {
    this._activeRoom?.sendKeyStroke();
  }

  onRoomMessages(callback: (messages: Message[]) => void) {
    this._activeRoom?.onMessagesCallback(callback);
  }

  onConversationNotifications(callback: (notification: Notification) => void) {
    this._activeRoom?.onNotificationCallback(callback);
  }
}
