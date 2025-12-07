export interface IFileDetails {
  fileName: string;
  token: string;
  url: string;
  contentType: string;
  size: number;
}

export class FileDetails implements IFileDetails {
  fileName: string;
  token: string;
  url: string;
  contentType: string;
  size: number;

  constructor(data: IFileDetails) {
    this.fileName = data.fileName;
    this.token = data.token;
    this.url = data.url;
    this.contentType = data.contentType;
    this.size = data.size;
  }
}
