import { UploadStatus } from '../enum/upload.enum'

export const MESSAGE_UPLOADING = 'File is uploading'

export const ALLOW_UPLOADS: UploadStatus[] = [UploadStatus.Cancel, UploadStatus.Initial, UploadStatus.Error]
