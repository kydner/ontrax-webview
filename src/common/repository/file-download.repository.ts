import { useFileDownloadEndpoint } from '../endpoints/file-download.endpoint'
import { useFileUploadEndpoint } from '../endpoints/file-upload.endpoint'
import { id } from '../interfaces/response.interface'
import { withRepository } from '../utils/converter.utils'
import { defineRepository } from '../utils/plugin.utils'

const downloadEndpoint = useFileDownloadEndpoint()

const uploadEndpoint = useFileUploadEndpoint()

export const useFileDownloadRepository = defineRepository({
  get: (fileId: id) => withRepository(() => uploadEndpoint.get(fileId)),

  download: (fileId: id) => withRepository(() => downloadEndpoint.download(fileId)),
})
