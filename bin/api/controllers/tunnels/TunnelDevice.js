"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TunnelDevice = void 0;
const generateQueryString_1 = require("../../../shared/utils/generateQueryString");
class TunnelDevice {
    constructor(parentRouteNamespace, tunnelId, request) {
        this.routeNamespace = "devices";
        this.parentRouteNamespace = parentRouteNamespace;
        this.tunnelId = tunnelId;
        this.request = request;
    }
    async createDevice(payload) {
        const response = await this.request.request({
            url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}`,
            method: "post",
            data: payload,
        });
        return response.data;
    }
    async getDeviceById(deviceTokenId) {
        const response = await this.request.request({
            url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`,
            method: "get",
        });
        return response.data;
    }
    async listDevices(query) {
        const queryString = (0, generateQueryString_1.generateQueryString)(query);
        const response = await this.request.request({
            url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}${queryString}`,
            method: "get",
        });
        return response.data;
    }
    async updateDevice(deviceTokenId, payload) {
        const response = await this.request.request({
            url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`,
            method: "patch",
            data: payload,
        });
        return response.data;
    }
    async deleteDevice(deviceTokenId) {
        const response = await this.request.request({
            url: `/${this.parentRouteNamespace}/${this.tunnelId}/${this.routeNamespace}/${deviceTokenId}`,
            method: "delete",
        });
        return response.data;
    }
}
exports.TunnelDevice = TunnelDevice;
//# sourceMappingURL=TunnelDevice.js.map