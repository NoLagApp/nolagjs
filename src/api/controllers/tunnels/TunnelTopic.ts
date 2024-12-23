import {
  ITopicQuery,
  ITopicModel,
  IPaginated, IRequestParams
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
  private routeNamespace = "topics";

  private parentRouteNamespace: string;
  private tunnelId: string;
  private readonly requestParams: IRequestParams;
  constructor(
    parentRouteNamespace: string,
    tunnelId: string,
    requestParams: IRequestParams,
  ) {
    this.parentRouteNamespace = parentRouteNamespace;
    this.tunnelId = tunnelId;
    this.requestParams = requestParams;
  }

  async createTopic(payload: ITopicModel): Promise<ITopicModel> {
    const response = await fetch(`${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}`, {
      method: "POST",
      headers: this.requestParams.headers,
      body: JSON.stringify(payload),
    });

    return response.json();
  }

  async getTopicById(topicId: string): Promise<ITopicModel> {
    const response = await fetch(`${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${topicId}`, {
      method: "GET",
      headers: this.requestParams.headers,
    });

    return response.json();
  }

  async listTopics(query?: ITopicQuery): Promise<IPaginated<ITopicModel>> {
    const queryString = query ? generateQueryString(query) : "";
    const response = await fetch(`${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}${queryString}`, {
      method: "GET",
      headers: this.requestParams.headers,
    });

    return response.json();
  }

  async updateTopic(
    topicId: string,
    payload: ITopicModel,
  ): Promise<ITopicModel> {
    const response = await fetch(`${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${topicId}`, {
      method: "PATCH",
      headers: this.requestParams.headers,
      body: JSON.stringify(payload),
    });

    return response.json();
  }

  async deleteTopic(topicId: string): Promise<ITopicModel> {
    const response = await fetch(`${this.requestParams.baseURL}/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${topicId}`, {
      method: "DELETE",
      headers: this.requestParams.headers,
    });

    return response.json();
  }
}
