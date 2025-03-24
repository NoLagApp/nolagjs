import { IEnvVars } from "./interfaces";
import type { IDeviceModel, ITopicModel, ITunnelModel } from "nolagjs";
import dayjs from "dayjs";
import { EEnvironments } from "./enums";

export interface IGlobalVars {
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

  /**
   * Set WS hosting URL
   * @param host
   */
  setWSHost(host: string): void;
}

export interface IGlobalSerialisedVars {
  deviceName: string;
  device: IDeviceModel;
  topicName: string;
  topic: ITopicModel;
  tunnelName: string;
  tunnel: ITunnelModel;
  yourProjectApiKey: string;
}

class GlobalVars implements IGlobalVars {
  // local state
  private vars: Record<any, any> = {};
  private envName: EEnvironments;
  private serverWSHost = "localhost:5003";
  public viteHostUrl = "http://localhost:5111";

  constructor(envName: EEnvironments, envVars: IEnvVars) {
    if (!envVars?.PROJECT_API_KEY)
      throw new Error("PROJECT_API_KEY is required");
    this.vars.PROJECT_API_KEY = envVars.PROJECT_API_KEY;
    this.vars.NOLAG_DEVELOPER_TESTING =
      envVars.NOLAG_DEVELOPER_TESTING === "true";
    this.envName = envName;
  }

  public get noLagDeveloperTestConfigIgnore() {
    if (!this.vars.NOLAG_DEVELOPER_TESTING) return {};
    return {
      host: "localhost:5001",
      protocol: "http",
      devMode: true,
    };
  }

  public setWSHost(host: string) {
    this.serverWSHost = host;
  }

  public get noLagDeveloperTestConfigIgnoreWs() {
    if (!this.vars.NOLAG_DEVELOPER_TESTING) return {};
    return {
      host: this.serverWSHost,
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
    this.vars.TUNNEL_NAME = `${this.envName}:e2e_Tunnel_${dayjs().valueOf()}`;
    return this.vars.TUNNEL_NAME;
  }

  /**
   * Create topic name with timestamp in milliseconds
   * We do this so that we can re-run the test if it fails without having to
   * revert all previous actions
   */
  private createTestTopicName(): string {
    this.vars.TOPIC_NAME = `${this.envName}:e2e_Topic_${dayjs().valueOf()}`;
    return this.vars.TOPIC_NAME;
  }

  /**
   * Create device name with timestamp in milliseconds
   * We do this so that we can re-run the test if it fails without having to
   * revert all previous actions
   */
  private createTestDeviceName(): string {
    this.vars.DEVICE_NAME = `${this.envName}:e2e_Device_${dayjs().valueOf()}`;
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

  public toJSON(): IGlobalSerialisedVars {
    return {
      deviceName: this.deviceName,
      device: this.device,
      topicName: this.topicName,
      topic: this.topic,
      tunnelName: this.topicName,
      tunnel: this.tunnel,
      yourProjectApiKey: this.yourProjectApiKey,
    };
  }
}

const globalVarsBrowser = () => {
  return new GlobalVars(
    EEnvironments.BROWSER,
    process.env as unknown as IEnvVars,
  );
};

const globalVarsNode = () => {
  return new GlobalVars(EEnvironments.NODE, process.env as unknown as IEnvVars);
};

export const browserInstance = globalVarsBrowser();
export const nodeInstance = globalVarsNode();
