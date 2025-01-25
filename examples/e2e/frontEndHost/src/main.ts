import {
  shouldCreateTunnel,
  canNotCreateDuplicateTunnelName,
  canNotCreateEmptyTunnelName,
  IApiTunnelCreate,
} from "../../procedures/001_api_tunnel_create.ts";
import type { IErrorMessage, ITunnelModel } from "nolagjs";

declare global {
  interface Window {
    shouldCreateTunnel: (arg: IApiTunnelCreate) => Promise<ITunnelModel>;
    canNotCreateDuplicateTunnelName: (
      arg: IApiTunnelCreate,
    ) => Promise<IErrorMessage | undefined>;
    canNotCreateEmptyTunnelName: (
      arg: IApiTunnelCreate,
    ) => Promise<IErrorMessage | undefined>;
  }
}

window.shouldCreateTunnel = shouldCreateTunnel;
window.canNotCreateDuplicateTunnelName = canNotCreateDuplicateTunnelName;
window.canNotCreateEmptyTunnelName = canNotCreateEmptyTunnelName;
