import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { OperationalResponse, TransferItem } from './operational.model'
import { TStatus } from '../enum/operational.enum'
import { TransferItemBeforeSendResponse } from './transfer-item-before-send.model'
import { TransferItemAfterSendResponse } from './transfer-item-after-send.model'
import { FileUploadResponse } from './file-upload.model'

export interface TransferItemRequest extends IListSortingRequest {
  trfNumber?: string
  fromWarehouseId?: id
  toWarehouseId?: id
  status?: TStatus | TStatus[]
}

export type TransferItemRequestPage = IPaginationRequest & TransferItemRequest

export interface TransferItemResponse extends OperationalResponse {
  stockTransferId: id
  transferNumber: string
  fromLocationWarehouseName: string
  toLocationWarehouseName: string
  transferDate: isoDate
  receiveDate?: isoDate
  status: TStatus
  totalItems: number
  totalItemQty: number
  fromWarehouseId: id
  fromLocationWarehouseId: id
  toWarehouseId: id | null
  toLocationWarehouseId: id
  stockTransferItems: TransferItem[]
  senderNotes: string | null
  receiverNotes?: string | null
  attachmentId: id
  attachmentInfo?: FileUploadResponse
  transferItems: TransferItem[]
  qcBeforeSend: TransferItemBeforeSendResponse
  qcAfterReceived: TransferItemAfterSendResponse
}

export interface TransferItemResponsePage extends TransferItemResponse, OperationalResponse {}

export interface TransferItemDataRequest extends TransferItemResponse {}
