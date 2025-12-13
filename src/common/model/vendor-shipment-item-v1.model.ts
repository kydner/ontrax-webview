import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentItemV1Request extends IListSortingRequest {}

export type VendorShipmentItemV1RequestPage = IPaginationRequest & VendorShipmentItemV1Request

export interface VendorShipmentItemV1Response {
  productId: id
  notes: string
  qtyOrder: number
}

export interface VendorShipmentItemV1ResponsePage extends VendorShipmentItemV1Response {}

export interface VendorShipmentItemV1DataRequest extends VendorShipmentItemV1Response {}
