import { useFileUploadEndpoint } from '../endpoints/file-upload.endpoint'
import { FileUploadRequest } from '../model/file-upload.model'
import { withRepository } from '../utils/converter.utils'
import { defineRepository } from '../utils/plugin.utils'

const uploadEndpoint = useFileUploadEndpoint()

export const useFileUploadRepository = defineRepository({
  upload: (files: File[] | File, params: FileUploadRequest) =>
    withRepository(() => uploadEndpoint.upload(files, params)),
})
