import { IPaginationRequest } from 'src/common/interfaces/response.interface'
import {
  TransferItemDataRequest,
  TransferItemRequest,
  TransferItemResponse,
  TransferItemResponsePage,
} from './transfer-item.model'

export interface ReturSendRequest extends TransferItemRequest {}

export type ReturSendRequestPage = IPaginationRequest & ReturSendRequest

export interface ReturSendResponse extends TransferItemResponse {}

export interface ReturSendResponsePage extends ReturSendResponse, TransferItemResponsePage {}

export interface ReturSendDataRequest extends ReturSendResponse, TransferItemDataRequest {}
