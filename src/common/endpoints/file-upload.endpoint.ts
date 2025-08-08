import { api } from 'src/boot/axios'
import { FileUploadRequest, FileUploadResponse } from '../model/file-upload.model'
import { defineEndpoint } from '../utils/plugin.utils'

export const useFileUploadEndpoint = defineEndpoint({
  upload: (params?: FileUploadRequest) =>
    api<FileUploadResponse>('files/upload/public', {
      params,
    }),
})
