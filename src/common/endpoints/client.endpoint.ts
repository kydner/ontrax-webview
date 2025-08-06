import { id } from '../interfaces/response.interface'
import {
  ClientDataRequest,
  ClientRequest,
  ClientRequestPage,
  ClientResponse,
  ClientResponsePage,
} from '../model/client.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useClientEndpoint = defineEndpoint({
  getPage: (params?: ClientRequestPage) =>
    GetPage<ClientResponsePage>('clients/page', {
      params,
    }),

  getAll: (params?: ClientRequest) =>
    Get<ClientResponse[]>('clients', {
      params,
    }),

  getOne: (id: id) => Get<ClientResponse>(`clients/${id}`),

  create: (data: ClientDataRequest) => Post('clients', data),

  update: (id: id, data: ClientDataRequest) => Post(`clients/${id}`, data),

  delete: (id: id) => Delete(`clients/${id}`),
})
