import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface TransferItemRequest extends IListSortingRequest {}

export type TransferItemRequestPage = IPaginationRequest & TransferItemRequest

export interface TransferItemResponse {}

export interface TransferItemResponsePage extends TransferItemResponse {}

export interface TransferItemDataRequest extends TransferItemResponse {}
