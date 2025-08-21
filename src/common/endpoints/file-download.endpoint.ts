import { defineEndpoint } from '../utils/plugin.utils'
import { id } from '../interfaces/response.interface'
import { api } from 'src/boot/axios'

export const useFileDownloadEndpoint = defineEndpoint({
  download: (fileId: id) => api.get<Blob>(`files/download/${fileId}`, { responseType: 'blob' }),
})
