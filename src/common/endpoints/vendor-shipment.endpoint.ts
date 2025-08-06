import { VendorShipmentRequest, VendorShipmentResponsePage } from '../model/vendor-shipment.model'
import { GetPage } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useVendorShipmentEndpoint = defineEndpoint({
  getPage: (params?: VendorShipmentRequest) =>
    GetPage<VendorShipmentResponsePage>('shipments/page', {
      params,
    }),
})
