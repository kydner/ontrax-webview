import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { StockCardDataRequest, StockCardResponse } from './stock-card.model'

export interface StockCardLowStockRequest extends IListSortingRequest {
  threshold: number
}

export type StockCardLowStockRequestPage = IPaginationRequest & StockCardLowStockRequest

export interface StockCardLowStockResponse extends StockCardResponse {}

export interface StockCardLowStockResponsePage extends StockCardLowStockResponse {}

export interface StockCardLowStockDataRequest extends StockCardDataRequest {}
