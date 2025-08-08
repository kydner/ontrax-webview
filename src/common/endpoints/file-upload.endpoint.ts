import { FileUploadRequest, FileUploadResponse } from '../model/file-upload.model'
import { defineEndpoint } from '../utils/plugin.utils'
import { Post } from '../services/api.service'

export const useFileUploadEndpoint = defineEndpoint({
  upload: (files: File[] | File, params?: FileUploadRequest) => {
    const formData = new FormData()

    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append('file', file)
      })
    } else {
      formData.append('file', files)
    }

    return Post<FileUploadResponse>('files/upload/public', formData, {
      params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
})
