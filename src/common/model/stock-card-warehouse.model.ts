import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { StockCardResponse } from './stock-card.model'

export interface StockCardWarehouseRequest extends IListSortingRequest {
  locationWarehouseId: id
}

export type StockCardWarehouseRequestPage = IPaginationRequest & StockCardWarehouseRequest

export interface StockCardWarehouseResponse extends StockCardResponse {}

export interface StockCardWarehouseResponsePage extends StockCardWarehouseResponse {}

export interface StockCardWarehouseDataRequest extends StockCardWarehouseResponse {}
