import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { VendorShipmentDetailV1Response } from './vendor-shipment-detail-v1.model'
import { VendorShipmentAttachmentV1Response } from './vendor-shipment-attachment-v1.model'

export interface VendorShipmentV1Request extends IListSortingRequest {}

export type VendorShipmentV1RequestPage = IPaginationRequest & VendorShipmentV1Request

export interface VendorShipmentV1Response {
  id: id
  vendorId: id
  vendorName: string
  projectId: id
  projectName: string
  contractId: id
  contractNumber: string
  shippingDate: isoDate
  targetShipmentDate: isoDate
  warehouseId: id
  warehouseName: string
  referenceNumber: string
  vendorShipmentCode: string
  status: string
  details: VendorShipmentDetailV1Response[]
  attachments: VendorShipmentAttachmentV1Response[]
}

export interface VendorShipmentV1ResponsePage extends VendorShipmentV1Response {}

export interface VendorShipmentV1DataRequest extends VendorShipmentV1Response {}
