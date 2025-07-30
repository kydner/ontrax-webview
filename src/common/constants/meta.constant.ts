import { IMetaModule } from '../interfaces/meta.interface'
import { InventoryStockResponsePage } from '../model/inventory-stock.model'
import { ReceiveItemResponsePage } from '../model/receive-item.model'
import { TransferItemResponsePage } from '../model/transfer-item.model'
import { VendorShipmentResponsePage } from '../model/vendor-shipment.model'

export const VendorShipment: IMetaModule<VendorShipmentResponsePage> = {
  id: 1,
  title: 'Vendor Shipment',
  name: 'vendor-shipment',
  columns: [],
}

export const TransferItem: IMetaModule<TransferItemResponsePage> = {
  id: 2,
  title: 'Transfer Item',
  name: 'transfer-item',
  columns: [],
}

export const ReceiveItem: IMetaModule<ReceiveItemResponsePage> = {
  id: 3,
  title: 'Receive Item',
  name: 'receive-item',
  columns: [],
}

export const InventoryStock: IMetaModule<InventoryStockResponsePage> = {
  id: 4,
  title: 'Inventory Stock',
  name: 'inventory-stock',
  columns: [],
}
