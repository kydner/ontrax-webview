import { useUserEndpoint } from '../endpoints/user.endpoint'
import { UserDataRequest, UserRequest, UserRequestPage } from '../model/user.model'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'

const userEndpoint = useUserEndpoint()

export const useUserRepository = defineRepository({
  getPage: (params?: UserRequestPage) => withRepository(() => userEndpoint.getPage(params)),

  getAll: (params?: UserRequest) => withRepository(() => userEndpoint.getAll(params)),

  getOne: (id: id) => withRepository(() => userEndpoint.getOne(id)),

  create: (data: UserDataRequest) => withRepository(() => userEndpoint.create(data)),

  update: (id: id, data: UserDataRequest) => withRepository(() => userEndpoint.update(id, data)),

  delete: (id: id) => userEndpoint.delete(id),
})
