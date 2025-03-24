import { IDeviceModel, IDeviceQuery, IPaginated, IRequestParams } from "../../../shared/interfaces";
export interface ITunnelDevice {
    /**
     * Create new Tunnel device
     * @param payload
     */
    createDevice(payload: IDeviceModel): Promise<IDeviceModel>;
    /**
     * Retrieve Tunnel device using ID
     * @param deviceTokenId
     */
    getDeviceById(deviceTokenId: string): Promise<IDeviceModel>;
    /**
     * List all Tunnel devices
     * @param query
     */
    listDevices(query?: IDeviceQuery): Promise<IPaginated<IDeviceModel>>;
    /**
     * Update a Tunnel device
     * @param deviceTokenId
     * @param payload
     */
    updateDevice(deviceTokenId: string, payload: IDeviceModel): Promise<IDeviceModel>;
    /**
     * Delete a Tunnel device
     * @param deviceTokenId
     */
    deleteDevice(deviceTokenId: string): Promise<IDeviceModel>;
}
export declare class TunnelDevice implements ITunnelDevice {
    private routeNamespace;
    private parentRouteNamespace;
    private tunnelId;
    private requestParams;
    constructor(parentRouteNamespace: string, tunnelId: string, requestParams: IRequestParams);
    createDevice(payload: IDeviceModel): Promise<IDeviceModel>;
    getDeviceById(deviceTokenId: string): Promise<IDeviceModel>;
    listDevices(query?: IDeviceQuery): Promise<IPaginated<IDeviceModel>>;
    updateDevice(deviceTokenId: string, payload: IDeviceModel): Promise<IDeviceModel>;
    deleteDevice(deviceTokenId: string): Promise<IDeviceModel>;
}
//# sourceMappingURL=TunnelDevice.d.ts.map