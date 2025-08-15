import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentReceiveItemRequest extends IListSortingRequest {}

export type VendorShipmentReceiveItemRequestPage = IPaginationRequest & VendorShipmentReceiveItemRequest

export interface VendorShipmentReceiveItemResponse {}

export interface VendorShipmentReceiveItemResponsePage extends VendorShipmentReceiveItemResponse {}

export interface VendorShipmentReceiveItemDataRequest extends VendorShipmentReceiveItemResponse {
  goodsReceiveItemId: id | null
  goodsReceiveId: id | null
  itemId: id | null
  qtyOrdered: number
  notes: string | null
}
