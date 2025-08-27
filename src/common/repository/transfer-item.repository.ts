import { useTransferItemEndpoint } from '../endpoints/transfer-item.endpoint'
import { id } from '../interfaces/response.interface'
import { TransferItem } from '../model/operational.model'
import { TransferItemQualityCheckDataRequest } from '../model/transfer-item-quality-check.model'
import { TransferItemReceiveDataRequest } from '../model/transfer-item-receive.model'
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
        const attachmentId = response?.attachmentInfo?.fileId
        const receiveDate = response?.actualReceiveDate
        const qcStockTransferItems = response.qcBeforeSend?.qcStockTransferItems

        const transferItems: TransferItem[] = [...(response?.stockTransferItems || [])]?.map((item) => {
          const qcStockTransferItem = qcStockTransferItems?.find((stock) => stock.itemId === item.itemId)
          const attachmentInfo = qcStockTransferItem?.attachmentInfo
          const qtyReject = qcStockTransferItem?.qtyReject ?? 0
          return {
            itemId: item.itemId,
            itemName: item.itemName,
            transferItemId: item.stockTransferItemId,
            qty: item.qtyTransfer || 0,
            notes: item.notes,
            skuCode: item.skuCode,
            qtyTransfer: item.qtyTransfer,
            qtyReceived: item.qtyReceived ?? 0,
            qtyAvailable: item.qtyAvailable ?? 0,
            qtyReject,
            stockTransferItemId: item?.stockTransferItemId,
            fileId: item?.fileId,
            attachmentInfo,
          }
        })
        return {
          ...response,
          transferItems,
          fromWarehouseId: response?.fromLocationWarehouseId,
          toWarehouseId: response?.toLocationWarehouseId,
          attachmentId,
          receiveDate,
        }
      },
    ),

  create: (data: TransferItemDataRequest) => withRepository(() => transferEndpoint.create(data)),

  update: (id: id, data: TransferItemDataRequest) => withRepository(() => transferEndpoint.update(id, data)),

  delete: (id: id) => transferEndpoint.delete(id),

  startQcSend: (id: id) => transferEndpoint.startQcSend(id),

  startQcReceived: (id: id) => transferEndpoint.startQcReceived(id),

  received: (id: id, data: TransferItemReceiveDataRequest, params?: TransferItemRequest) =>
    transferEndpoint.received(id, data, params),

  qualityCheck: (id: id, data: TransferItemQualityCheckDataRequest) => transferEndpoint.qualityCheck(id, data),

  inTransit: (id: id) => transferEndpoint.inTransit(id),
})
