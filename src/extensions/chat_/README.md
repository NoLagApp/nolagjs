# Quickstart NoLag Chat Plugin

The NoLag Chat Plugin allows you to add a chat feature to your NoLag project.

## Installation
```bash
// yarn
yarn add nolagjs
```
```bash
// npm
npm install nolagjs
```
```bash
// pnpm
pnpm add nolagjs
```

## Usage
### Create NoLag Tunnel connection

#### Connect to NoLag
```typescript
import { Client } from "nolagjs";

const accessToken: string = "<your_device_access_token_goes_here>";

const nolagInstance = new Client(accessToken);
```

#### Create a chat app instance
```typescript
import { ChatApp } from "nolagjs";

const nolagInstance = new Client(accessToken);

// You can create this via the API or Admin Portal
const chatAppName = "MyChatApp";

const myChatApp = new ChatApp(chatAppName, nolagInstance);
```

#### Retrieve a list of rooms that the user has joined
```typescript
// API call to retrieve a list of rooms
const userRooms = await myChatApp.retrieveRooms();
```

#### Join a room
```typescript
const userRooms = await myChatApp.retrieveRooms();

const roomId = userRooms[0].roomId;

const joinedRoom: Room = myChatApp.joinRoom(roomId);
```

#### Leave a room
```typescript
const userRooms = await myChatApp.retrieveRooms();

const roomId = myChatApp.joinedRooms[0].roomId;

const roomIdLeft: string = myChatApp.leaveRoom(roomId);
```

#### Join multiple rooms
```typescript
const userRooms = await myChatApp.retrieveRooms();

const joinedRoom: Room = myChatApp.joinRooms(userRooms);
```

#### Leave multiple rooms
```typescript
const roomIdLeft: string = myChatApp.leaveRooms(myChatApp.joinedRooms);
```

#### Set active room, you can think of this as the room you are currently viewing
```typescript
const room = myChatApp.joinedRooms[0]

const roomInView: Room | undefined = myChatApp.setActiveRoom(room.roomId);

```

#### Get the active room instance
```typescript
const roomInView: Room | undefined = myChatApp.activeRoom();
```

#### Send a message from the active room
```typescript
myChatApp.sendMessage({
  messageText: "Hello there 👋!",
  files: [], // not implemented
  replyMessageId: null // if this message is a reply on another message
});
```

#### Send user keystroke events for active room
This should be attached to an onkeypress or onkeydown keyboard event
```typescript
myChatApp.sendKeyStroke();
```

Example: Send user keystroke events for active room
```typescript jsx

function TextBoxWithKeyPress() {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputText = event.currentTarget.value;
    
    if (event.key === "Enter") {
      myChatApp.sendMessage({
        messageText: "Hello there 👋!",
        files: [], // not implemented
        replyMessageId: null // if this message is a reply on another message
      });
      console.log("Enter key was pressed!");
    } else {
      myChatApp.sendKeyStroke();
      console.log(`Key pressed: ${event.key}`);
    }
  };

  return (
    <input
      type="text"
      placeholder="Type something..."
      onKeyDown={handleKeyPress}
  />
);
}
```

#### Room user Keystroke callback

```typescript
import { Notification } from "nolagjs";

// This way you can track key strokes even when the user is not in the same room
myChatApp.activeRoom().keyStrokeCallback((notification: Notification) => {
  // other user that did a keypress
  console.log(notification.userId);
});
```