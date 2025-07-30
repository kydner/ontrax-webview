import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface InventoryStockRequest extends IListSortingRequest {}

export type InventoryStockRequestPage = IPaginationRequest & InventoryStockRequest

export interface InventoryStockResponse {}

export interface InventoryStockResponsePage extends InventoryStockResponse {}

export interface InventoryStockDataRequest extends InventoryStockResponse {}
