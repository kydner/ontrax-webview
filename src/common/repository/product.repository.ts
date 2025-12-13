import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'
import { useProductV1Endpoint } from '../endpoints/product-v1.model'
import { ProductV1DataRequest, ProductV1Request, ProductV1RequestPage } from '../model/product-v1.model'

const productEndpoint = useProductV1Endpoint()

export const useProductRepository = defineRepository({
  getPage: (params?: ProductV1RequestPage) => withRepository(() => productEndpoint.getPage(params)),

  getAll: (params: ProductV1Request) =>
    withRepository(
      () => {
        const { isActive = true } = params
        return productEndpoint.getAll({ ...params, isActive })
      },
      (response) => {
        return [...response]?.map((item) => {
          return { ...item }
        })
      },
    ),

  getOne: (id: id) => withRepository(() => productEndpoint.getOne(id)),

  create: (data: ProductV1DataRequest) => withRepository(() => productEndpoint.create(data)),

  update: (id: id, data: ProductV1DataRequest) => withRepository(() => productEndpoint.update(id, data)),

  delete: (id: id) => productEndpoint.delete(id),
})
