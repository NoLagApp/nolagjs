"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TunnelApi = void 0;
const TunnelDevice_1 = require("./TunnelDevice");
const TunnelPublish_1 = require("./TunnelPublish");
const TunnelTopic_1 = require("./TunnelTopic");
class TunnelApi {
    constructor(apiTunnel, tunnelId, request) {
        this.routeNamespace = "tunnels";
        this.tunnelId = tunnelId;
        this.request = request;
        this.apiTunnel = apiTunnel;
    }
    get topics() {
        return new TunnelTopic_1.TunnelTopic(this.routeNamespace, this.tunnelId, this.request);
    }
    get devices() {
        return new TunnelDevice_1.TunnelDevice(this.routeNamespace, this.tunnelId, this.request);
    }
    async publish(httpPublish) {
        const { data, topicName, identifiers } = httpPublish;
        return (0, TunnelPublish_1.TunnelPublish)(data, topicName, identifiers, this.tunnelId, this.routeNamespace, this.request, this.apiTunnel.connectOptions);
    }
}
exports.TunnelApi = TunnelApi;
//# sourceMappingURL=TunnelApi.js.map