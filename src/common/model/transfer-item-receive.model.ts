import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { ReceiveItem } from './operational.model'

export interface TransferItemReceiveRequest extends IListSortingRequest {}

export type TransferItemReceiveRequestPage = IPaginationRequest & TransferItemReceiveRequest

export interface TransferItemReceiveResponse {}

export interface TransferItemReceiveResponsePage extends TransferItemReceiveResponse {}

export interface TransferItemReceiveDataRequest extends TransferItemReceiveResponse {
  receivedItems: Pick<ReceiveItem, 'stockTransferItemId' | 'qtyReceived'>[]
  receiverNotes?: string | null
}
