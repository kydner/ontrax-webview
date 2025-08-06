import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { VendorShipmentResponse, VendorShipmentResponsePage } from './vendor-shipment.model'

export interface ReceiveItemRequest extends IListSortingRequest {}

export type ReceiveItemRequestPage = IPaginationRequest & ReceiveItemRequest

export interface ReceiveItemResponse extends VendorShipmentResponse {}

export interface ReceiveItemResponsePage extends VendorShipmentResponsePage {}

export interface ReceiveItemDataRequest extends ReceiveItemResponse {}
