import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { LocationWarehouseDataRequest, LocationWarehouseResponse } from './location-warehouse.model'

export interface LocationWarehouseExistByCodeRequest extends IListSortingRequest {
  warehouseCode: number
}

export type LocationWarehouseExistByCodeRequestPage = IPaginationRequest & LocationWarehouseExistByCodeRequest

export interface LocationWarehouseExistByCodeResponse extends LocationWarehouseResponse {}

export interface LocationWarehouseExistByCodeResponsePage extends LocationWarehouseExistByCodeResponse {}

export interface LocationWarehouseExistByCodeDataRequest extends LocationWarehouseDataRequest {}
