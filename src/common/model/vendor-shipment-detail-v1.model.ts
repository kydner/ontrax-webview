import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentDetailV1Request extends IListSortingRequest {}

export type VendorShipmentDetailV1RequestPage = IPaginationRequest & VendorShipmentDetailV1Request

export interface VendorShipmentDetailV1Response {
  id: id
  vendorShipmentId: id
  productId: id
  productName: string
  productCode: string
  manufacturer: string
  notes: string
  qtyOrder: number
  filename: string
  fileUrl: string
}

export interface VendorShipmentDetailV1ResponsePage extends VendorShipmentDetailV1Response {}

export interface VendorShipmentDetailV1DataRequest extends VendorShipmentDetailV1Response {}
