import { AxiosInstance } from "axios";
import {
  ITopicQuery,
  ITopicModel,
  IPaginated,
} from "../../../shared/interfaces";
import { generateQueryString } from "../../../shared/utils/generateQueryString";

export interface ITunnelTopic {
  /**
   * Create new Tunnel Topic
   * @param payload
   */
  createTopic(payload: ITopicModel): Promise<ITopicModel>;
  /**
   * Retrieve Tunnel Topic using ID
   * @param query
   */
  getTopicById(topicId: string): Promise<ITopicModel>;
  /**
   * List all Tunnel Topics
   * @param query
   */
  listTopics(query?: ITopicQuery): Promise<IPaginated<ITopicModel>>;
  /**
   * Update a Tunnel Topic
   * @param topicId
   * @param payload
   */
  updateTopic(topicId: string, payload: ITopicModel): Promise<ITopicModel>;
  /**
   * Delete a Tunnel Topic
   * @param topicId
   */
  deleteTopic(topicId: string): Promise<ITopicModel>;
}
export class TunnelTopic implements ITunnelTopic {
  private routeNamespace = "Topics";

  private parentRouteNamespace: string;
  private tunnelId: string;
  private request: AxiosInstance;
  constructor(
    parentRouteNamespace: string,
    tunnelId: string,
    request: AxiosInstance,
  ) {
    this.parentRouteNamespace = parentRouteNamespace;
    this.tunnelId = tunnelId;
    this.request = request;
  }

  async createTopic(payload: ITopicModel): Promise<ITopicModel> {
    const response = await this.request.request({
      url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}`,
      method: "post",
      data: payload,
    });

    return response.data;
  }

  async getTopicById(topicId: string): Promise<ITopicModel> {
    const response = await this.request.request({
      url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${topicId}`,
      method: "get",
    });

    return response.data;
  }

  async listTopics(query?: ITopicQuery): Promise<IPaginated<ITopicModel>> {
    const queryString = query ? generateQueryString(query) : "";
    const response = await this.request.request({
      url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}${queryString}`,
      method: "get",
    });

    return response.data;
  }

  async updateTopic(
    topicId: string,
    payload: ITopicModel,
  ): Promise<ITopicModel> {
    const response = await this.request.request({
      url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${topicId}`,
      method: "patch",
      data: payload,
    });

    return response.data;
  }

  async deleteTopic(topicId: string): Promise<ITopicModel> {
    const response = await this.request.request({
      url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${topicId}`,
      method: "delete",
    });

    return response.data;
  }
}
