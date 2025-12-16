/**
 * For Shipment Quality Check Request
 */
import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentAdjustmentQuantityDetailRequest extends IListSortingRequest {
  quantity: number
}

export type VendorShipmentAdjustmentQuantityDetailRequestPage = IPaginationRequest &
  VendorShipmentAdjustmentQuantityDetailRequest

export interface VendorShipmentAdjustmentQuantityDetailResponse {
  detailId: id
  currentQuantity: number
}

export interface VendorShipmentAdjustmentQuantityDetailResponsePage
  extends VendorShipmentAdjustmentQuantityDetailResponse {}

export interface VendorShipmentAdjustmentQuantityDetailDataRequest
  extends VendorShipmentAdjustmentQuantityDetailResponse {}
