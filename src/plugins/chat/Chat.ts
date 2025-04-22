import { Room } from "./Room";
import { ITunnel } from "../../client";
import { ITopic } from "../../shared/models/Topic";
import { ITransport } from "../../shared/interfaces";
import { findIdentifierId } from "../../shared/utils/identifiers";

export const chatTag = "notification:chat:";
export const notificationTag = "notification:room:";
export const messageTag = "message:room:";

export class Chat {
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

    // Handle incoming transmissions, these could be messages or notifications
    this.chatTopic.onReceive((transport: ITransport) => {
      const { identifiers } = transport;
      const roomId = this.roomIdFromIdentifier(identifiers);
      if(roomId && this.joinedRooms[roomId]) {
        this.joinedRooms[roomId].messageHandler(transport);
      }
    });
  }

  roomIdFromIdentifier(identifiers: string[]): string | undefined {
    if(!identifiers?.[0]) return;
    return findIdentifierId(notificationTag, identifiers[0]) ?? findIdentifierId(messageTag, identifiers[0]);
  }

  private generateRoomIdentifiers(roomIds: string[]) {
    return [
      ...roomIds.map((roomId) => `${messageTag}${roomId}`),
      ...roomIds.map((roomId) => `${notificationTag}${roomId}`),
    ];
  }

  /**
   * Set the chat app notification identifier
   * This allows us to send notifications to users that are part of the chat App.
   * Notification could be something like "new invite to room"
   * @private
   */
  private setChatAppNotificationIdentifier() {
    this.notificationIdentifier = `notification:chat:${this.chatAppName}`;
    this.chatTopic.addIdentifiers({
      OR: [this.notificationIdentifier],
    });
  }

  /**
   * Retrieve the list of rooms a user has joined, or was invited to
   * The users access token will be used to retrieve the list
   */
  public retrieveRooms(): Room[] {
    // Use API call to retrieve a list of rooms
    this.userRooms = [];
    return this.userRooms;
  }

  public joinRoom(roomId: string) {
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

  /**
   * Join a list of rooms, and setup notifications for each room
   * @param roomIds
   */
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

  public leaveRoom(roomId: string) {
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
  public leaveRooms(roomIds: string[]) {
    const filteredRoomIds = roomIds
      .map((roomId) => this.leaveRoom(roomId))
      .filter((i) => i) as string[];

    this.chatTopic.removeIdentifiers(
      this.generateRoomIdentifiers(filteredRoomIds),
    );
  }

  setActiveRoom(roomId: string) {
    this.activeRoomId = roomId;

    if (this.joinedRooms[roomId]) {
      this._activeRoom = this.joinedRooms[roomId];
    }

    return this;
  }

  activeRoom() {
    return this._activeRoom;
  }
}
