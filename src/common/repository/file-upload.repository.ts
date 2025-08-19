import { useFileUploadEndpoint } from '../endpoints/file-upload.endpoint'
import { id } from '../interfaces/response.interface'
import { FileUploadRequest } from '../model/file-upload.model'
import { withRepository } from '../utils/converter.utils'
import { getCachedImageUrl } from '../utils/image-cache.utils'
import { defineRepository } from '../utils/plugin.utils'

const uploadEndpoint = useFileUploadEndpoint()

export const useFileUploadRepository = defineRepository({
  getOne: (fileId: id) =>
    withRepository(
      () => uploadEndpoint.getOne(fileId),
      async (blob) => {
        // transform Blob → cached URL string
        return await getCachedImageUrl(fileId, async () => blob)
      },
    ),

  upload: (files: File[] | File, params: FileUploadRequest) =>
    withRepository(() => uploadEndpoint.upload(files, params)),
})
