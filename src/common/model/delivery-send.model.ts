import { IPaginationRequest } from 'src/common/interfaces/response.interface'
import {
  TransferItemDataRequest,
  TransferItemRequest,
  TransferItemResponse,
  TransferItemResponsePage,
} from './transfer-item.model'

export interface DeliverySendRequest extends TransferItemRequest {}

export type DeliverySendRequestPage = IPaginationRequest & DeliverySendRequest

export interface DeliverySendResponse extends TransferItemResponse {}

export interface DeliverySendResponsePage extends DeliverySendResponse, TransferItemResponsePage {}

export interface DeliverySendDataRequest extends DeliverySendResponse, TransferItemDataRequest {}
