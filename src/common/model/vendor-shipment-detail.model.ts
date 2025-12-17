import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentDetailRequest extends IListSortingRequest {}

export type VendorShipmentDetailRequestPage = IPaginationRequest & VendorShipmentDetailRequest

export interface VendorShipmentDetailResponse {
  id?: id
  vendorShipmentId: id
  productId: id
  productName: string
  srtPartNumber: string
  manufacturer?: string
  notes: string
  qtyOrder: number
  filename?: string
  fileUrl?: string
  isUniqueSerialNumber: boolean
  qtyOrdered: number
  qtyReceived: number
  qtyRejected: number
}

export interface VendorShipmentDetailResponsePage extends VendorShipmentDetailResponse {}

export interface VendorShipmentDetailDataRequest extends VendorShipmentDetailResponse {}
