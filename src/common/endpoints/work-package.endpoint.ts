import { id } from '../interfaces/response.interface'
import {
  WorkPackageDataRequest,
  WorkPackageRequest,
  WorkPackageRequestPage,
  WorkPackageResponse,
  WorkPackageResponsePage,
} from '../model/work-package.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useWorkPackageEndpoint = defineEndpoint({
  getPage: (params?: WorkPackageRequestPage) =>
    GetPage<WorkPackageResponsePage>('v1/work-packages/page', {
      params,
    }),

  getAll: (params?: WorkPackageRequest) =>
    Get<WorkPackageResponse[]>('v1/work-packages', {
      params,
    }),

  getOne: (id: id) => Get<WorkPackageResponse>(`v1/work-packages/${id}`),

  create: (data: WorkPackageDataRequest) => Post('v1/work-packages', data),

  update: (id: id, data: WorkPackageDataRequest) => Put(`v1/work-packages/${id}`, data),

  delete: (id: id) => Delete(`v1/work-packages/${id}`),
})
