import { useVendorEndpoint } from '../endpoints/vendor.endpoint'
import { VendorDataRequest, VendorRequest, VendorRequestPage } from '../model/vendor.model'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'

const vendorEndpoint = useVendorEndpoint()

export const useVendorRepository = defineRepository({
  getPage: (params?: VendorRequestPage) => withRepository(() => vendorEndpoint.getPage(params)),

  getAll: (params?: VendorRequest) => withRepository(() => vendorEndpoint.getAll(params)),

  getOne: (id: id) => withRepository(() => vendorEndpoint.getOne(id)),

  create: (data: VendorDataRequest) => withRepository(() => vendorEndpoint.create(data)),

  update: (id: id, data: VendorDataRequest) => withRepository(() => vendorEndpoint.update(id, data)),

  delete: (id: id) => vendorEndpoint.delete(id),
})
