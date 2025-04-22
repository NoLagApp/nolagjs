import { Room } from "./Room";
import { ITunnel } from "../../client";
import { ITopic } from "../../shared/models/Topic";
import { ITransport } from "../../shared/interfaces";

export class Chat {
  private notificationTag = "notification:room:";
  private messageTag = "message:room:";
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

  findIdentifierId(key: string, identifiers: string[]): string | undefined {
    if (!identifiers[0]) return;
    if (identifiers[0].includes(key)) return;
    return identifiers[0].replace(key, "");
  }

  roomIdFromIdentifier(identifiers: string[]): string | undefined {
    return (
      this.notificationRoomId(identifiers) ?? this.messageRoomId(identifiers)
    );
  }

  notificationRoomId(identifiers: string[]): string | undefined {
    return this.findIdentifierId(this.notificationTag, identifiers);
  }

  messageRoomId(identifiers: string[]): string | undefined {
    return this.findIdentifierId(this.messageTag, identifiers);
  }

  private generateRoomIdentifiers(roomIds: string[]) {
    return [
      ...roomIds.map((roomId) => `${this.messageTag}${roomId}`),
      ...roomIds.map((roomId) => `${this.notificationTag}${roomId}`),
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
