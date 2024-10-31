# NoLag JS

The following package will help you get started with [NoLag](https://nolag.app) for your next or current Realtime application.

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

const accessToken: string = "<your_device_access_token_goes_here>";

const nolagInstance: ITunnel = await WebSocketClient(accessToken);
```

#### SUBSCRIBE to Topic and set some identifiers to listen to
```typescript
const rideShareRider: ITopic = nolagInstance.subscribe("rideShareDriver",  {
  OR: [
    "booking_id_1234",
  ],
});
```

#### PUBLISH some data to a topic and grouping of identifiers
```typescript
/**
 * ----- PUBLISH some data to a topic and grouping of identifiers -----
 */
const rideShareDriverPayload: string = JSON.stringify({
    driverCurrentLocation: {
      lat: "1234",
      lng: "34564",
    },
  });

// payload as ArrayBuffer
const payloadArrayBuffer: ArrayBuffer = stringToArrayBuffer(rideShareDriverPayload);

// identifiers
const identifiers: string[] = ["booking_id_1234"];

nolagInstance.publish("rideShareDriver", payloadArrayBuffer, identifiers);
```

#### Receive data on Topic name
```typescript
rideShareRider.onReceive((received: IResponse) => {
  const { data, identifiers, topicName, presences } = received;
  const stringData: string = uint8ArrayToString(data);
  const receivedData = JSON.parse(stringData);
  console.log(receivedData);
  //{
  //   driverCurrentLocation: {
  //     lat: "1234",
  //     lng: "34564",
  //   },
  // }
  console.log(identifiers);
  // ["booking_id_1234"]
  console.log(topicName);
  // rideShareDriver
  console.log(presences);
  // ["driver_id_6a9d03f5-bc0f-4516-9b51-c223a6cac0d2"]
});

```