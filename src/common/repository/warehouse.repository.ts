import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'
import { useWarehouseEndpoint } from '../endpoints/warehouse.endpoint'
import { WarehouseDataRequest, WarehouseRequest, WarehouseRequestPage } from '../model/warehouse.model'

const warehouseEndpoint = useWarehouseEndpoint()

export const useWarehouseRepository = defineRepository({
  getPage: (params?: WarehouseRequestPage) => withRepository(() => warehouseEndpoint.getPage(params)),

  getAll: (params: WarehouseRequest) =>
    withRepository(
      () => {
        return warehouseEndpoint.getAll({ ...params })
      },
      (response) => {
        return [...response]?.map((item) => {
          return { ...item }
        })
      },
    ),

  getOne: (id: id) => withRepository(() => warehouseEndpoint.getOne(id)),

  create: (data: WarehouseDataRequest) => withRepository(() => warehouseEndpoint.create(data)),

  update: (id: id, data: WarehouseDataRequest) => withRepository(() => warehouseEndpoint.update(id, data)),

  delete: (id: id) => warehouseEndpoint.delete(id),
})
