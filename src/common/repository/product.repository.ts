import { useProductEndpoint } from '../endpoints/product.endpoint'
import { ProductDataRequest, ProductRequest, ProductRequestPage } from '../model/product.model'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'

const productEndpoint = useProductEndpoint()

export const useProductRepository = defineRepository({
  getPage: (params?: ProductRequestPage) => withRepository(() => productEndpoint.getPage(params)),

  getAll: (params: ProductRequest) =>
    withRepository(
      () => {
        const { isActive = true } = params
        return productEndpoint.getAll({ ...params, isActive })
      },
      (response) => {
        return [...response]?.map((item) => {
          return { ...item, isHasSN: true }
        })
      },
    ),

  getOne: (id: id) => withRepository(() => productEndpoint.getOne(id)),

  create: (data: ProductDataRequest) => withRepository(() => productEndpoint.create(data)),

  update: (id: id, data: ProductDataRequest) => withRepository(() => productEndpoint.update(id, data)),

  delete: (id: id) => productEndpoint.delete(id),

  availableItem: (warehouseId: id) => withRepository(() => productEndpoint.availableItem(warehouseId)),
})
