import { IListSortingRequest, IPaginationRequest, id, isoDate } from 'src/common/interfaces/response.interface'
import { LocationWarehouseResponse } from './location-warehouse.model'
import { ProductResponse } from './product.model'

export interface StockMovementRequest extends IListSortingRequest {
  itemId: id
  warehouseId: id
}

export type StockMovementRequestPage = IPaginationRequest & StockMovementRequest

export interface StockMovementResponse {
  stockMovementId: id
  referenceId: id
  movementType: 'IN' | 'OUT' | 'ADJUSTMENT'
  movementNumber: string
  qtyBefore: number
  qtyChange: number
  qtyAfter: number
  notes: string
  movementDate: isoDate
  createdDate: isoDate
  updatedDate: isoDate
  createdBy: string
  updatedBy: string
  locationWarehouse: Pick<LocationWarehouseResponse, 'locationWarehouseId' | 'warehouseName' | 'warehouseCode'>
  item: Pick<ProductResponse, 'itemId' | 'itemName' | 'skuCode'>
}

export interface StockMovementResponsePage extends StockMovementResponse {}

export interface StockMovementDataRequest extends StockMovementResponse {
  id: id
}
