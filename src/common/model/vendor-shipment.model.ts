import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { InventoryDataRequest, InventoryRequest, InventoryResponse, InventoryResponsePage } from './inventory.model'

export interface VendorShipmentRequest extends IListSortingRequest, InventoryRequest {}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse extends InventoryResponse {}

export interface VendorShipmentResponsePage extends InventoryResponsePage {}

export interface VendorShipmentDataRequest extends InventoryDataRequest {}
