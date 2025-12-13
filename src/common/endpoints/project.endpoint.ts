import { id } from '../interfaces/response.interface'
import {
  ProjectDataRequest,
  ProjectRequest,
  ProjectRequestPage,
  ProjectResponse,
  ProjectResponsePage,
} from '../model/project.model'
import { Delete, Get, GetPage, Post } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useProjectEndpoint = defineEndpoint({
  getPage: (params?: ProjectRequestPage) =>
    GetPage<ProjectResponsePage>('v1/projects/page', {
      params,
    }),

  getAll: (params?: ProjectRequest) =>
    Get<ProjectResponse[]>('v1/projects', {
      params,
    }),

  getOne: (id: id) => Get<ProjectResponse>(`v1/projects/${id}`),

  create: (data: ProjectDataRequest) => Post('v1/projects', data),

  update: (id: id, data: ProjectDataRequest) => Post(`v1/projects/${id}`, data),

  delete: (id: id) => Delete(`v1/projects/${id}`),
})
