import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface WarehouseRequest extends IListSortingRequest {}

export type WarehouseRequestPage = IPaginationRequest & WarehouseRequest

export interface WarehouseResponse {}

export interface WarehouseResponsePage extends WarehouseResponse {}

export interface WarehouseDataRequest extends WarehouseResponse {}
