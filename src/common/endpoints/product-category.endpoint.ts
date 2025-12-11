import { id } from '../interfaces/response.interface'
import {
  ProductCategoryDataRequest,
  ProductCategoryRequest,
  ProductCategoryRequestPage,
  ProductCategoryResponse,
  ProductCategoryResponsePage,
} from '../model/product-category.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useProductCategoryEndpoint = defineEndpoint({
  getPage: (params?: ProductCategoryRequestPage) =>
    GetPage<ProductCategoryResponsePage>('v1/product-category/page', {
      params,
    }),

  getAll: (params?: ProductCategoryRequest) =>
    Get<ProductCategoryResponse[]>('v1/product-category', {
      params,
    }),

  getOne: (id: id) => Get<ProductCategoryResponse>(`v1/product-category/${id}`),

  create: (data: ProductCategoryDataRequest) => Post('v1/product-category', data),

  update: (id: id, data: ProductCategoryDataRequest) => Post(`v1/product-category/${id}`, data),

  delete: (id: id) => Delete(`v1/product-category/${id}`),
})
