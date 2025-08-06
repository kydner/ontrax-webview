import { useVendorShipmentEndpoint } from '../endpoints/vendor-shipment.endpoint'
import { VendorShipmentRequest } from '../model/vendor-shipment.model'
import { withRepository } from '../utils/converter.utils'
import { defineRepository } from '../utils/plugin.utils'

const shipmentEndpoint = useVendorShipmentEndpoint()

export const useVendorShipmentRepository = defineRepository({
  getPage: (params?: VendorShipmentRequest) => withRepository(() => shipmentEndpoint.getPage(params)),
})
