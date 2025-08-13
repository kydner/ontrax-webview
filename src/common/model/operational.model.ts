import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { VendorShipmentQualityCheckResponse } from './vendor-shipment-quality-check.model'
import { TStatus } from '../enum/operational.enum'

export interface OperationalRequest extends IListSortingRequest {
  status?: TStatus | TStatus[]
  vendorId?: id
  receiveNumber?: number
}

export type OperationalRequestPage = IPaginationRequest & OperationalRequest

export interface OperationalResponse {
  id?: id
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
  purchaseOrderId: string
  purchaseOrderNumber: string
  locationWarehouseName: string
  vendorName: string
  receiveNumber: string
  transferNumber: string
  actualReceiveDate: string
}

export interface OperationalResponsePage extends OperationalResponse {}

export interface OperationalDataRequest extends OperationalResponse {}

export interface ReceiveItem {
  goodsReceiveId: string | null
  itemId: id
  qtyOrdered: number
  notes: string
  itemCode: string
  itemName: string
  qtyReceived: number
  unitPrice: number
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
