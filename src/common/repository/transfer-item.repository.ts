import { useTransferItemEndpoint } from '../endpoints/transfer-item.endpoint'
import { id } from '../interfaces/response.interface'
import { TransferItemDataRequest, TransferItemDetail, TransferItemRequest } from '../model/transfer-item.model'
import { withRepository } from '../utils/converter.utils'
import { defineRepository } from '../utils/plugin.utils'

const transferEndpoint = useTransferItemEndpoint()

export const useTransferItemRepository = defineRepository({
  getPage: (params?: TransferItemRequest) => withRepository(() => transferEndpoint.getPage(params)),

  getOne: (id: id) =>
    withRepository(
      () => transferEndpoint.getOne(id),
      (response) => {
        const transferItems: TransferItemDetail[] = [...(response?.stockTransferItems || [])]?.map((item) => {
          return {
            itemId: item.itemId,
            itemName: item.itemName,
            transferItemId: item.stockTransferItemId,
            qty: item.qtyTransfer || 0,
            notes: item.notes,
            itemCode: item.itemCode,
          }
        })
        return {
          ...response,
          senderNotes: response.senderNotes || '',
          transferItems,
          fromWarehouseId: response?.fromLocationWarehouseId,
          toWarehouseId: response?.toLocationWarehouseId,
        }
      },
    ),

  create: (data: TransferItemDataRequest) => withRepository(() => transferEndpoint.create(data)),

  update: (id: id, data: TransferItemDataRequest) => withRepository(() => transferEndpoint.update(id, data)),

  delete: (id: id) => transferEndpoint.delete(id),
})
