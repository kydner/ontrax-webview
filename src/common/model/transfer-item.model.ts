import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { VendorShipmentResponse, VendorShipmentResponsePage } from './vendor-shipment.model'

export interface TransferItemRequest extends IListSortingRequest {}

export type TransferItemRequestPage = IPaginationRequest & TransferItemRequest

export interface TransferItemResponse extends VendorShipmentResponse {}

export interface TransferItemResponsePage extends VendorShipmentResponsePage {}

export interface TransferItemDataRequest extends VendorShipmentResponse {}
