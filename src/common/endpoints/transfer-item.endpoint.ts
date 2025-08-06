import { id } from '../interfaces/response.interface'
import {
  TransferItemDataRequest,
  TransferItemRequest,
  TransferItemResponse,
  TransferItemResponsePage,
} from '../model/transfer-item.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useTransferItemEndpoint = defineEndpoint({
  getPage: (params?: TransferItemRequest) =>
    GetPage<TransferItemResponsePage>('transfer-items/page', {
      params,
    }),

  getOne: (id: id) => Get<TransferItemResponse>(`transfer-items/${id}`),

  create: (data: TransferItemDataRequest) => Post('transfer-items', data),

  update: (id: id, data: TransferItemDataRequest) => Put(`transfer-items/${id}`, data),

  delete: (id: id) => Delete(`transfer-items/${id}`),
})
