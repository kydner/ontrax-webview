import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'
import { useContractEndpoint } from '../endpoints/contract.endpoint'
import { ContractDataRequest, ContractRequest, ContractRequestPage } from '../model/contract.model'

const ContractEndpoint = useContractEndpoint()

export const useContractRepository = defineRepository({
  getPage: (params?: ContractRequestPage) => withRepository(() => ContractEndpoint.getPage(params)),

  getAll: (params: ContractRequest) =>
    withRepository(
      () => {
        return ContractEndpoint.getAll({ ...params })
      },
      (response) => {
        return [...response]?.map((item) => {
          return { ...item }
        })
      },
    ),

  getOne: (id: id) => withRepository(() => ContractEndpoint.getOne(id)),

  create: (data: ContractDataRequest) => withRepository(() => ContractEndpoint.create(data)),

  update: (id: id, data: ContractDataRequest) => withRepository(() => ContractEndpoint.update(id, data)),

  delete: (id: id) => ContractEndpoint.delete(id),
})
