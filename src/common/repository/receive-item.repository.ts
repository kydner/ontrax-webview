import { useReceiveItemEndpoint } from '../endpoints/receive-item.endpoint'
import { id } from '../interfaces/response.interface'
import { ReceiveItemDataRequest, ReceiveItemRequest } from '../model/receive-item.model'
import { TransferItemDetail } from '../model/transfer-item.model'
import { withRepository } from '../utils/converter.utils'
import { defineRepository } from '../utils/plugin.utils'

const receiveEndpoint = useReceiveItemEndpoint()

export const useReceiveItemRepository = defineRepository({
  getPage: (params?: ReceiveItemRequest) => withRepository(() => receiveEndpoint.getPage(params)),

  getOne: (id: id) =>
    withRepository(
      () => receiveEndpoint.getOne(id),
      (response) => {
        const receiveItems: TransferItemDetail[] = [...(response?.stockTransferItems || [])]?.map((item) => {
          return {
            ...item,
            itemId: item.itemId,
            itemCode: item.itemCode,
            itemName: item.itemName,
            notes: item.notes,
            qty: item.qty || 0,
            qtyTransfer: item.qtyTransfer || 0,
            stockTransferItemId: item.stockTransferItemId,
          }
        })
        return { ...response, receiveItems }
      },
    ),

  create: (data: ReceiveItemDataRequest) => withRepository(() => receiveEndpoint.create(data)),

  update: (id: id, data: ReceiveItemDataRequest) => withRepository(() => receiveEndpoint.update(id, data)),

  delete: (id: id) => receiveEndpoint.delete(id),
})
