import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { TransferItemDetail } from './transfer-item.model'

export interface TransferItemQualityCheckRequest extends IListSortingRequest {}

export type TransferItemQualityCheckRequestPage = IPaginationRequest & TransferItemQualityCheckRequest

export interface TransferItemQualityCheckResponse {
  qcStockTransferId: id
  qcNotes: string
  qcStockTransferItems: QcStockTransferItem[]
}

export interface TransferItemQualityCheckResponsePage extends TransferItemQualityCheckResponse {}

export interface TransferItemQualityCheckDataRequest extends TransferItemQualityCheckResponse {}

export interface QcStockTransferItem extends Partial<TransferItemDetail> {
  /// same as stockTransferItemId
  qcStockTransferItemId: id
}
