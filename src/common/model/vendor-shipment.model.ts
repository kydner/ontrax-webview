import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { InventoryResponse } from './inventory.model'

export interface VendorShipmentRequest extends IListSortingRequest {}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse extends InventoryResponse {}

export interface VendorShipmentResponsePage extends VendorShipmentResponse {}

export interface VendorShipmentDataRequest extends VendorShipmentResponse {}
