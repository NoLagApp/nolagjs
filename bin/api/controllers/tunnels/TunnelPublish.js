"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TunnelPublish = void 0;
const ETransportCommand_1 = require("../../../shared/enum/ETransportCommand");
const TransportCommands_1 = require("../../../shared/utils/TransportCommands");
const transport_1 = require("../../../shared/utils/transport");
const routeNamespace = "publish";
const TunnelPublish = async (data, topicName, identifiers, tunnelId, parentRouteNamespace, request, connectOptions) => {
    const commands = (0, TransportCommands_1.transportCommands)()
        .setCommand(ETransportCommand_1.ETransportCommand.Topic, topicName)
        .setCommand(ETransportCommand_1.ETransportCommand.Identifier, identifiers)
        .setCommand(ETransportCommand_1.ETransportCommand.AddAction);
    const encodedBuffer = transport_1.NqlTransport.encode(commands, data);
    await request.request({
        baseURL: `${connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.protocol}://${connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.wsHost}`,
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": connectOptions === null || connectOptions === void 0 ? void 0 : connectOptions.apiKey
        },
        url: `/${parentRouteNamespace}/${tunnelId}/${routeNamespace}`,
        method: "post",
        data: encodedBuffer,
    });
    return true;
};
exports.TunnelPublish = TunnelPublish;
//# sourceMappingURL=TunnelPublish.js.map