import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorShipmentAttachmentV1Request extends IListSortingRequest {}

export type VendorShipmentAttachmentV1RequestPage = IPaginationRequest & VendorShipmentAttachmentV1Request

export interface VendorShipmentAttachmentV1Response {
  id: id
  vendorShipmentId: id
  filename: string
}

export interface VendorShipmentAttachmentV1ResponsePage extends VendorShipmentAttachmentV1Response {}

export interface VendorShipmentAttachmentV1DataRequest extends VendorShipmentAttachmentV1Response {}
