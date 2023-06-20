# NoLag JS

The following package will help you get started with [NoLag](https://nolag.app/JavaScript) for your next or current Realtime application.

For more detailed information on using NoLag please visit our [developer wiki](https://developer.nolag.app/#introduction).

## Quick Example

#### Create NoLag Tunnel connection
```typescript
import {
  WebSocketClient,
  stringToArrayBuffer,
  uint8ArrayToString,
} from "nolag";

import type { ITopic, ITunnel, IResponse } from "nolag";

const accessToken: string = "<your_access_token_goes_here>";

const nolagInstance: ITunnel = await WebSocketClient(accessToken);
```

#### SUBSCRIBE to Topic and set some identifiers to listen to
```typescript
const rideShareDriver: ITopic = nolagInstance.subscribe("rideShareDriver", [
  "fleetOne",
  "southEast",
]);
```

#### PUBLISH some data to a topic and grouping of identifiers
```typescript
const rideShareDriver: string = JSON.stringify({
  driverId: "6a9d03f5-bc0f-4516-9b51-c223a6cac0d2",
  driverCurrentLocation: {
    lat: "1234",
    lng: "34564",
  },
});

// payload as ArrayBuffer
const payloadArrayBuffer: ArrayBuffer = stringToArrayBuffer(payload);

// identifiers
const identifiers: string[] = ["fleetOne", "southEast"];

rideShareDriver.publish(payloadArrayBuffer, identifiers);
```

#### Receive data on Topic name
```typescript
rideShareDriver.onReceive((received: IResponse) => {
  const { data, nqlIdentifiers, topicName } = received;
  const stringData: string = uint8ArrayToString(data);
  const receivedData = JSON.parse(stringData);
  console.log(receivedData);
  //{
  //   driverId: "6a9d03f5-bc0f-4516-9b51-c223a6cac0d2",
  //   driverCurrentLocation: {
  //     lat: "1234",
  //     lng: "34564",
  //   },
  // }
  console.log(nqlIdentifiers);
  // ["surroundingTile:800:802"]
  console.log(topicName);
  // rideShareDriver
});

```