import { IPaginationRequest } from 'src/common/interfaces/response.interface'
import {
  TransferItemDataRequest,
  TransferItemRequest,
  TransferItemResponse,
  TransferItemResponsePage,
} from './transfer-item.model'

export interface ReturReceiveRequest extends TransferItemRequest {}

export type ReturReceiveRequestPage = IPaginationRequest & ReturReceiveRequest

export interface ReturReceiveResponse extends TransferItemResponse {}

export interface ReturReceiveResponsePage extends ReturReceiveResponse, TransferItemResponsePage {}

export interface ReturReceiveDataRequest extends ReturReceiveResponse, TransferItemDataRequest {}
