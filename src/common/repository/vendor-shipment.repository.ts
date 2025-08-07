import { useVendorShipmentEndpoint } from '../endpoints/vendor-shipment.endpoint'
import { id } from '../interfaces/response.interface'
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
        return { ...response, receiveItems }
      },
    ),

  create: (data: VendorShipmentDataRequest) => withRepository(() => shipmentEndpoint.create(data)),

  update: (id: id, data: VendorShipmentDataRequest) => withRepository(() => shipmentEndpoint.update(id, data)),

  delete: (id: id) => shipmentEndpoint.delete(id),
})
