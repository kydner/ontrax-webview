/**
 * For Shipment Quality Check Request
 */
import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentQualityCheckRequest extends IListSortingRequest {}

export type VendorShipmentQualityCheckRequestPage = IPaginationRequest & VendorShipmentQualityCheckRequest

export interface VendorShipmentQualityCheckResponse {}

export interface VendorShipmentQualityCheckResponsePage extends VendorShipmentQualityCheckResponse {}

export interface VendorShipmentQualityCheckDataRequest extends VendorShipmentQualityCheckResponse {
  qcGoodsReceiveId: id | null
  qcItems: QcItemDetail[]
}

export interface QcItemDetail {
  qcGoodsReceiveItemId: id | null
  qtyReject: number
  note: string | null
  attachmentUrl?: string
  fileId?: id
}
