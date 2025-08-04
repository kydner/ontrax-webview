import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { LocationWarehouseDataRequest, LocationWarehouseResponse } from './location-warehouse.model'

export interface LocationWarehouseCapacityGreaterThanRequest extends IListSortingRequest {
  capacity: number
}

export type LocationWarehouseCapacityGreaterThanRequestPage = IPaginationRequest &
  LocationWarehouseCapacityGreaterThanRequest

export interface LocationWarehouseCapacityGreaterThanResponse extends LocationWarehouseResponse {}

export interface LocationWarehouseCapacityGreaterThanResponsePage
  extends LocationWarehouseCapacityGreaterThanResponse {}

export interface LocationWarehouseCapacityGreaterThanDataRequest extends LocationWarehouseDataRequest {}
