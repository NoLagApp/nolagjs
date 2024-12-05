export * from "./imports";
import { ITunnel } from "./client/index";

// Use a runtime check to detect the environment
const isNode =
  typeof process !== 'undefined' &&
  process.versions !== null &&
  process.versions.node !== null;

// export const WebSocketClient: Promise<ITunnel> = isNode
//   ? require('./node').WebSocketClient
//   : require('./browser').WebSocketClient;
console.log(require('./browser'));
export const test = "test";
// export const WebSocketClient: Promise<ITunnel> = require('./browser').WebSocketClient;