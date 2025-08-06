import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { InventoryResponse } from './inventory.model'
import { IStatus } from '../enum/vendor-shipment.enum'
import { ReceiveItem } from '../constants/meta.constant'

export interface VendorShipmentRequest extends IListSortingRequest {
  status?: IStatus
  vendorId?: id
  receiveNumber?: number
}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse extends InventoryResponse {
  vendorId: string
  warehouseId: string
  referenceNumber: string
  shippingDate: isoDate
  targetReceiveDate: isoDate
  referenceDocument: string
  attachmentUrl: string
  notes: string
  receiveItems: ReceiveItem[]
}

export interface VendorShipmentResponsePage extends VendorShipmentResponse {
  goodsReceiveId: string
  purchaseOrderId: string
  purchaseOrderNumber: string
  locationWarehouseId: string
  locationWarehouseName: string
  vendorName: string
  receiveNumber: string
  actualReceiveDate: string
  attachmentUrl: string
  status: IStatus
  notes: string
}

export interface VendorShipmentDataRequest extends VendorShipmentResponse {}

export interface ReceiveItem {
  goodsReceiveId: string
  itemId: string
  qtyOrdered: 0
  notes: string
}
