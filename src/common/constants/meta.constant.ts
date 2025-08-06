import { IMetaListModule } from '../interfaces/meta.interface'
import { ClientResponsePage } from '../model/client.model'
import { InventoryStockResponsePage } from '../model/inventory-stock.model'
import { LocationSiteResponsePage } from '../model/location-site.model'
import { LocationWarehouseResponsePage } from '../model/location-warehouse.model'
import { ReceiveItemResponsePage } from '../model/receive-item.model'
import { TransferItemResponsePage } from '../model/transfer-item.model'
import { VendorShipmentResponsePage } from '../model/vendor-shipment.model'
import { VendorResponsePage } from '../model/vendor.model'

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

export const LocationSite: IMetaListModule<LocationSiteResponsePage> = {
  title: 'Location Site',
  name: 'location-site',
  items: [],
}

export const LocationWarehouse: IMetaListModule<LocationWarehouseResponsePage> = {
  title: 'Location Warehouse',
  name: 'location-warehouse',
  items: [],
}

export const Client: IMetaListModule<ClientResponsePage> = {
  title: 'Client',
  name: 'client',
  items: [],
}

export const Vendor: IMetaListModule<VendorResponsePage> = {
  title: 'Vendor',
  name: 'vendor',
  items: [],
}

export const Product: IMetaListModule<VendorResponsePage> = {
  title: 'Product',
  name: 'product',
  items: [],
}
