import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { TransferItem } from './operational.model'

export interface TransferItemQualityCheckRequest extends IListSortingRequest {}

export type TransferItemQualityCheckRequestPage = IPaginationRequest & TransferItemQualityCheckRequest

export interface TransferItemQualityCheckResponse {
  qcStockTransferId: id
  qcNotes: string
  qcStockTransferItems: QcStockTransferItem[]
}

export interface TransferItemQualityCheckResponsePage extends TransferItemQualityCheckResponse {}

export interface TransferItemQualityCheckDataRequest extends TransferItemQualityCheckResponse {}

export interface QcStockTransferItem extends Partial<TransferItem> {
  /// same as stockTransferItemId
  qcStockTransferItemId: id
}
