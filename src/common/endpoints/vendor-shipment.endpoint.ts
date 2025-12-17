import { api } from 'src/boot/axios'
import { id } from '../interfaces/response.interface'
import {
  VendorShipmentAdjustmentQuantityDetailRequest,
  VendorShipmentAdjustmentQuantityDetailResponse,
} from '../model/vendor-shipment-adjustment-quantity-detail.model'
import { VendorShipmentQualityCheckDataRequest } from '../model/vendor-shipment-quality-check.model'
import { VendorShipmentReceiveDataRequest } from '../model/vendor-shipment-receive.model'
import { VendorShipmentSaveSerialNumberDataRequest } from '../model/vendor-shipment-save-serial-number.model'
import { VendorShipmentUploadResponse } from '../model/vendor-shipment-upload.model'
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
    GetPage<VendorShipmentResponsePage>('v1/vendor-shipments/page', {
      params,
    }),

  getOne: (id: id) => Get<VendorShipmentResponse>(`v1/vendor-shipments/${id}`),

  create: (data: VendorShipmentDataRequest) => Post('v1/vendor-shipments', data),

  update: (id: id, data: VendorShipmentDataRequest) => Put(`v1/vendor-shipments/${id}`, data),

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

  upload: (files: File[] | File) => {
    const formData = new FormData()

    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append('file', file)
      })
    } else {
      formData.append('file', files)
    }

    return Post<VendorShipmentUploadResponse>('v1/vendor-shipments/attachments/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 0,
    })
  },

  download: (fileId: id) =>
    api.get<Blob>(`v1/vendor-shipments/attachments/download/${fileId}`, { responseType: 'blob' }),
})
