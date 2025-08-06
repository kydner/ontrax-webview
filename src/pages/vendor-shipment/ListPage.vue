<template>
  <inventory-list-page :meta="metaVendorShipment" form-id="goodsReceiveId"> </inventory-list-page>
</template>
<script setup lang="ts">
import { VendorShipment } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { VendorShipmentResponsePage } from 'src/common/model/vendor-shipment.model'
import InventoryListPage from 'src/components/lib/InventoryListPage.vue'

const metaVendorShipment: IMetaListModule<VendorShipmentResponsePage> = VendorShipment
</script>
