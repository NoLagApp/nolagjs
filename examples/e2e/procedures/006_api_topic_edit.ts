import type { ITopicModel } from "nolagjs";
import { EStatus } from "nolagjs";
import { example_api_tunnel_topic_update } from "../../SDK/API/tunnel_topics/example_api_tunnel_topic_update";

export interface IApiTopicEdit {
  topicId: string;
  tunnelId: string;
  tunnelName: string;
  yourProjectApiKey: string;
  noLagDeveloperTestConfigIgnore: Record<any, any>;
}

export const editTunnelTopicUsingTopicId = async ({
  topicId,
  tunnelId,
  tunnelName,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTopicEdit) => {
  const payload: ITopicModel = {
    name: `${tunnelName}_edited`,
  };

  return example_api_tunnel_topic_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    topicId,
  });
};

export const setNoEchoToFalse = async ({
  topicId,
  tunnelId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTopicEdit) => {
  const payload: ITopicModel = {
    noEcho: false,
  };

  return example_api_tunnel_topic_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    topicId,
  });
};

export const setTriggerWebhook = async ({
  topicId,
  tunnelId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTopicEdit) => {
  const payload: ITopicModel = {
    triggerApi: {
      url: "http://your-url.com/api/trigger",
      queryParams: {
        queryParamOne: "queryParamOne",
        queryParamTwo: "queryParamTwo",
        queryParamThree: "queryParamThree",
      },
      headers: {
        headersParamOne: "headersParamOne",
        headersParamTwo: "headersParamTwo",
        headersParamThree: "headersParamThree",
      },
    },
  };

  return example_api_tunnel_topic_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    topicId,
  });
};

export const setHydrationWebhook = async ({
  topicId,
  tunnelId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTopicEdit) => {
  const payload: ITopicModel = {
    hydrateApi: {
      url: "http://your-url.com/api/hydration",
      queryParams: {
        queryParamOne: "queryParamOne",
        queryParamTwo: "queryParamTwo",
        queryParamThree: "queryParamThree",
      },
      headers: {
        headersParamOne: "headersParamOne",
        headersParamTwo: "headersParamTwo",
        headersParamThree: "headersParamThree",
      },
    },
  };

  return example_api_tunnel_topic_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    topicId,
  });
};

export const setStatusToInactive = async ({
  topicId,
  tunnelId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTopicEdit) => {
  const payload: ITopicModel = {
    status: EStatus.Inactive,
  };

  return example_api_tunnel_topic_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    topicId,
  });
};

export const setStatusToActive = async ({
  topicId,
  tunnelId,
  yourProjectApiKey,
  noLagDeveloperTestConfigIgnore,
}: IApiTopicEdit) => {
  const payload: ITopicModel = {
    status: EStatus.Active,
  };

  return example_api_tunnel_topic_update({
    payload,
    yourProjectApiKey,
    noLagDeveloperTestConfigIgnore,
    tunnelId,
    topicId,
  });
};
