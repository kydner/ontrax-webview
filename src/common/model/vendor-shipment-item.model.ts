import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentItemRequest extends IListSortingRequest {}

export type VendorShipmentItemRequestPage = IPaginationRequest & VendorShipmentItemRequest

export interface VendorShipmentItemResponse {
  productId: id
  notes: string
  qtyOrder: number
}

export interface VendorShipmentItemResponsePage extends VendorShipmentItemResponse {}

export interface VendorShipmentItemDataRequest extends VendorShipmentItemResponse {}
