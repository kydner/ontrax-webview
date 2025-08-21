import { useVendorShipmentEndpoint } from '../endpoints/vendor-shipment.endpoint'
import { id } from '../interfaces/response.interface'
import { VendorShipmentQualityCheckDataRequest } from '../model/vendor-shipment-quality-check.model'
import { VendorShipmentReceiveDataRequest, VendorShipmentReceiveRequest } from '../model/vendor-shipment-receive.model'
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
        const warehouseId = response.locationWarehouseId
        const attachmentId = response?.attachmentInfo?.fileId

        /**
         * used for request data Post & Put
         */
        const receiveItems = [...response.goodsReceiveItems]?.map((item) => {
          return {
            ...item,
            goodsReceiveItemId: item?.goodsReceiveItemId,
            goodsReceiveId: item.goodsReceiveItemId,
            itemId: item.itemId,
            qtyOrdered: item.qtyOrdered,
            notes: item.notes,
            itemName: item.itemName,
            skuCode: item.skuCode,
            qtyReceived: item.qtyReceived ?? 0,
            unitPrice: item.unitPrice,
            fileId: item.fileId,
            attachmentInfo: item.attachmentInfo,
          }
        })
        return { ...response, warehouseId, receiveItems, attachmentId }
      },
    ),

  create: (data: VendorShipmentDataRequest) => withRepository(() => shipmentEndpoint.create(data)),

  update: (id: id, data: VendorShipmentDataRequest) => withRepository(() => shipmentEndpoint.update(id, data)),

  delete: (id: id) => shipmentEndpoint.delete(id),

  received: (id: id, data: VendorShipmentReceiveDataRequest, params: VendorShipmentReceiveRequest) =>
    shipmentEndpoint.received(id, data, params),

  qualityCheck: (id: id, data: VendorShipmentQualityCheckDataRequest) => shipmentEndpoint.qualityCheck(id, data),

  inTransit: (id: id) => shipmentEndpoint.inTransit(id),
})
