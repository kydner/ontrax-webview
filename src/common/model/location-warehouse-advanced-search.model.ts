import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { LocationWarehouseDataRequest, LocationWarehouseResponse } from './location-warehouse.model'

export interface LocationWarehouseAdvancedSearchRequest extends IListSortingRequest {
  warehouseName?: string
  warehouseCode?: string
  isActive?: boolean
  locationSiteId?: id
  minCapacity?: number
  maxCapacity?: number
}

export type LocationWarehouseAdvancedSearchRequestPage = IPaginationRequest & LocationWarehouseAdvancedSearchRequest

export interface LocationWarehouseAdvancedSearchResponse extends LocationWarehouseResponse {}

export interface LocationWarehouseAdvancedSearchResponsePage extends LocationWarehouseAdvancedSearchResponse {}

export interface LocationWarehouseAdvancedSearchDataRequest extends LocationWarehouseDataRequest {}
