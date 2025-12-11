import { id } from '../interfaces/response.interface'
import { CityDataRequest, CityRequest, CityRequestPage, CityResponse, CityResponsePage } from '../model/city.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useCityEndpoint = defineEndpoint({
  getPage: (params?: CityRequestPage) =>
    GetPage<CityResponsePage>('v1/city/page', {
      params,
    }),

  getAll: (params?: CityRequest) =>
    Get<CityResponse[]>('v1/city', {
      params,
    }),

  getOne: (id: id) => Get<CityResponse>(`v1/city/${id}`),

  create: (data: CityDataRequest) => Post('v1/city', data),

  update: (id: id, data: CityDataRequest) => Post(`v1/city/${id}`, data),

  delete: (id: id) => Delete(`v1/city/${id}`),
})
