import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface WarehouseSiteRequest extends IListSortingRequest {}

export type WarehouseSiteRequestPage = IPaginationRequest & WarehouseSiteRequest

export interface WarehouseSiteResponse {}

export interface WarehouseSiteResponsePage extends WarehouseSiteResponse {}

export interface WarehouseSiteDataRequest extends WarehouseSiteResponse {}
