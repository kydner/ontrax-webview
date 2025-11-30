import { id } from '../interfaces/response.interface'
import {
  DeliverySendDataRequest,
  DeliverySendRequest,
  DeliverySendResponse,
  DeliverySendResponsePage,
} from '../model/delivery-send.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useDeliverySendEndpoint = defineEndpoint({
  getPage: (params?: DeliverySendRequest) =>
    GetPage<DeliverySendResponsePage>('delivery-sends/page', {
      params,
    }),

  getOne: (id: id) => Get<DeliverySendResponse>(`delivery-sends/${id}`),

  create: (data: DeliverySendDataRequest) => Post('delivery-sends', data),

  update: (id: id, data: DeliverySendDataRequest) => Put(`delivery-sends/${id}`, data),

  delete: (id: id) => Delete(`delivery-sends/${id}`),
})
