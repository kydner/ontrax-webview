import { defineEndpoint } from '../utils/plugin.utils'
import { id } from '../interfaces/response.interface'
import { api } from 'src/boot/axios'

export const useFileDownloadEndpoint = defineEndpoint({
  download: (fileId: id) => api<string>(`files/download/${fileId}`, { responseType: 'text' }),
})
