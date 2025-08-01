import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { InventoryResponse } from './inventory.model'

export interface TransferItemRequest extends IListSortingRequest {}

export type TransferItemRequestPage = IPaginationRequest & TransferItemRequest

export interface TransferItemResponse extends InventoryResponse {}

export interface TransferItemResponsePage extends TransferItemResponse {}

export interface TransferItemDataRequest extends TransferItemResponse {}
