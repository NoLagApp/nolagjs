import { Room } from "./Room";
import { ITunnel } from "../../client";
import { ITopic } from "../../shared/models/Topic";
import { ITransport } from "../../shared/interfaces";
import {
  findIdentifierId,
  setIdentifierId,
} from "../../shared/utils/identifiers";
import { Message } from "./Message";
import { ENotificationType } from "../../shared/enum/ENotificationType";
import { Notification } from "./Notification";
import { ISendMessage } from "./SendMessage";

export const chatTag = "notification:chat:";
export const notificationTag = "notification:room:";
export const messageTag = "message:room:";

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
  leaveRooms(roomIds: string[]): Chat;

  /**
   * Set the current active room view,
   * a user might view multiple rooms at the same time,
   * but they can only send a message in one room
   * @param roomId
   */
  setActiveRoom(roomId: string): Chat;

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
}

export class Chat implements IChat {
  private chatAppName: string;
  private tunnel: ITunnel;
  private chatTopic: ITopic;
  private notificationIdentifier?: string;
  private userRooms: Room[] = [];
  private joinedRooms: Record<string, Room | null> = {};
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
      if (roomId && this.joinedRooms[roomId]) {
        this.joinedRooms[roomId].transportHandler(transport);
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

    this.joinedRooms[roomId] = new Room(foundLocalUserRoom.serialize());

    return this.joinedRooms[roomId];
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
    if (!this.joinedRooms[roomId]) {
      console.error(`User never joined room ${roomId}.`);
      return;
    }

    this.joinedRooms[roomId] = null;
    delete this.joinedRooms[roomId];

    return roomId;
  }

  /**
   * Leave a list of rooms, and stop notifications for each room
   * @param roomIds
   */
  public leaveRooms(roomIds: string[]): Chat {
    const filteredRoomIds = roomIds
      .map((roomId) => this.leaveRoom(roomId))
      .filter((i) => i) as string[];

    this.chatTopic.removeIdentifiers(
      this.generateRoomIdentifiers(filteredRoomIds),
    );

    return this;
  }

  setActiveRoom(roomId: string) {
    this.activeRoomId = roomId;

    if (this.joinedRooms[roomId]) {
      this._activeRoom = this.joinedRooms[roomId];
    }

    return this;
  }

  activeRoom(): Room | undefined {
    return this._activeRoom;
  }

  sendMessage(sendMessage: ISendMessage) {
    const message = new Message({
      userId: this.tunnel.deviceTokenId ?? "",
      ...sendMessage,
    });

    // send a message to all users in the room
    this.chatTopic.publish(message.serialize(), [
      setIdentifierId(messageTag, this._activeRoom?.roomId ?? ""),
    ]);

    const notification = new Notification({
      type: ENotificationType.NewMessage,
      userId: this.tunnel.deviceTokenId ?? "",
    });

    // send notification that there is a new message sent in this room
    this.chatTopic.publish(notification.serialize(), [
      setIdentifierId(notificationTag, this._activeRoom?.roomId ?? ""),
    ]);
  }

  sendKeyStroke() {
    const notification = new Notification({
      type: ENotificationType.KeyStroke,
      userId: this.tunnel.deviceTokenId ?? "",
    });
    // send notification that there is a new message sent in this room
    this.chatTopic.publish(notification.serialize(), [
      setIdentifierId(notificationTag, this._activeRoom?.roomId ?? ""),
    ]);
  }
}
