import { IUnifiedWebsocket } from "../shared/interfaces";
import { EEncoding } from "../shared/enum";

export const unifiedWebsocket = (url: string) => {
  const ws = new WebSocket(url);
  ws.binaryType = EEncoding.Arraybuffer;

  const wsInstance: IUnifiedWebsocket = {
    send: (message: ArrayBuffer) => {
      ws.send(message);
    },
    close: () => {
      ws.close();
    },
  };

  // set of events
  // when a successful connection is made with he server
  ws.onopen = (event: any) => {
    if (wsInstance?.onOpen) {
      wsInstance.onOpen(event);
    }
  };

  ws.onclose = (event: any) => {
    if (wsInstance?.onClose) {
      wsInstance.onClose(event);
    }
  };

  ws.onerror = (event: any) => {
    if (wsInstance?.onError) {
      wsInstance.onError(event);
    }
  };

  ws.onmessage = (event: any) => {
    if (wsInstance?.onMessage) {
      wsInstance.onMessage(event.data);
    }
  };

  return wsInstance;
};
