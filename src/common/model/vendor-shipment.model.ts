import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { InventoryResponse } from './inventory.model'
import { IStatus } from '../enum/vendor-shipment.enum'

export interface VendorShipmentRequest extends IListSortingRequest {
  status?: IStatus
  vendorId?: id
  receiveNumber?: number
}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse extends InventoryResponse {}

export interface VendorShipmentResponsePage extends VendorShipmentResponse {
  goodsReceiveId: string
  purchaseOrderId: string
  purchaseOrderNumber: string
  locationWarehouseId: string
  locationWarehouseName: string
  vendorId: string
  vendorName: string
  receiveNumber: string
  shippingDate: string
  targetReceiveDate: string
  actualReceiveDate: string
  referenceDocument: string
  attachmentUrl: string
  status: IStatus
  notes: string
}

export interface VendorShipmentDataRequest extends VendorShipmentResponse {}
