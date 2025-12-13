import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'
import { useContractProductEndpoint } from '../endpoints/contract-product.endpoint'
import {
  ContractProductDataRequest,
  ContractProductRequest,
  ContractProductRequestPage,
} from '../model/contract-product.model'

const contractProductEndpoint = useContractProductEndpoint()

export const useContractProductRepository = defineRepository({
  getPage: (params?: ContractProductRequestPage) => withRepository(() => contractProductEndpoint.getPage(params)),

  getAll: (params: ContractProductRequest) =>
    withRepository(
      () => {
        return contractProductEndpoint.getAll({ ...params })
      },
      (response) => {
        return [...response]?.map((item) => {
          return { ...item }
        })
      },
    ),

  getOne: (id: id) => withRepository(() => contractProductEndpoint.getOne(id)),

  create: (data: ContractProductDataRequest) => withRepository(() => contractProductEndpoint.create(data)),

  update: (id: id, data: ContractProductDataRequest) => withRepository(() => contractProductEndpoint.update(id, data)),

  delete: (id: id) => contractProductEndpoint.delete(id),
})
