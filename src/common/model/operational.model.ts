import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { TStatus } from '../enum/operational.enum'
import { ProductAvailableItemResponse } from './product-available-item.model'
import { FileUploadResponse } from './file-upload.model'

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
  createdDate: isoDate
  attachmentUrl: string
  notes: string | null
  status: TStatus
  totalItems: number
  totalItemQty: number
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

/**
 * Barang diterima tanpa kerusakan
 */
export interface ShipmentGoodReceiveItem {
  goodsReceiveItemId: id | null
  itemId: id | null
  isHasSN: boolean
  skuCode?: string
  itemName: string
  qtyOrdered: number
  qtyReceived: number
  unitPrice: number
  notes: string
  fileId: id
  attachmentInfo?: FileUploadResponse
}

export interface TransferItem extends Partial<ProductAvailableItemResponse> {
  stockTransferItemId: id | null
  itemId: id
  itemName: string
  skuCode: string
  qtyTransfer: number
  qtyReceived: number | null
  qtyAvailable: number | null
  notes: string | null

  // used for send Post & Put
  qty?: number
  qtyReject?: number
  qcStockTransferItemId?: id | null
  fileId: id
  attachmentInfo?: FileUploadResponse
}

/**
 * Barang yang diterima
 */
export interface ReceiveItem extends TransferItem {}

export interface ShipmentReceiveItem extends ShipmentGoodReceiveItem {
  stockTransferItemId: id | null
  goodsReceiveId: id | null
  itemId: id
  qtyOrdered: number
  notes: string
  skuCode: string
  itemName: string
  qtyReceived: number
  unitPrice: number
}

/**
 * Barang cacat melalui proses quality control
 */
export interface QcItem {
  itemId: id
  itemName?: string
  skuCode?: string
  qcGoodsReceiveItemId?: id
  qtyReject: number
  note?: string | null
  notes?: string | null
  qtyPass: number
  attachmentUrl?: string | null
  fileId: id
}

export interface ShipmentQcGoodReceive {
  qcGoodsReceiveId: id
  totalQtyPass: number
  totalQtyReject: number
  qcStatus: string
  qcNotes: string | null
  qcDate: isoDate
  qcBy: string
  urlPath: string
  qcGoodsReceiveItems: ShipmentQcGoodReceiveItem[]
}

export interface ShipmentQcGoodReceiveItem {
  qcGoodsReceiveItemId: id | null
  itemId: id | null
  itemName: string
  skuCode: string
  qtyPass: number
  qtyOrdered: number
  qtyReject: number
  notes: string | null
  fileId: id
  attachmentInfo?: FileUploadResponse
}
