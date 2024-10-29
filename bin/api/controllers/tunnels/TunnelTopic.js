"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TunnelTopic = void 0;
const generateQueryString_1 = require("../../../shared/utils/generateQueryString");
class TunnelTopic {
    constructor(parentRouteNamespace, tunnelId, request) {
        this.routeNamespace = "Topics";
        this.parentRouteNamespace = parentRouteNamespace;
        this.tunnelId = tunnelId;
        this.request = request;
    }
    async createTopic(payload) {
        const response = await this.request.request({
            url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}`,
            method: "post",
            data: payload,
        });
        return response.data;
    }
    async getTopicById(topicId) {
        const response = await this.request.request({
            url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${topicId}`,
            method: "get",
        });
        return response.data;
    }
    async listTopics(query) {
        const queryString = query ? (0, generateQueryString_1.generateQueryString)(query) : "";
        const response = await this.request.request({
            url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}${queryString}`,
            method: "get",
        });
        return response.data;
    }
    async updateTopic(topicId, payload) {
        const response = await this.request.request({
            url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${topicId}`,
            method: "patch",
            data: payload,
        });
        return response.data;
    }
    async deleteTopic(topicId) {
        const response = await this.request.request({
            url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${topicId}`,
            method: "delete",
        });
        return response.data;
    }
}
exports.TunnelTopic = TunnelTopic;
//# sourceMappingURL=TunnelTopic.js.map