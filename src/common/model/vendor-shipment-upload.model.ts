import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentUploadRequest extends IListSortingRequest {}

export type VendorShipmentUploadRequestPage = IPaginationRequest & VendorShipmentUploadRequest

export interface VendorShipmentUploadResponse {
  id: id
  vendorShipmentId: id
  filename: string
}

export interface VendorShipmentUploadResponsePage extends VendorShipmentUploadResponse {}

export interface VendorShipmentUploadDataRequest extends VendorShipmentUploadResponse {}
