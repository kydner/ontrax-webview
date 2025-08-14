import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { QcItem } from './operational.model'

export interface VendorShipmentQualityCheckRequest extends IListSortingRequest {}

export type VendorShipmentQualityCheckRequestPage = IPaginationRequest & VendorShipmentQualityCheckRequest

export interface VendorShipmentQualityCheckResponse {
  qcBy?: string | null
  qcDate?: isoDate | null
  qcGoodsReceiveId?: id | null
  qcGoodsReceiveItems: QcItem[]
  qcItems: QcItem[]
}

export interface VendorShipmentQualityCheckResponsePage extends VendorShipmentQualityCheckResponse {}

export interface VendorShipmentQualityCheckDataRequest extends VendorShipmentQualityCheckResponse {}
