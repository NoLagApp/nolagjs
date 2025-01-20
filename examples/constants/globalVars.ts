import { IEnvVars } from "./interfaces";
import type { IDeviceModel, ITopicModel, ITunnelModel } from "nolagjs";
import dayjs from "dayjs";

interface IGlobalVars {
  /**
   * IGNORE THIS, it's only used by NoLag developers for testing
   */
  noLagDeveloperTestConfigIgnore: Record<any, any>;
  /**
   * IGNORE THIS, it's only used by NoLag developers for testing
   */
  noLagDeveloperTestConfigIgnoreWs: Record<any, any>;
  /**
   * Get the project API key
   */
  yourProjectApiKey: string;

  /**
   * Global tunnel name that will be used in all the tests
   */
  tunnelName: string;

  /**
   * Global topic name that will be used in all the tests
   */
  topicName: string;

  /**
   * Global device name that will be used in all the tests
   */
  deviceName: string;

  /**
   * Set the global tunnel model
   */
  setTunnel(tunnel: ITunnelModel): void;

  /**
   * Get the global tunnel model
   */
  tunnel: ITunnelModel;

  /**
   * Set the global topic model
   */
  setTopic(topic: ITopicModel): void;

  /**
   * Get the global topic model
   */
  topic: ITopicModel;

  /**
   * Set the global device model
   */
  setDevice(device: IDeviceModel): void;

  /**
   * Get the global device model
   */
  device: IDeviceModel;
}

class GlobalVars implements IGlobalVars {
  // local state
  private vars: Record<any, any> = {};

  constructor(env: IEnvVars) {
    if (!env?.PROJECT_API_KEY) throw new Error("PROJECT_API_KEY is required");
    this.vars.PROJECT_API_KEY = env.PROJECT_API_KEY;
    this.vars.NOLAG_DEVELOPER_TESTING = env.NOLAG_DEVELOPER_TESTING === "true";
  }

  public get noLagDeveloperTestConfigIgnore() {
    if (!this.vars.NOLAG_DEVELOPER_TESTING) return {};
    return {
      host: "localhost:5001",
      protocol: "http",
      devMode: true,
    };
  }

  public get noLagDeveloperTestConfigIgnoreWs() {
    if (!this.vars.NOLAG_DEVELOPER_TESTING) return {};
    return {
      host: "localhost:5003",
      protocol: "ws",
      devMode: true,
    };
  }

  /**
   * Create tunnel name with timestamp in milliseconds
   * We do this so that we can re-run the test if it fails without having to
   * revert all previous actions
   */
  private createTestTunnelName(): string {
    this.vars.TUNNEL_NAME = `e2e_Tunnel_${dayjs().valueOf()}`;
    return this.vars.TUNNEL_NAME;
  }

  /**
   * Create topic name with timestamp in milliseconds
   * We do this so that we can re-run the test if it fails without having to
   * revert all previous actions
   */
  private createTestTopicName(): string {
    this.vars.TOPIC_NAME = `e2e_Topic_${dayjs().valueOf()}`;
    return this.vars.TOPIC_NAME;
  }

  /**
   * Create device name with timestamp in milliseconds
   * We do this so that we can re-run the test if it fails without having to
   * revert all previous actions
   */
  private createTestDeviceName(): string {
    this.vars.DEVICE_NAME = `e2e_Device_${dayjs().valueOf()}`;
    return this.vars.DEVICE_NAME;
  }

  public get yourProjectApiKey(): string {
    return this.vars.PROJECT_API_KEY;
  }

  /**
   * Global tunnel name that will be used in all the tests
   */
  public get tunnelName(): string {
    if (this.vars.TUNNEL_NAME) return this.vars.TUNNEL_NAME;
    return this.createTestTunnelName();
  }

  /**
   * Global topic name that will be used in all the tests
   */
  public get topicName(): string {
    if (this.vars.TOPIC_NAME) return this.vars.TOPIC_NAME;
    return this.createTestTopicName();
  }

  /**
   * Set the global tunnel model
   */
  public setTunnel(tunnel: ITunnelModel): void {
    this.vars.TUNNEL_MODEL = tunnel;
  }

  /**
   * Get the global tunnel model
   */
  public get tunnel(): ITunnelModel {
    return this.vars.TUNNEL_MODEL ?? {};
  }

  /**
   * Set the global topic model
   */
  public setTopic(topic: ITopicModel): void {
    this.vars.TOPIC_MODEL = topic;
  }

  /**
   * Get the global topic model
   */
  public get topic(): ITopicModel {
    return this.vars.TOPIC_MODEL ?? {};
  }

  /**
   * Global topic name that will be used in all the tests
   */
  public get deviceName(): string {
    if (this.vars.DEVICE_NAME) return this.vars.DEVICE_NAME;
    return this.createTestDeviceName();
  }

  /**
   * Set the global device model
   */
  public setDevice(device: IDeviceModel): void {
    this.vars.DEVICE_MODEL = device;
  }

  /**
   * Get the global device model
   */
  public get device(): IDeviceModel {
    return this.vars.DEVICE_MODEL ?? {};
  }
}

export const globalVars = new GlobalVars(process.env as unknown as IEnvVars);

export default globalVars;
