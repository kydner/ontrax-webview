import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { InventoryResponse } from './inventory.model'

export interface ReceiveItemRequest extends IListSortingRequest {}

export type ReceiveItemRequestPage = IPaginationRequest & ReceiveItemRequest

export interface ReceiveItemResponse extends InventoryResponse {}

export interface ReceiveItemResponsePage extends ReceiveItemResponse {}

export interface ReceiveItemDataRequest extends ReceiveItemResponse {}
