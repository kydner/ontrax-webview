import { id, isoDate } from '../interfaces/response.interface'
import { VendorShipmentQualityCheckDataRequest } from '../model/vendor-shipment-quality-check.model'
import {
  VendorShipmentDataRequest,
  VendorShipmentRequest,
  VendorShipmentResponse,
  VendorShipmentResponsePage,
} from '../model/vendor-shipment.model'
import { Delete, Get, GetPage, Patch, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useVendorShipmentEndpoint = defineEndpoint({
  getPage: (params?: VendorShipmentRequest) =>
    GetPage<VendorShipmentResponsePage>('shipments/page', {
      params,
    }),

  getOne: (id: id) => Get<VendorShipmentResponse>(`shipments/${id}`),

  create: (data: VendorShipmentDataRequest) => Post('shipments', data),

  update: (id: id, data: VendorShipmentDataRequest) => Put(`shipments/${id}`, data),

  delete: (id: id) => Delete(`shipments/${id}`),

  receive: (id: id, receiveDate: isoDate) =>
    Patch(`shipments/${id}/received`, null, {
      params: {
        receiveDate,
      },
    }),

  qualityCheck: (id: id, data: VendorShipmentQualityCheckDataRequest) => Patch(`shipments/${id}/quality-check`, data),

  inTransit: (id: id) => Patch(`shipments/${id}/in-transit`),
})
