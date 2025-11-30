import { IPaginationRequest } from 'src/common/interfaces/response.interface'
import {
  TransferItemDataRequest,
  TransferItemRequest,
  TransferItemResponse,
  TransferItemResponsePage,
} from './transfer-item.model'

export interface DeliveryRequestRequest extends TransferItemRequest {}

export type DeliveryRequestRequestPage = IPaginationRequest & DeliveryRequestRequest

export interface DeliveryRequestResponse extends TransferItemResponse {}

export interface DeliveryRequestResponsePage extends DeliveryRequestResponse, TransferItemResponsePage {}

export interface DeliveryRequestDataRequest extends DeliveryRequestResponse, TransferItemDataRequest {}
