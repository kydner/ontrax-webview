import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'
import { useWorkPackageEndpoint } from '../endpoints/work-package.endpoint'
import { WorkPackageDataRequest, WorkPackageRequest, WorkPackageRequestPage } from '../model/work-package.model'

const workPackage = useWorkPackageEndpoint()

export const useWorkPackageRepository = defineRepository({
  getPage: (params?: WorkPackageRequestPage) => withRepository(() => workPackage.getPage(params)),

  getAll: (params: WorkPackageRequest) =>
    withRepository(() => {
      return workPackage.getAll({ ...params })
    }),

  getOne: (id: id) => withRepository(() => workPackage.getOne(id)),

  create: (data: WorkPackageDataRequest) => withRepository(() => workPackage.create(data)),

  update: (id: id, data: WorkPackageDataRequest) => withRepository(() => workPackage.update(id, data)),

  delete: (id: id) => workPackage.delete(id),
})
