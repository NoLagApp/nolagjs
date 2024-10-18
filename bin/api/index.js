"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.ApiTunnel = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../shared/constants");
const TunnelApi_1 = require("./controllers/tunnels/TunnelApi");
class ApiTunnel {
    constructor(apiKey, connectOptions) {
        this.connectOptions = Object.assign({ host: constants_1.CONSTANT.DefaultApiHost, protocol: constants_1.CONSTANT.DefaultHttpProtocol, url: constants_1.CONSTANT.DefaultApiUrl, wsUrl: constants_1.CONSTANT.DefaultWsUrl, wsHost: constants_1.CONSTANT.DefaultWsHost }, connectOptions);
        this.apiKey = apiKey;
        this.request = this.createRequestInstance();
    }
    createRequestInstance() {
        var _a, _b, _c;
        return axios_1.default.create({
            baseURL: `${(_a = this.connectOptions) === null || _a === void 0 ? void 0 : _a.protocol}://${(_b = this.connectOptions) === null || _b === void 0 ? void 0 : _b.host}${(_c = this.connectOptions) === null || _c === void 0 ? void 0 : _c.url}`,
            headers: { "X-API-Key": this.apiKey, "Content-Type": "application/json" },
        });
    }
    tunnels(tunnelQuery) {
        return this.request.get("/tunnels");
        return this.request.get("/tunnels", {
            params: tunnelQuery,
        });
    }
    tunnel(tunnelId) {
        return new TunnelApi_1.TunnelApi(this, tunnelId, this.request);
    }
}
exports.ApiTunnel = ApiTunnel;
const Api = (apiKey, connectOptions) => {
    return new ApiTunnel(apiKey, connectOptions);
};
exports.Api = Api;
//# sourceMappingURL=index.js.map