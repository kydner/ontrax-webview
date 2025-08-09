import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'

export interface VendorShipmentQualityCheckRequest extends IListSortingRequest {}

export type VendorShipmentQualityCheckRequestPage = IPaginationRequest & VendorShipmentQualityCheckRequest

export interface VendorShipmentQualityCheckResponse {
  qcBy?: string | null
  qcDate?: isoDate | null
  qcGoodsReceiveId?: id | null
  qcGoodsReceiveItems: QcItems[]
  qcItems: QcItems[]
}

export interface VendorShipmentQualityCheckResponsePage extends VendorShipmentQualityCheckResponse {}

export interface VendorShipmentQualityCheckDataRequest extends VendorShipmentQualityCheckResponse {}

export interface QcItems {
  itemId: id
  itemName?: string
  itemCode?: string
  qcGoodsReceiveItemId?: id
  qtyReject: number
  note?: string | null
  notes?: string | null
  qtyPass: number
  attachmentUrl?: string | null
}
