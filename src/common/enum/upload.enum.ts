export enum UploadStatus {
  Initial,
  Progress,
  Cancel,
  Success,
  Error,
}

export type TUploadStatus = `${UploadStatus}`
