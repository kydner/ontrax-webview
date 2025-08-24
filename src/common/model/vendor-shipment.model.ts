import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import {
  ShipmentGoodReceiveItem,
  OperationalRequest,
  OperationalResponse,
  OperationalResponsePage,
  ShipmentQcGoodReceive,
} from './operational.model'
import { FileUploadResponse } from './file-upload.model'

export interface VendorShipmentRequest extends IListSortingRequest, OperationalRequest {}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse extends OperationalResponse {
  /**
   * used for request Post & Put
   */
  receiveItems?: ShipmentGoodReceiveItem[]

  goodsReceiveItems: ShipmentGoodReceiveItem[]

  receiveDate?: isoDate

  qcGoodsReceive: ShipmentQcGoodReceive

  attachmentId: id

  attachmentInfo?: FileUploadResponse
}

export interface VendorShipmentResponsePage extends OperationalResponsePage {}

export interface VendorShipmentDataRequest extends VendorShipmentResponse {}
