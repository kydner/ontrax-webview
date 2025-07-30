import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentRequest extends IListSortingRequest {}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse {}

export interface VendorShipmentResponsePage extends VendorShipmentResponse {}

export interface VendorShipmentDataRequest extends VendorShipmentResponse {}
