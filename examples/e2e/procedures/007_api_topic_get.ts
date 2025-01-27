import { test, expect } from "@playwright/test";
import { browserInstance, nodeInstance } from "../../constants/globalVars";
import { example_api_tunnel_topic_get } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_get";

export interface IApiTopicGet {
  topicId: string;
  tunnelId: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
}

export const getTunnelTopicUsingTopicId = async ({
  topicId,
  tunnelId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTopicGet) => {
  return example_api_tunnel_topic_get({
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    topicId,
  });
};
