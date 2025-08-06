import { id } from '../interfaces/response.interface'
import {
  ProductDataRequest,
  ProductRequest,
  ProductRequestPage,
  ProductResponse,
  ProductResponsePage,
} from '../model/product.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useProductEndpoint = defineEndpoint({
  getPage: (params?: ProductRequestPage) =>
    GetPage<ProductResponsePage>('product/page', {
      params,
    }),

  getAll: (params?: ProductRequest) =>
    Get<ProductResponse[]>('product', {
      params,
    }),

  getOne: (id: id) => Get<ProductResponse>(`product/${id}`),

  create: (data: ProductDataRequest) => Post('product', data),

  update: (id: id, data: ProductDataRequest) => Post(`product/${id}`, data),

  delete: (id: id) => Delete(`product/${id}`),
})
