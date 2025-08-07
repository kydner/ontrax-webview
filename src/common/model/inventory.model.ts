import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { TStatus } from '../enum/vendor-shipment.enum'

export interface InventoryRequest extends IListSortingRequest {}

export type InventoryRequestPage = IPaginationRequest & InventoryRequest

export interface InventoryResponse {
  id: id
  receiveNumber: string
  status: TStatus
}

export interface InventoryResponsePage extends InventoryResponse {}

export interface InventoryDataRequest extends InventoryResponse {}
