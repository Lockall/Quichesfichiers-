
export enum UploadState {
  Idle,
  Uploading,
  Success,
}

export interface FileInfo {
    name: string;
    size: number;
}
