import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'
import { useWarehouseSiteEndpoint } from '../endpoints/warehouse-site.model'
import { WarehouseSiteDataRequest, WarehouseSiteRequest, WarehouseSiteRequestPage } from '../model/warehouse-site.model'

const warehouseSiteEndpoint = useWarehouseSiteEndpoint()

export const useWarehouseSiteRepository = defineRepository({
  getPage: (params?: WarehouseSiteRequestPage) => withRepository(() => warehouseSiteEndpoint.getPage(params)),

  getAll: (params: WarehouseSiteRequest) =>
    withRepository(
      () => {
        return warehouseSiteEndpoint.getAll({ ...params })
      },
      (response) => {
        return [...response]?.map((item) => {
          return { ...item }
        })
      },
    ),

  getOne: (id: id) => withRepository(() => warehouseSiteEndpoint.getOne(id)),

  create: (data: WarehouseSiteDataRequest) => withRepository(() => warehouseSiteEndpoint.create(data)),

  update: (id: id, data: WarehouseSiteDataRequest) => withRepository(() => warehouseSiteEndpoint.update(id, data)),

  delete: (id: id) => warehouseSiteEndpoint.delete(id),
})
