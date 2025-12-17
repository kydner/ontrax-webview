import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { ContractProductResponse } from './contract-product.model'
import { VendorShipmentItemResponse } from './vendor-shipment-item.model'
import { VendorShipmentAttachmentResponse } from './vendor-shipment-attachment.model'
import { VendorShipmentDetailResponse } from './vendor-shipment-detail.model'
import { TStatus } from '../enum/vendor-shipment.enum'

export interface VendorShipmentRequest extends IListSortingRequest {}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse {
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
  status: TStatus
  totalItems: number
  createdDate: isoDate
  details?: VendorShipmentDetailResponse[]
  attachmentIds: id[]
  attachments: VendorShipmentAttachmentResponse[]
  items?: VendorShipmentItemResponse[]
  // TEMP FOR SCANNED ITEM
  receiveItems?: ContractProductResponse[]
}

export interface VendorShipmentResponsePage extends VendorShipmentResponse {}

export interface VendorShipmentDataRequest extends VendorShipmentResponse {}
