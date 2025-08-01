import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'

export interface InventoryRequest extends IListSortingRequest {}

export type InventoryRequestPage = IPaginationRequest & InventoryRequest

export interface InventoryResponse {
  id: id
  code: string
  company: string
  itemCount: number
  status: string
  date: isoDate
}

export interface InventoryResponsePage extends InventoryResponse {}

export interface InventoryDataRequest extends InventoryResponse {}
