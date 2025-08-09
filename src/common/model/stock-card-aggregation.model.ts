import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { StockCardDataRequest, StockCardResponse } from './stock-card.model'

export interface StockCardAggregationRequest extends IListSortingRequest {
  itemIds: id[]
  warehouseIds: id[]
}

export type StockCardAggregationRequestPage = IPaginationRequest & StockCardAggregationRequest

export interface StockCardAggregationResponse extends StockCardResponse {}

export interface StockCardAggregationResponsePage extends StockCardAggregationResponse {}

export interface StockCardAggregationDataRequest extends StockCardDataRequest {}
