import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { LocationWarehouseResponse } from './location-warehouse.model'

export interface StockCardRequest extends IListSortingRequest {}

export type StockCardRequestPage = IPaginationRequest & StockCardRequest

export interface StockCardResponse {
  locationWarehouseId: id
  itemId: id
  /**
   * Current Qty
   * Datatype float
   */
  currentQty: number /// Qty saat ini
  reservedQty: number /// Qty yang dipesan
  /**
   * Available Qty
   * Datatype float
   */
  availableQty: number /// Qty yang tersedia
  createdDate: isoDate
  updatedDate: isoDate
  createdBy: string
  updatedBy: string
  unit: string
  locationWarehouse: Pick<LocationWarehouseResponse, 'locationWarehouseId' | 'warehouseName' | 'warehouseCode'>
  item: {
    itemId: id
    itemName: string
    skuCode: string
  }
}

export interface StockCardResponsePage extends StockCardResponse {}

export interface StockCardDataRequest extends StockCardResponse {}
