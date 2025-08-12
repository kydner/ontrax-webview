import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { TransferItemDataRequest, TransferItemResponse, TransferItemResponsePage } from './transfer-item.model'

export interface ReceiveItemRequest extends IListSortingRequest {}

export type ReceiveItemRequestPage = IPaginationRequest & ReceiveItemRequest

export interface ReceiveItemResponse extends TransferItemResponse {}

export interface ReceiveItemResponsePage extends TransferItemResponsePage {}

export interface ReceiveItemDataRequest extends ReceiveItemResponse, TransferItemDataRequest {}
