import { id } from '../interfaces/response.interface'
import {
  ReceiveItemDataRequest,
  ReceiveItemRequest,
  ReceiveItemResponse,
  ReceiveItemResponsePage,
} from '../model/receive-item.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useReceiveItemEndpoint = defineEndpoint({
  getPage: (params?: ReceiveItemRequest) =>
    GetPage<ReceiveItemResponsePage>('receive-items/page', {
      params,
    }),

  getOne: (id: id) => Get<ReceiveItemResponse>(`receive-items/${id}`),

  create: (data: ReceiveItemDataRequest) => Post('receive-items', data),

  update: (id: id, data: ReceiveItemDataRequest) => Put(`receive-items/${id}`, data),

  delete: (id: id) => Delete(`receive-items/${id}`),
})
