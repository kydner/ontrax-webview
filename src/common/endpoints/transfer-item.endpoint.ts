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
    GetPage<TransferItemResponsePage>('transfer-stock/page', {
      params,
    }),

  getOne: (id: id) => Get<TransferItemResponse>(`transfer-stock/${id}`),

  create: (data: TransferItemDataRequest) => Post('transfer-stock/draft', data),

  update: (id: id, data: TransferItemDataRequest) => Put(`transfer-stock/draft/${id}`, data),

  delete: (id: id) => Delete(`transfer-stock/${id}`),
})
