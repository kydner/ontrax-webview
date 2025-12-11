import { id } from '../interfaces/response.interface'
import {
  ProductV1DataRequest,
  ProductV1Request,
  ProductV1RequestPage,
  ProductV1Response,
  ProductV1ResponsePage,
} from '../model/product-v1.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useProductV1Endpoint = defineEndpoint({
  getPage: (params?: ProductV1RequestPage) =>
    GetPage<ProductV1ResponsePage>('v1/product/page', {
      params,
    }),

  getAll: (params?: ProductV1Request) =>
    Get<ProductV1Response[]>('v1/product', {
      params,
    }),

  getOne: (id: id) => Get<ProductV1Response>(`v1/product/${id}`),

  create: (data: ProductV1DataRequest) => Post('v1/product', data),

  update: (id: id, data: ProductV1DataRequest) => Post(`v1/product/${id}`, data),

  delete: (id: id) => Delete(`v1/product/${id}`),
})
