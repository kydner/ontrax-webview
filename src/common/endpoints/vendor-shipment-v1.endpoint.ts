import { id } from '../interfaces/response.interface'
import {
  VendorShipmentAdjustmentQuantityDetailRequest,
  VendorShipmentAdjustmentQuantityDetailResponse,
} from '../model/vendor-shipment-adjustment-quantity-detail.model'
import { VendorShipmentQualityCheckDataRequest } from '../model/vendor-shipment-quality-check.model'
import { VendorShipmentReceiveDataRequest } from '../model/vendor-shipment-receive.model'
import { VendorShipmentSaveSerialNumberDataRequest } from '../model/vendor-shipment-save-serial-number.model'
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

  qualityCheck: (id: id, data: VendorShipmentQualityCheckDataRequest) => Post(`v1/vendor-shipments/${id}/qc`, data),

  inTransit: (id: id) => Patch(`v1/vendor-shipments/${id}/in-transit`),

  adjustmentDetail: (detailId: id, params: VendorShipmentAdjustmentQuantityDetailRequest) =>
    Patch<VendorShipmentAdjustmentQuantityDetailResponse>(`v1/vendor-shipments/detail/${detailId}/quantity`, null, {
      params,
    }),

  saveSerialNumber: (data: VendorShipmentSaveSerialNumberDataRequest) =>
    Post('v1/vendor-shipments/serial-number', data),
})
