import { useReceiveItemEndpoint } from '../endpoints/receive-item.endpoint'
import { id } from '../interfaces/response.interface'
import { ReceiveItemDataRequest, ReceiveItemRequest } from '../model/receive-item.model'
import { withRepository } from '../utils/converter.utils'
import { defineRepository } from '../utils/plugin.utils'

const receiveEndpoint = useReceiveItemEndpoint()

export const useReceiveItemRepository = defineRepository({
  getPage: (params?: ReceiveItemRequest) => withRepository(() => receiveEndpoint.getPage(params)),

  getOne: (id: id) =>
    withRepository(
      () => receiveEndpoint.getOne(id),
      (response) => {
        const receiveItems = [...response.goodsReceiveItems]?.map((item) => {
          return {
            goodsReceiveId: item.goodsReceiveItemId,
            itemId: item.itemId,
            qtyOrdered: item.qtyOrdered,
            notes: item.notes,
          }
        })
        return { ...response, receiveItems }
      },
    ),

  create: (data: ReceiveItemDataRequest) => withRepository(() => receiveEndpoint.create(data)),

  update: (id: id, data: ReceiveItemDataRequest) => withRepository(() => receiveEndpoint.update(id, data)),

  delete: (id: id) => receiveEndpoint.delete(id),
})
