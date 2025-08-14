import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { TransferItemResponse } from './transfer-item.model'

export interface TransferItemAfterSendRequest extends IListSortingRequest {}

export type TransferItemAfterSendRequestPage = IPaginationRequest & TransferItemAfterSendRequest

export interface TransferItemAfterSendResponse {
  qcStockTransferId: id
  locationWarehouseId: id
  stage: string
  totalQtyReject: 0
  qcStatus: 'PENDING'
  qcNotes: string
  qcDate: isoDate
  qcBy: string
  qcStockTransferItems: TransferItemResponse['stockTransferItems']
}

export interface TransferItemAfterSendResponsePage extends TransferItemAfterSendResponse {}

export interface TransferItemAfterSendDataRequest extends TransferItemAfterSendResponse {}
