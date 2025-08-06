import { useClientEndpoint } from '../endpoints/client.endpoint'
import { ClientDataRequest, ClientRequest, ClientRequestPage } from '../model/client.model'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'

const clientEndpoint = useClientEndpoint()

export const useClientRepository = defineRepository({
  getPage: (params?: ClientRequestPage) => withRepository(() => clientEndpoint.getPage(params)),

  getAll: (params?: ClientRequest) => withRepository(() => clientEndpoint.getAll(params)),

  getOne: (id: id) => withRepository(() => clientEndpoint.getOne(id)),

  create: (data: ClientDataRequest) => withRepository(() => clientEndpoint.create(data)),

  update: (id: id, data: ClientDataRequest) => withRepository(() => clientEndpoint.update(id, data)),

  delete: (id: id) => clientEndpoint.delete(id),
})
