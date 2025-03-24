# NoLag JS

The following package will help you get started with [NoLag](https://nolag.app) for your next or current Realtime application.

For more detailed information on using NoLag please visit our [developer wiki](https://developer.nolag.app/#introduction).

## Quick Example

#### Create NoLag Tunnel connection
```typescript
import { WebSocketClient, uint8ArrayToString } from "nolagjs";
import type { ITunnel } from "nolagjs";

const accessToken: string = "<your_device_access_token_goes_here>";

const nolag: ITunnel = WebSocketClient(accessToken);
```

#### SUBSCRIBE to Topic and set some identifiers to listen to
```typescript
const speedTest: ITopic = nolag.subscribe("speedTest", {
  // only receive data from "speedTest" Topic and "identifer_<deviceTokenId>" NQL identifer
  OR: [`identifier_${nolag.deviceTokenId}`],
});

```

#### PUBLISH some data to a topic and grouping of identifiers
```typescript
/**
 * ----- PUBLISH some data to a topic and grouping of identifiers -----
 */
const sentTimeStamp: string = `${Data.now()}`;

// identifiers
const identifiers: string[] = [`identifier_${nolag.deviceTokenId}`];

speedTest.publish(sentTimeStamp, identifiers);
```

#### Receive data on Topic name
```typescript
speedTest.onReceive((received: IResponse) => {
  const { data, identifiers, topicName, presences } = received;
  const stringData: string = uint8ArrayToString(data);
  const receivedData = JSON.parse(stringData);
});

```

# Examples
You can check out some examples in `examples/SDK`

If you want to give the E2E playwright test a go. Copy and rename the `.env-example` file to `.env` 
and update the file with your project API key.