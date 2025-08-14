import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { TransferItemResponse } from './transfer-item.model'

export interface TransferItemBeforeSendRequest extends IListSortingRequest {}

export type TransferItemBeforeSendRequestPage = IPaginationRequest & TransferItemBeforeSendRequest

export interface TransferItemBeforeSendResponse {
  qcStockTransferId: id
  locationWarehouseId: id
  stage: 'ON_SEND'
  totalQtyReject: number
  qcStatus: 'PENDING'
  qcNotes: string | null
  qcDate: string | null
  qcBy: string | null
  qcStockTransferItems: TransferItemResponse['stockTransferItems']
}

export interface TransferItemBeforeSendResponsePage extends TransferItemBeforeSendResponse {}

export interface TransferItemBeforeSendDataRequest extends TransferItemBeforeSendResponse {}
