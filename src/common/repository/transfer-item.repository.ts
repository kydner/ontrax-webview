import { useTransferItemEndpoint } from '../endpoints/transfer-item.endpoint'
import { id } from '../interfaces/response.interface'
import { TransferItemDataRequest, TransferItemRequest } from '../model/transfer-item.model'
import { withRepository } from '../utils/converter.utils'
import { defineRepository } from '../utils/plugin.utils'

const transferEndpoint = useTransferItemEndpoint()

export const useTransferItemRepository = defineRepository({
  getPage: (params?: TransferItemRequest) => withRepository(() => transferEndpoint.getPage(params)),

  getOne: (id: id) =>
    withRepository(
      () => transferEndpoint.getOne(id),
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

  create: (data: TransferItemDataRequest) => withRepository(() => transferEndpoint.create(data)),

  update: (id: id, data: TransferItemDataRequest) => withRepository(() => transferEndpoint.update(id, data)),

  delete: (id: id) => transferEndpoint.delete(id),
})
