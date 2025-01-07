import type { IGlobalVars } from "./interfaces";
import type { ITopicModel, ITunnelModel } from "nolagjs";
import dayjs from "dayjs";

const vars: Record<any, any> = {};

export const env: IGlobalVars = process.env as unknown as IGlobalVars;

/**
 * create tunnel name with timestamp in milliseconds
 */
const createTestTunnelName = () => {
  vars.TUNNEL_NAME = `e2e_Tunnel_${dayjs().valueOf()}`;
  return vars.TUNNEL_NAME;
};

/**
 * create topic name with timestamp in milliseconds
 */
const createTestTopicName = () => {
  vars.TOPIC_NAME = `e2e_Topic_${dayjs().valueOf()}`;
  return vars.TOPIC_NAME;
};

/**
 * Global tunnel that that will be used in all the tests
 */
export const tunnelName = () => {
  if (vars.TUNNEL_NAME) return vars.TUNNEL_NAME;
  return createTestTunnelName();
};

/**
 * Global tunnel that that will be used in all the tests
 */
export const topicName = () => {
  const topicName = vars.TOPIC_NAME;
  if (topicName) return topicName;
  return createTestTopicName();
};

export const setTunnel = (tunnel: ITunnelModel) => {
  vars.TUNNEL_MODEL = tunnel;
};

export const getTunnel = (): ITunnelModel | undefined => {
  return vars.TUNNEL_MODEL;
};

export const setTopic = (topic: ITopicModel) => {
  vars.TOPIC_MODEL = topic;
};

export const getTopic = (): ITopicModel | undefined => {
  return vars.TOPIC_MODEL;
};