import { useVendorShipmentV1Endpoint } from '../endpoints/vendor-shipment-v1.model'
import { id } from '../interfaces/response.interface'
// import { VendorShipmentV1QualityCheckDataRequest } from '../model/vendor-shipment-quality-check.model'
// import { VendorShipmentV1ReceiveDataRequest, VendorShipmentV1ReceiveRequest } from '../model/vendor-shipment-receive.model'
import { VendorShipmentV1DataRequest, VendorShipmentV1Request } from '../model/vendor-shipment-v1.model'
import { withRepository } from '../utils/converter.utils'
import { defineRepository } from '../utils/plugin.utils'

const shipmentEndpoint = useVendorShipmentV1Endpoint()

export const useVendorShipmentV1Repository = defineRepository({
  getPage: (params?: VendorShipmentV1Request) => withRepository(() => shipmentEndpoint.getPage(params)),

  getOne: (id: id) =>
    withRepository(
      () => shipmentEndpoint.getOne(id),
      (response) => {
        return { ...response }
      },
    ),

  create: (data: VendorShipmentV1DataRequest) =>
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

  update: (id: id, data: VendorShipmentV1DataRequest) => withRepository(() => shipmentEndpoint.update(id, data)),

  delete: (id: id) => shipmentEndpoint.delete(id),

  // received: (id: id, data: VendorShipmentV1ReceiveDataRequest, params: VendorShipmentV1ReceiveRequest) =>
  //   shipmentEndpoint.received(id, data, params),

  // qualityCheck: (id: id, data: VendorShipmentV1QualityCheckDataRequest) => shipmentEndpoint.qualityCheck(id, data),

  // inTransit: (id: id) => shipmentEndpoint.inTransit(id),
})
