/**
 * For Shipment Quality Check Request
 */
import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentQualityCheckRequest extends IListSortingRequest {}

export type VendorShipmentQualityCheckRequestPage = IPaginationRequest & VendorShipmentQualityCheckRequest

export interface VendorShipmentQualityCheckResponse {}

export interface VendorShipmentQualityCheckResponsePage extends VendorShipmentQualityCheckResponse {}

export interface VendorShipmentQualityCheckDataRequest extends VendorShipmentQualityCheckResponse {
  qcDetails: QcItemDetail[]
}

export interface QcItemDetail {
  vendorShipmentDetailId: id
  rejectedItems: QcRejectedItem[]
}

export interface QcRejectedItem {
  vendorShipmentSerialNumberId: id
  serialNumber: string
  rejectedQuantity: number
  qcNote: string
  qcAttachmentIds?: string[]
}
