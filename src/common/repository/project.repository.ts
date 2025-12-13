import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'
import { useProjectEndpoint } from '../endpoints/project.endpoint'
import { ProjectDataRequest, ProjectRequest, ProjectRequestPage } from '../model/project.model'

const ProjectEndpoint = useProjectEndpoint()

export const useProjectRepository = defineRepository({
  getPage: (params?: ProjectRequestPage) => withRepository(() => ProjectEndpoint.getPage(params)),

  getAll: (params: ProjectRequest) =>
    withRepository(
      () => {
        return ProjectEndpoint.getAll({ ...params })
      },
      (response) => {
        return [...response]?.map((item) => {
          return { ...item }
        })
      },
    ),

  getOne: (id: id) => withRepository(() => ProjectEndpoint.getOne(id)),

  create: (data: ProjectDataRequest) => withRepository(() => ProjectEndpoint.create(data)),

  update: (id: id, data: ProjectDataRequest) => withRepository(() => ProjectEndpoint.update(id, data)),

  delete: (id: id) => ProjectEndpoint.delete(id),
})
