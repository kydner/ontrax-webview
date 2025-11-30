import { useReturReceiveEndpoint } from '../endpoints/retur-receive.endpoint'
import { ReturReceiveDataRequest, ReturReceiveRequestPage } from '../model/retur-receive.model'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'

const returEndpoint = useReturReceiveEndpoint()

export const useReturReceiveRepository = defineRepository({
  getPage: (params?: ReturReceiveRequestPage) => withRepository(() => returEndpoint.getPage(params)),

  getOne: (id: id) => withRepository(() => returEndpoint.getOne(id)),

  create: (data: ReturReceiveDataRequest) => withRepository(() => returEndpoint.create(data)),

  update: (id: id, data: ReturReceiveDataRequest) => withRepository(() => returEndpoint.update(id, data)),

  delete: (id: id) => returEndpoint.delete(id),
})
