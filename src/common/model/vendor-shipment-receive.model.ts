import { IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { ShipmentGoodReceiveItem } from './operational.model'

export interface VendorShipmentReceiveRequest extends IListSortingRequest {
  receiveDate: isoDate
}

export type VendorShipmentReceiveRequestPage = IPaginationRequest & VendorShipmentReceiveRequest

export interface VendorShipmentReceiveResponse {}

export interface VendorShipmentReceiveResponsePage extends VendorShipmentReceiveResponse {}

export interface VendorShipmentReceiveDataRequest extends VendorShipmentReceiveResponse {
  receivedItems: ShipmentGoodReceiveItem[]
}
