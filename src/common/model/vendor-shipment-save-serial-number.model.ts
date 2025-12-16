import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentSaveSerialNumberRequest extends IListSortingRequest {}

export type VendorShipmentSaveSerialNumberRequestPage = IPaginationRequest & VendorShipmentSaveSerialNumberRequest

export interface VendorShipmentSaveSerialNumberResponse {}

export interface VendorShipmentSaveSerialNumberResponsePage extends VendorShipmentSaveSerialNumberResponse {}

export interface VendorShipmentSaveSerialNumberDataRequest extends VendorShipmentSaveSerialNumberResponse {
  serialNumber: string
  qtyWork: number
  qtyDamaged?: number
}
