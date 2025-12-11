import { id } from '../interfaces/response.interface'
import {
  ContractDataRequest,
  ContractRequest,
  ContractRequestPage,
  ContractResponse,
  ContractResponsePage,
} from '../model/contract.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useContractEndpoint = defineEndpoint({
  getPage: (params?: ContractRequestPage) =>
    GetPage<ContractResponsePage>('v1/contracts/page', {
      params,
    }),

  getAll: (params?: ContractRequest) =>
    Get<ContractResponse[]>('v1/contracts', {
      params,
    }),

  getOne: (id: id) => Get<ContractResponse>(`v1/contracts/${id}`),

  create: (data: ContractDataRequest) => Post('v1/contracts', data),

  update: (id: id, data: ContractDataRequest) => Post(`v1/contracts/${id}`, data),

  delete: (id: id) => Delete(`v1/contracts/${id}`),
})
