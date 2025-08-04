import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { StockCardResponse } from './stock-card.model'

export interface StockCardLocationWarehouseRequest extends IListSortingRequest {
  locationWarehouseId: id
  itemId: id
}

export type StockCardLocationWarehouseRequestPage = IPaginationRequest & StockCardLocationWarehouseRequest

export interface StockCardLocationWarehouseResponse extends StockCardResponse {}

export interface StockCardLocationWarehouseResponsePage extends StockCardLocationWarehouseResponse {}

export interface StockCardLocationWarehouseDataRequest extends StockCardLocationWarehouseResponse {}
