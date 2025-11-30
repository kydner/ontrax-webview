import { id } from '../interfaces/response.interface'
import {
  ReturReceiveDataRequest,
  ReturReceiveRequest,
  ReturReceiveResponse,
  ReturReceiveResponsePage,
} from '../model/retur-receive.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useReturReceiveEndpoint = defineEndpoint({
  getPage: (params?: ReturReceiveRequest) =>
    GetPage<ReturReceiveResponsePage>('retur-receive/page', {
      params,
    }),

  getOne: (id: id) => Get<ReturReceiveResponse>(`retur-receive/${id}`),

  create: (data: ReturReceiveDataRequest) => Post('retur-receive', data),

  update: (id: id, data: ReturReceiveDataRequest) => Put(`retur-receive/${id}`, data),

  delete: (id: id) => Delete(`retur-receive/${id}`),
})
