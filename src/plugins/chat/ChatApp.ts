import { Room } from "./Room";
import { ITunnel } from "../../client";
import { ITopic } from "../../shared/models/Topic";
import { ITransport } from "../../shared/interfaces";
import {
  findIdentifierId,
  setIdentifierId,
} from "../../shared/utils/identifiers";
import { ISendMessage } from "./MessageSend";
import { chatTag, messageTag, notificationTag } from "./Tags";

export interface IChat {
  /**
   * Retrieve a list of rooms a user has joined, or was invited to.
   * The user's access token will be used to retrieve the list
   */
  retrieveRooms(): Promise<Room[]>;

  /**
   * Join a single chat room
   * @param roomId
   */
  joinRoom(roomId: string): Room | undefined;

  /**
   * Leave a single chat room
   * @param roomId
   */
  leaveRoom(roomId: string): string | undefined;

  /**
   * Join a list of rooms based on selected roomsIds
   * A user might have access to multiple Rooms, but they only want to join
   * some of them for messages
   * @param roomIds
   */
  joinRooms(roomIds: string[]): void;

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
  setActiveRoom(roomId: string): Room | undefined;

  /**
   * Get the current active room context
   */
  activeRoom(): Room | undefined;

  /**
   * Send a new message in the context of the active Room
   * @param sendMessage
   */
  sendMessage(sendMessage: ISendMessage): void;

  /**
   * Send user interaction like keystrokes
   */
  sendKeyStroke(): void

  /**
   * List joined rooms
   */
  joinedRooms: Room[];
}

export class ChatApp implements IChat {
  private chatAppName: string;
  private tunnel: ITunnel;
  private chatTopic: ITopic;
  private notificationIdentifier?: string;
  private userRooms: Room[] = [];
  private _joinedRooms: Record<string, Room | null> = {};
  private activeRoomId?: string;
  private _activeRoom?: Room;

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
    return Object.values(this._joinedRooms).filter((i) => i) as Room[];
  }

  public retrieveRooms(): Promise<Room[]> {
    // Use API call to retrieve a list of rooms
    this.userRooms = [];
    return new Promise((resolve, reject) => {
      resolve(this.userRooms);
    });
  }

  public joinRoom(roomId: string): Room | undefined {
    const foundLocalUserRoom = this.userRooms.find((i) => i.roomId === roomId);
    if (!foundLocalUserRoom) {
      console.error(
        `Room ${roomId} not found in local store. Please call retrieveRooms() first.`,
      );
      return;
    }

    this._joinedRooms[roomId] = new Room(foundLocalUserRoom.serialize(), this.chatTopic, this.tunnel.deviceTokenId ?? "");

    return this._joinedRooms[roomId];
  }

  public joinRooms(roomIds: string[]) {
    // set all joined rooms
    const joinedRooms = roomIds
      .map((roomId) => this.joinRoom(roomId))
      .filter((i) => i) as Room[];

    // only add identifiers of found joined rooms
    this.chatTopic.addIdentifiers({
      OR: this.generateRoomIdentifiers(joinedRooms.map((i) => i?.roomId)),
    });
  }

  public leaveRoom(roomId: string): string | undefined {
    if (!this._joinedRooms[roomId]) {
      console.error(`User never joined room ${roomId}.`);
      return;
    }

    this._joinedRooms[roomId] = null;
    delete this._joinedRooms[roomId];

    return roomId;
  }

  /**
   * Leave a list of rooms, and stop notifications for each room
   * @param roomIds
   */
  public leaveRooms(roomIds: string[]): ChatApp {
    const filteredRoomIds = roomIds
      .map((roomId) => this.leaveRoom(roomId))
      .filter((i) => i) as string[];

    this.chatTopic.removeIdentifiers(
      this.generateRoomIdentifiers(filteredRoomIds),
    );

    return this;
  }

  setActiveRoom(roomId: string): Room | undefined {
    this.activeRoomId = roomId;

    if (this._joinedRooms[roomId]) {
      this._activeRoom = this._joinedRooms[roomId];
    }

    return this._activeRoom;
  }

  activeRoom(): Room | undefined {
    return this._activeRoom;
  }

  sendMessage(sendMessage: ISendMessage) {
    this._activeRoom?.sendMessage(sendMessage);
  }

  sendKeyStroke() {
    this._activeRoom?.sendKeyStroke();
  }
}
