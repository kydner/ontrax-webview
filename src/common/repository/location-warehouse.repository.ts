import { useLocationWarehouseEndpoint } from '../endpoints/location-warehouse.endpoint'
import { LocationWarehouseDataRequest, LocationWarehouseRequestPage } from '../model/location-warehouse.model'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'

const warehouseEndpoint = useLocationWarehouseEndpoint()

export const useLocationWarehouseRepository = defineRepository({
  getPage: (params?: LocationWarehouseRequestPage) => withRepository(() => warehouseEndpoint.getPage(params)),

  getAll: (params: LocationWarehouseRequestPage) =>
    withRepository(
      () => {
        const { isActive = true } = params
        return warehouseEndpoint.getPage({ page: 1, size: 800, ...params, isActive })
      },
      (response) => {
        return response.content
      },
    ),

  getOne: (id: id) => withRepository(() => warehouseEndpoint.getOne(id)),

  create: (data: LocationWarehouseDataRequest) => withRepository(() => warehouseEndpoint.create(data)),

  update: (id: id, data: LocationWarehouseDataRequest) => withRepository(() => warehouseEndpoint.update(id, data)),

  delete: (id: id) => warehouseEndpoint.delete(id),
})
