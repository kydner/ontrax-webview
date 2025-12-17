import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentAttachmentRequest extends IListSortingRequest {}

export type VendorShipmentAttachmentRequestPage = IPaginationRequest & VendorShipmentAttachmentRequest

export interface VendorShipmentAttachmentResponse {
  id: id
  vendorShipmentId: id
  filename: string
}

export interface VendorShipmentAttachmentResponsePage extends VendorShipmentAttachmentResponse {}

export interface VendorShipmentAttachmentDataRequest extends VendorShipmentAttachmentResponse {}
