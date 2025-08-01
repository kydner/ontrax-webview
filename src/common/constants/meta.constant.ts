import { IMetaListModule } from '../interfaces/meta.interface'
import { InventoryStockResponsePage } from '../model/inventory-stock.model'
import { ReceiveItemResponsePage } from '../model/receive-item.model'
import { TransferItemResponsePage } from '../model/transfer-item.model'
import { VendorShipmentResponsePage } from '../model/vendor-shipment.model'

export const VendorShipment: IMetaListModule<VendorShipmentResponsePage> = {
  title: 'Vendor Shipment',
  name: 'vendor-shipment',
  items: [],
}

export const TransferItem: IMetaListModule<TransferItemResponsePage> = {
  title: 'Transfer Item',
  name: 'transfer-item',
  items: [],
}

export const ReceiveItem: IMetaListModule<ReceiveItemResponsePage> = {
  title: 'Receive Item',
  name: 'receive-item',
  items: [],
}

export const InventoryStock: IMetaListModule<InventoryStockResponsePage> = {
  title: 'Inventory Stock',
  name: 'inventory-stock',
  items: [],
}
