"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TunnelPublish = void 0;
const transport_1 = require("../../../shared/utils/transport");
const routeNamespace = "publish";
const TunnelPublish = async (data, topicName, identifiers, tunnelId, parentRouteNamespace, request, connectOptions) => {
    const transport = (0, transport_1.generateTransport)(data, topicName, identifiers);
    await request.request({
        baseURL: `${connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.protocol}://${connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.wsHost}`,
        headers: { "Content-Type": "application/json" },
        url: `/${parentRouteNamespace}/${tunnelId}/${routeNamespace}`,
        method: "post",
        data: transport,
    });
    return true;
};
exports.TunnelPublish = TunnelPublish;
//# sourceMappingURL=TunnelPublish.js.map