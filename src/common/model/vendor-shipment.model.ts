import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import {
  ShipmentGoodReceiveItem,
  OperationalRequest,
  OperationalResponse,
  OperationalResponsePage,
  ShipmentReceiveItem,
} from './operational.model'
import { VendorShipmentQualityCheckResponse } from './vendor-shipment-quality-check.model'

export interface VendorShipmentRequest extends IListSortingRequest, OperationalRequest {}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse extends OperationalResponse {
  receiveItems: ShipmentReceiveItem[]
  goodsReceiveItems: ShipmentGoodReceiveItem[]
  qcItems: VendorShipmentQualityCheckResponse
  // same as qcItems
  qcGoodsReceive: VendorShipmentQualityCheckResponse
}

export interface VendorShipmentResponsePage extends OperationalResponsePage {}

export interface VendorShipmentDataRequest extends VendorShipmentResponse {}
