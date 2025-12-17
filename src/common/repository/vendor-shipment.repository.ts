import { useVendorShipmentEndpoint } from '../endpoints/vendor-shipment.endpoint'
import { id } from '../interfaces/response.interface'
import { VendorShipmentAdjustmentQuantityDetailRequest } from '../model/vendor-shipment-adjustment-quantity-detail.model'
import { VendorShipmentQualityCheckDataRequest } from '../model/vendor-shipment-quality-check.model'
import { VendorShipmentReceiveDataRequest } from '../model/vendor-shipment-receive.model'
import { VendorShipmentSaveSerialNumberDataRequest } from '../model/vendor-shipment-save-serial-number.model'
import { VendorShipmentDataRequest, VendorShipmentRequest } from '../model/vendor-shipment.model'
import { withRepository } from '../utils/converter.utils'
import { defineRepository } from '../utils/plugin.utils'

const shipmentEndpoint = useVendorShipmentEndpoint()

export const useVendorShipmentRepository = defineRepository({
  getPage: (params?: VendorShipmentRequest) => withRepository(() => shipmentEndpoint.getPage(params)),

  getOne: (id: id) =>
    withRepository(
      () => shipmentEndpoint.getOne(id),
      (response) => {
        const attachmentIds = response?.attachmentIds
          ? response.attachmentIds
          : response.attachments?.map((item) => item.id)
        return { ...response, attachmentIds }
      },
    ),

  create: (data: VendorShipmentDataRequest) =>
    withRepository(() => {
      const details = [...(data?.details ?? [])]
      const items = details?.map((item) => {
        return { notes: item.notes, productId: item.productId, qtyOrder: item.qtyOrder }
      })

      delete data.details
      return shipmentEndpoint.create({
        ...data,
        items,
      })
    }),

  update: (id: id, data: VendorShipmentDataRequest) =>
    withRepository(() => {
      const details = [...(data?.details ?? [])]
      const items = details?.map((item) => {
        return { notes: item.notes, productId: item.productId, qtyOrder: item.qtyOrder }
      })

      delete data.details
      return shipmentEndpoint.update(id, { ...data, items })
    }),

  delete: (id: id) => shipmentEndpoint.delete(id),

  received: (id: id, data: VendorShipmentReceiveDataRequest) => shipmentEndpoint.received(id, data),

  qualityCheck: (id: id, data: VendorShipmentQualityCheckDataRequest) => shipmentEndpoint.qualityCheck(id, data),

  inTransit: (id: id) => shipmentEndpoint.inTransit(id),

  adjustmentDetail: (detailId: id, params: VendorShipmentAdjustmentQuantityDetailRequest) =>
    withRepository(() => shipmentEndpoint.adjustmentDetail(detailId, params)),

  saveSerialNumber: (data: VendorShipmentSaveSerialNumberDataRequest) => shipmentEndpoint.saveSerialNumber(data),

  upload: (files: File[] | File) => withRepository(() => shipmentEndpoint.upload(files)),

  download: (fileId: id) => withRepository(() => shipmentEndpoint.download(fileId)),
})
