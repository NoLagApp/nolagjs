import type { ITopicQuery } from "nolagjs";
import { example_api_tunnel_topic_list } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_list";

export interface IApiTopicList {
  tunnelId: string;
  topicName: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
}

export const shouldRetrieveAListOfTopics = async ({
  tunnelId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTopicList) => {
  const topicQuery: ITopicQuery = {};
  return example_api_tunnel_topic_list({
    topicQuery,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
  });
};

export const queryForASpecificTopicName = async ({
  tunnelId,
  topicName,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTopicList) => {
  const topicQuery: ITopicQuery = {
    name: topicName,
  };

  return example_api_tunnel_topic_list({
    topicQuery,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
  });
};
