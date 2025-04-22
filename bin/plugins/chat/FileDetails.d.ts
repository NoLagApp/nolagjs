export interface IFileDetails {
    fileName: string;
    token: string;
    url: string;
    contentType: string;
    size: number;
}
export declare class FileDetails implements IFileDetails {
    fileName: string;
    token: string;
    url: string;
    contentType: string;
    size: number;
    constructor(data: IFileDetails);
}
//# sourceMappingURL=FileDetails.d.ts.map