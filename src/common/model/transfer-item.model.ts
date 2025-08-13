import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { OperationalDataRequest, OperationalResponse } from './operational.model'
import { TStatus } from '../enum/operational.enum'

export interface TransferItemRequest extends IListSortingRequest {}

export type TransferItemRequestPage = IPaginationRequest & TransferItemRequest

export interface TransferItemResponse extends OperationalResponse {
  stockTransferId: id
  transferNumber: string
  fromLocationWarehouseName: string
  toLocationWarehouseName: string
  transferDate: isoDate
  status: TStatus
  totalItems: number
  totalItemQty: number
  fromWarehouseId: id
  fromLocationWarehouseId: id
  toWarehouseId: id
  toLocationWarehouseId: id
  stockTransferItems: TransferItemDetail[]
  senderNotes: string
  attachmentId?: id
  transferItems: TransferItemDetail[]
}

export interface TransferItemResponsePage extends TransferItemResponse, OperationalResponse {}

export interface TransferItemDataRequest extends TransferItemResponse, OperationalDataRequest {}

export interface TransferItemDetail {
  stockTransferItemId?: id
  transferItemId?: id
  transferId?: id
  itemId: id
  qty: number
  qtyTransfer?: number
  notes: string
  itemName: string
  itemCode?: string
}
