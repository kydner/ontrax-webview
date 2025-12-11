import { id } from '../interfaces/response.interface'
import {
  ProvinceDataRequest,
  ProvinceRequest,
  ProvinceRequestPage,
  ProvinceResponse,
  ProvinceResponsePage,
} from '../model/province.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useProvinceEndpoint = defineEndpoint({
  getPage: (params?: ProvinceRequestPage) =>
    GetPage<ProvinceResponsePage>('v1/province/page', {
      params,
    }),

  getAll: (params?: ProvinceRequest) =>
    Get<ProvinceResponse[]>('v1/province', {
      params,
    }),

  getOne: (id: id) => Get<ProvinceResponse>(`v1/province/${id}`),

  create: (data: ProvinceDataRequest) => Post('v1/province', data),

  update: (id: id, data: ProvinceDataRequest) => Post(`v1/province/${id}`, data),

  delete: (id: id) => Delete(`v1/province/${id}`),
})
