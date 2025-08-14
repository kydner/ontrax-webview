import { IPaginationRequest } from 'src/common/interfaces/response.interface'
import {
  TransferItemDataRequest,
  TransferItemRequest,
  TransferItemResponse,
  TransferItemResponsePage,
} from './transfer-item.model'

export interface ReceiveItemRequest extends TransferItemRequest {}

export type ReceiveItemRequestPage = IPaginationRequest & ReceiveItemRequest

export interface ReceiveItemResponse extends TransferItemResponse {
  senderNotes: string
  receiverNotes: string
}

export interface ReceiveItemResponsePage extends ReceiveItemResponse, TransferItemResponsePage {}

export interface ReceiveItemDataRequest extends ReceiveItemResponse, TransferItemDataRequest {}
