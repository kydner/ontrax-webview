import { id } from '../interfaces/response.interface'
import {
  WarehouseSiteDataRequest,
  WarehouseSiteRequest,
  WarehouseSiteRequestPage,
  WarehouseSiteResponse,
  WarehouseSiteResponsePage,
} from '../model/warehouse-site.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useWarehouseSiteEndpoint = defineEndpoint({
  getPage: (params?: WarehouseSiteRequestPage) =>
    GetPage<WarehouseSiteResponsePage>('v1/warehouse-site/page-site', {
      params,
    }),

  getAll: (params?: WarehouseSiteRequest) =>
    Get<WarehouseSiteResponse[]>('v1/warehouse-site/site', {
      params,
    }),

  getOne: (id: id) => Get<WarehouseSiteResponse>(`v1/warehouse-site/site/${id}`),

  create: (data: WarehouseSiteDataRequest) => Post('v1/warehouse-site/site', data),

  update: (id: id, data: WarehouseSiteDataRequest) => Post(`v1/warehouse-site/${id}/site`, data),

  delete: (id: id) => Delete(`v1/warehouse-site/${id}`),
})
