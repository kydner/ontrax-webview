import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface TransferItemQualityCheckRequest extends IListSortingRequest {}

export type TransferItemQualityCheckRequestPage = IPaginationRequest & TransferItemQualityCheckRequest

export interface TransferItemQualityCheckResponse {
  qcStockTransferId: id
  qcNotes: string
  qcStockTransferItems: TransferStockItems[]
}

export interface TransferItemQualityCheckResponsePage extends TransferItemQualityCheckResponse {}

export interface TransferItemQualityCheckDataRequest extends TransferItemQualityCheckResponse {}

export interface TransferStockItems {
  itemId: id
  itemName?: string
  itemCode?: string
  skuCode?: string
  qcGoodsReceiveItemId?: id
  qtyReject: number
  note?: string | null
  notes?: string | null
  qtyPass: number
  attachmentUrl?: string | null
}
