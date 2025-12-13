import { id } from '../interfaces/response.interface'
import {
  VendorDataRequest,
  VendorRequest,
  VendorRequestPage,
  VendorResponse,
  VendorResponsePage,
} from '../model/vendor.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useVendorEndpoint = defineEndpoint({
  getPage: (params?: VendorRequestPage) =>
    GetPage<VendorResponsePage>('v1/vendors/page', {
      params,
    }),

  getAll: (params?: VendorRequest) =>
    Get<VendorResponse[]>('v1/vendors', {
      params,
    }),

  getOne: (id: id) => Get<VendorResponse>(`v1/vendors/${id}`),

  create: (data: VendorDataRequest) => Post('v1/vendors', data),

  update: (id: id, data: VendorDataRequest) => Put(`v1/vendors/${id}`, data),

  delete: (id: id) => Delete(`v1/vendors/${id}`),
})
