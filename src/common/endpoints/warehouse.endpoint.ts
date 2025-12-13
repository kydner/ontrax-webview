import { id } from '../interfaces/response.interface'
import {
  WarehouseDataRequest,
  WarehouseRequest,
  WarehouseRequestPage,
  WarehouseResponse,
  WarehouseResponsePage,
} from '../model/warehouse.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useWarehouseEndpoint = defineEndpoint({
  getPage: (params?: WarehouseRequestPage) =>
    GetPage<WarehouseResponsePage>('v1/warehouse-site/page-warehouse', {
      params,
    }),

  getAll: (params?: WarehouseRequest) =>
    Get<WarehouseResponse[]>('v1/warehouse-site/warehouse', {
      params,
    }),

  getOne: (id: id) => Get<WarehouseResponse>(`v1/warehouse-site/warehouse/${id}`),

  create: (data: WarehouseDataRequest) => Post('v1/warehouse-site/warehouse', data),

  update: (id: id, data: WarehouseDataRequest) => Post(`v1/warehouse-site/${id}/warehouse`, data),

  delete: (id: id) => Delete(`v1/warehouse-site/${id}`),
})
