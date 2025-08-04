import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { StockCardDataRequest, StockCardResponse } from './stock-card.model'

export interface StockCardSearchRequest extends IListSortingRequest {
  locationWarehouseId?: id
  itemId?: id
  minAvailableQty?: number /// default 1
}

export type StockCardSearchRequestPage = IPaginationRequest & StockCardSearchRequest

export interface StockCardSearchResponse extends StockCardResponse {}

export interface StockCardSearchResponsePage extends StockCardSearchResponse {}

export interface StockCardSearchDataRequest extends StockCardDataRequest {}
