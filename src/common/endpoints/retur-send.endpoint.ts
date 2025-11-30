import { id } from '../interfaces/response.interface'
import {
  ReturSendDataRequest,
  ReturSendRequest,
  ReturSendResponse,
  ReturSendResponsePage,
} from '../model/retur-send.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useReturSendEndpoint = defineEndpoint({
  getPage: (params?: ReturSendRequest) =>
    GetPage<ReturSendResponsePage>('retur-sends/page', {
      params,
    }),

  getOne: (id: id) => Get<ReturSendResponse>(`retur-sends/${id}`),

  create: (data: ReturSendDataRequest) => Post('retur-sends', data),

  update: (id: id, data: ReturSendDataRequest) => Put(`retur-sends/${id}`, data),

  delete: (id: id) => Delete(`retur-sends/${id}`),
})
