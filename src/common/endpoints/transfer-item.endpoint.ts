import { id } from '../interfaces/response.interface'
import { TransferItemQualityCheckDataRequest } from '../model/transfer-item-quality-check.model'
import { TransferItemReceiveDataRequest, TransferItemReceiveRequest } from '../model/transfer-item-receive.model'
import {
  TransferItemDataRequest,
  TransferItemRequest,
  TransferItemResponse,
  TransferItemResponsePage,
} from '../model/transfer-item.model'
import { Delete, Get, GetPage, Patch, Post, Put } from '../services/api.service'
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

  receive: (id: id, data: TransferItemReceiveDataRequest, params?: TransferItemReceiveRequest) =>
    Patch(`transfer-stock/${id}/received`, data, {
      params,
    }),

  qualityCheck: (id: id, data: TransferItemQualityCheckDataRequest) =>
    Patch(`transfer-stock/${id}/quality-check`, data),

  inTransit: (id: id) => Patch(`transfer-stock/${id}/in-transit`),
})
