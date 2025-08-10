import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface StockCardAggregationRequest extends IListSortingRequest {
  itemIds?: id[]
  warehouseIds?: id[]
}

export type StockCardAggregationRequestPage = IPaginationRequest & StockCardAggregationRequest

export interface StockCardAggregationResponse {
  itemId: id
  skuCode: string
  itemName: string
  unit: string
  description: string
  totalCurrentQty: number
  totalReservedQty: number
  totalAvailableQty: number
  warehouseCount: number
  warehouseDetails: {
    locationWarehouseId: id
    warehouseName: string
    warehouseCode: string
    currentQty: number
    reservedQty: number
    availableQty: number
  }[]
}

export interface StockCardAggregationResponsePage extends StockCardAggregationResponse {}

export interface StockCardAggregationDataRequest {}
