import { id } from '../interfaces/response.interface'
import {
  ContractProductDataRequest,
  ContractProductRequest,
  ContractProductRequestPage,
  ContractProductResponse,
  ContractProductResponsePage,
} from '../model/contract-product.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useContractProductEndpoint = defineEndpoint({
  getPage: (params?: ContractProductRequestPage) =>
    GetPage<ContractProductResponsePage>('v1/contract-products/page', {
      params,
    }),

  getAll: (params?: ContractProductRequest) =>
    Get<ContractProductResponse[]>('v1/contract-products', {
      params,
    }),

  getOne: (id: id) => Get<ContractProductResponse>(`v1/contract-products/${id}`),

  create: (data: ContractProductDataRequest) => Post('v1/contract-products', data),

  update: (id: id, data: ContractProductDataRequest) => Post(`v1/contract-products/${id}`, data),

  delete: (id: id) => Delete(`v1/contract-products/${id}`),

  serialNumber: (serialNumber: string) =>
    Get<ContractProductResponse>(`v1/contract-products/serial-number/${serialNumber}`),
})
