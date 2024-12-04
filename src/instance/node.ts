import WebSocket from 'ws';
import { IUnifiedWebsocket } from "../shared/interfaces";

export const unifiedWebsocket = (url: string) => {
  const ws = new WebSocket(
    url,
  );

  const wsInstance: IUnifiedWebsocket= {
    send: (message: ArrayBuffer) => {
      ws.send(message);
    },
    close: () => {
      ws.close();
    },
  };

  ws.on("open", (event: any) => {
    if(wsInstance?.onOpen) {
      wsInstance.onOpen(event);
    }
  });

  ws.on("message", (event: any) => {
    if(wsInstance?.onMessage) {
      wsInstance.onMessage(event);
    }
  });
  ws.on("close", (event: any) => {
    if(wsInstance?.onClose) {
      wsInstance.onClose(event);
    }
  });

  return wsInstance;
}
