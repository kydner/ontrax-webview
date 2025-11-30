import { id } from '../interfaces/response.interface'
import {
  DeliveryRequestDataRequest,
  DeliveryRequestRequest,
  DeliveryRequestResponse,
  DeliveryRequestResponsePage,
} from '../model/delivery-request.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useDeliveryRequestEndpoint = defineEndpoint({
  getPage: (params?: DeliveryRequestRequest) =>
    GetPage<DeliveryRequestResponsePage>('delivery-requests/page', {
      params,
    }),

  getAll: (params?: DeliveryRequestRequest) =>
    Get<DeliveryRequestResponse[]>('delivery-requests', {
      params,
    }),

  getOne: (id: id) => Get<DeliveryRequestResponse>(`delivery-requests/${id}`),

  create: (data: DeliveryRequestDataRequest) => Post('delivery-requests', data),

  update: (id: id, data: DeliveryRequestDataRequest) => Put(`delivery-requests/${id}`, data),

  delete: (id: id) => Delete(`delivery-requests/${id}`),
})
