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
    GetPage<VendorResponsePage>('vendors/page', {
      params,
    }),

  getAll: (params?: VendorRequest) =>
    Get<VendorResponse[]>('vendors', {
      params,
    }),

  getOne: (id: id) => Get<VendorResponse>(`vendors/${id}`),

  create: (data: VendorDataRequest) => Post('vendors', data),

  update: (id: id, data: VendorDataRequest) => Put(`vendors/${id}`, data),

  delete: (id: id) => Delete(`vendors/${id}`),
})
