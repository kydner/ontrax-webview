import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { InventoryResponse } from './inventory.model'
import { TStatus } from '../enum/vendor-shipment.enum'
import { ReceiveItem } from '../constants/meta.constant'
import { VendorShipmentQualityCheckResponse } from './vendor-shipment-quality-check.model'

export interface VendorShipmentRequest extends IListSortingRequest {
  status?: TStatus | TStatus[]
  vendorId?: id
  receiveNumber?: number
}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse extends InventoryResponse {
  vendorId: id
  warehouseId: id
  locationWarehouseId?: id
  goodsReceiveId?: id
  referenceNumber: string
  shippingDate: isoDate
  targetReceiveDate: isoDate
  referenceDocument: string
  attachmentUrl: string
  notes: string | null
  status: TStatus
  receiveItems: ReceiveItem[]
  goodsReceiveItems: GoodReceiveItem[]
  qcItems: VendorShipmentQualityCheckResponse
  // same as qcItems
  qcGoodsReceive: VendorShipmentQualityCheckResponse
  totalItems: number
  totalItemQty: number
  fileId: id
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
  notes: string
}

export interface VendorShipmentDataRequest extends VendorShipmentResponse {}

export interface ReceiveItem {
  goodsReceiveId: string | null
  itemId: id
  qtyOrdered: number
  notes: string
  itemCode: string
  itemName: string
  qtyReceived: number | null
  unitPrice: number | null
}

export interface GoodReceiveItem {
  goodsReceiveItemId: id
  itemId: id
  itemCode: string
  itemName: string
  qtyOrdered: number
  qtyReceived: number
  unitPrice: number
  notes: string
}
