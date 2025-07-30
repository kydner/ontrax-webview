import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ReceiveItemRequest extends IListSortingRequest {}

export type ReceiveItemRequestPage = IPaginationRequest & ReceiveItemRequest

export interface ReceiveItemResponse {}

export interface ReceiveItemResponsePage extends ReceiveItemResponse {}

export interface ReceiveItemDataRequest extends ReceiveItemResponse {}
