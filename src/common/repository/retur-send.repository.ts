import { useReturSendEndpoint } from '../endpoints/retur-send.endpoint'
import { ReturSendDataRequest, ReturSendRequestPage } from '../model/retur-send.model'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'

const returEndpoint = useReturSendEndpoint()

export const useReturSendRepository = defineRepository({
  getPage: (params?: ReturSendRequestPage) => withRepository(() => returEndpoint.getPage(params)),

  getOne: (id: id) => withRepository(() => returEndpoint.getOne(id)),

  create: (data: ReturSendDataRequest) => withRepository(() => returEndpoint.create(data)),

  update: (id: id, data: ReturSendDataRequest) => withRepository(() => returEndpoint.update(id, data)),

  delete: (id: id) => returEndpoint.delete(id),
})
