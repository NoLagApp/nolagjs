import { Tunnel, Api } from "nolag";

// create a Tunnel WebSocket connection
const connectToNoLag = async () => {
  // connect to NoLag Tunnel
  const tunnel = await Tunnel({
    host: "tunnel-syn-1.nolag.app",
    tunnelAccessKey: "92e4a271-ec35-44b7-9b9b-58b38bdf207b",
    authToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwYTFlMjI3LTY3MjktNDJjMi1hZTRiLTlmMTc5MjQ2OTk4MyIsInR1bm5lbHMiOm51bGwsInByb2plY3RJZCI6ImFhOTRjMzQxLThmODktNDU5OS1hZDc4LTgxMDNmYTRjZjE1ZSIsInR1bm5lbElkcyI6WyI5MmU0YTI3MS1lYzM1LTQ0YjctOWI5Yi01OGIzOGJkZjIwN2IiXSwibG9ja2VkIjpmYWxzZSwiaWF0IjoxNjQ3OTQ2NTM4fQ.8jwOhwTyS_CWvTG1-oXdPpOzaFbU6z2Gu8lXc-wBPDk",
    protocol: "ws",
  });

  // set topic and identifiers at the same time,
  const playerMovement = tunnel.setTopic("playerMovement", [
    {
      currentTile: "800:800",
    },
  ]);

  // add identifiers a bit later in your workflow
  // array of object will give the user the
  // ability to have more than one key with different values
  // could make it a tuple but it might be easier in JS to have
  // the data like this
  playerMovement.addIdentifiers([
    {
      currentTile: "801:801",
    },
  ]);

  // remove the first identifier created
  // you have to pass the full key/value pair
  playerMovement.removeIdentifiers([
    {
      currentTile: "800:800",
    },
  ]);

  playerMovement.receive((data: string, identifiers: any) => {
    // receive any data for topic "playerMovement" matching identifier or just the topic name
  });

  // send current location, must be in a string
  const payload = JSON.stringify({ location: { lat: "123", lng: "456" } });

  // to everyone subscribed to "playerMovement" and identifier ["currentTile", "801:801"]
  playerMovement.send(payload, [
    {
      currentTile: "801:801",
    },
  ]);

  // ------- set another topic
  tunnel
    // set topic and identifiers at the same time,
    .setTopic("playerAction", [
      {
        playerId: "97fa3d4d-62e1-4e66-958d-0857446e3e82",
      },
    ]);

  // access to the topic instance by calling "getTopic"
  const playerAction = tunnel.v.addIdentifiers([
    {
      currentTile: "801:801",
    },
  ]);

  playerAction.receive((data: any, identifiers: any) => {
    // received "playerAction" data
  });
};

connectToNoLag();
