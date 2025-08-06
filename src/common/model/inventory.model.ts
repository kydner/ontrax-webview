import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface InventoryRequest extends IListSortingRequest {}

export type InventoryRequestPage = IPaginationRequest & InventoryRequest

export interface InventoryResponse {
  id: id
  receiveNumber: string
}

export interface InventoryResponsePage extends InventoryResponse {}

export interface InventoryDataRequest extends InventoryResponse {}
