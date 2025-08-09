import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { TStatus } from '../enum/vendor-shipment.enum'
import { VendorShipmentQualityCheckResponse } from './vendor-shipment-quality-check.model'

export interface InventoryRequest extends IListSortingRequest {
  status?: TStatus | TStatus[]
  vendorId?: id
  receiveNumber?: number
}

export type InventoryRequestPage = IPaginationRequest & InventoryRequest

export interface InventoryResponse {
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
  actualReceiveDate: string
}

export interface InventoryResponsePage extends InventoryResponse {}

export interface InventoryDataRequest extends InventoryResponse {}

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
