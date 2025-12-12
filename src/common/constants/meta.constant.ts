import { IMetaListModule } from '../interfaces/meta.interface'
import { ClientResponsePage } from '../model/client.model'
import { ContractResponsePage } from '../model/contract.model'
import { InventoryStockResponsePage } from '../model/inventory-stock.model'
import { LocationSiteResponsePage } from '../model/location-site.model'
import { LocationWarehouseResponsePage } from '../model/location-warehouse.model'
import { ProductResponsePage } from '../model/product.model'
import { ProjectResponsePage } from '../model/project.model'
import { ReceiveItemResponsePage } from '../model/receive-item.model'
import { TransferItemResponsePage } from '../model/transfer-item.model'
import { VendorShipmentV1ResponsePage } from '../model/vendor-shipment-v1.model'
import { VendorShipmentResponsePage } from '../model/vendor-shipment.model'
import { VendorResponsePage } from '../model/vendor.model'

export const VendorShipment: IMetaListModule<VendorShipmentResponsePage> = {
  title: 'Vendor Shipment',
  name: 'vendor-shipment',
  items: [],
}

export const VendorShipmentV1: IMetaListModule<VendorShipmentV1ResponsePage> = {
  title: 'Vendor Shipment',
  name: 'vendor-shipment-v1',
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

export const DeliverySend: IMetaListModule<ReceiveItemResponsePage> = {
  title: 'Delivery Send',
  name: 'delivery-send',
  items: [],
}

export const DeliveryRequest: IMetaListModule<ReceiveItemResponsePage> = {
  title: 'Delivery Request',
  name: 'delivery-request',
  items: [],
}

export const ReturSend: IMetaListModule<ReceiveItemResponsePage> = {
  title: 'Retur Send',
  name: 'retur-send',
  items: [],
}

export const ReturReceive: IMetaListModule<ReceiveItemResponsePage> = {
  title: 'Retur Receive',
  name: 'retur-receive',
  items: [],
}

export const MaintenanceStatus: IMetaListModule<ReceiveItemResponsePage> = {
  title: 'Maintenance Status',
  name: 'maintenance-status',
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

export const Product: IMetaListModule<ProductResponsePage> = {
  title: 'Product',
  name: 'product',
  items: [],
}

export const Project: IMetaListModule<ProjectResponsePage> = {
  title: 'Project',
  name: 'project',
  items: [],
}

export const Contract: IMetaListModule<ContractResponsePage> = {
  title: 'Contract',
  name: 'contract',
  items: [],
}
