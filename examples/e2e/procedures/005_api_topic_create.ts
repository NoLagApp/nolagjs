import type { ITopicModel, ITunnelModel } from "nolagjs";
import { example_api_tunnel_topic_create } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_create";

export interface IApiTopicCreate {
  topicName: string;
  tunnelName: string;
  tunnelId: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
}

const payload: ITopicModel = {};

export const createTunnelTopicUsingTunnelID = async ({
  topicName,
  tunnelName,
  tunnelId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTopicCreate) => {
  payload.name = topicName;
  return example_api_tunnel_topic_create({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelName,
    tunnelId,
  });
};
