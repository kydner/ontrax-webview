import { FileUploadRequest, FileUploadResponse } from '../model/file-upload.model'
import { defineEndpoint } from '../utils/plugin.utils'
import { Post } from '../services/api.service'
import { useFileDownloadEndpoint } from './file-download.endpoint'
import { id } from '../interfaces/response.interface'
import { api } from 'src/boot/axios'

const fileDownloadEndpoint = useFileDownloadEndpoint()

export const useFileUploadEndpoint = defineEndpoint({
  ...fileDownloadEndpoint,

  get: (fileId: id) =>
    api<Blob>('files/get/file', {
      params: {
        id: fileId,
      },
      responseType: 'blob',
    }),

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
