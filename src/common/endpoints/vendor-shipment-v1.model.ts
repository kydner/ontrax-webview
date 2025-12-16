import { id } from '../interfaces/response.interface'
import { VendorShipmentReceiveDataRequest } from '../model/vendor-shipment-receive.model'
// import { VendorShipmentV1QualityCheckDataRequest } from '../model/vendor-shipment-quality-check.model'
// import { VendorShipmentV1ReceiveDataRequest } from '../model/vendor-shipment-receive.model'
import {
  VendorShipmentV1DataRequest,
  VendorShipmentV1Request,
  VendorShipmentV1Response,
  VendorShipmentV1ResponsePage,
} from '../model/vendor-shipment-v1.model'
import { Delete, Get, GetPage, Patch, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useVendorShipmentV1Endpoint = defineEndpoint({
  getPage: (params?: VendorShipmentV1Request) =>
    GetPage<VendorShipmentV1ResponsePage>('v1/vendor-shipments/page', {
      params,
    }),

  getOne: (id: id) => Get<VendorShipmentV1Response>(`v1/vendor-shipments/${id}`),

  create: (data: VendorShipmentV1DataRequest) => Post('v1/vendor-shipments', data),

  update: (id: id, data: VendorShipmentV1DataRequest) => Put(`v1/vendor-shipments/${id}`, data),

  delete: (id: id) => Delete(`v1/vendor-shipments/${id}`),

  received: (id: id, data: VendorShipmentReceiveDataRequest) => Patch(`v1/vendor-shipments/${id}/received`, data),

  // qualityCheck: (id: id, data: VendorShipmentV1QualityCheckDataRequest) => Patch(`v1/vendor-shipments/${id}/quality-check`, data),

  inTransit: (id: id) => Patch(`v1/vendor-shipments/${id}/in-transit`),
})
