import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import {
  ShipmentGoodReceiveItem,
  OperationalRequest,
  OperationalResponse,
  OperationalResponsePage,
  ShipmentQcGoodReceive,
} from './operational.model'

export interface VendorShipmentRequest extends IListSortingRequest, OperationalRequest {}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse extends OperationalResponse {
  /**
   * used for request Post & Put
   */
  receiveItems?: ShipmentGoodReceiveItem[]

  goodsReceiveItems: ShipmentGoodReceiveItem[]

  qcGoodsReceive: ShipmentQcGoodReceive
}

export interface VendorShipmentResponsePage extends OperationalResponsePage {}

export interface VendorShipmentDataRequest extends VendorShipmentResponse {}
