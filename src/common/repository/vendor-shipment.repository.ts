import { useVendorShipmentEndpoint } from '../endpoints/vendor-shipment.endpoint'
import { id, isoDate } from '../interfaces/response.interface'
import {
  VendorShipmentQualityCheckDataRequest,
  VendorShipmentQualityCheckResponse,
} from '../model/vendor-shipment-quality-check.model'
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
        const receiveItems = [...response.goodsReceiveItems]?.map((item) => {
          return {
            goodsReceiveId: item.goodsReceiveItemId,
            itemId: item.itemId,
            qtyOrdered: item.qtyOrdered,
            notes: item.notes,
            itemName: item.itemName,
            itemCode: item.itemCode,
            qtyReceived: item.qtyReceived,
            unitPrice: item.unitPrice,
          }
        })

        const qcGoodsReceive = response?.qcGoodsReceive

        const qcItems: VendorShipmentQualityCheckResponse = {
          ...qcGoodsReceive,
          qcItems: qcGoodsReceive?.qcGoodsReceiveItems?.map((receive) => {
            return {
              ...receive,
            }
          }),
        }
        return { ...response, warehouseId, receiveItems, qcItems }
      },
    ),

  create: (data: VendorShipmentDataRequest) => withRepository(() => shipmentEndpoint.create(data)),

  update: (id: id, data: VendorShipmentDataRequest) => withRepository(() => shipmentEndpoint.update(id, data)),

  delete: (id: id) => shipmentEndpoint.delete(id),

  receive: (id: id, receiveDate: isoDate) => shipmentEndpoint.receive(id, receiveDate),

  qualityCheck: (id: id, data: VendorShipmentQualityCheckDataRequest) => shipmentEndpoint.qualityCheck(id, data),

  inTransit: (id: id) => shipmentEndpoint.inTransit(id),
})
