<template>
  <operational-list-page :meta="metaVendorShipment" key-name="goodsReceiveId"> </operational-list-page>
</template>
<script setup lang="ts">
import { VendorShipmentV1 } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { VendorShipmentResponsePage } from 'src/common/model/vendor-shipment.model'
import OperationalListPage from 'src/components/lib/OperationalListPage.vue'

const metaVendorShipment: IMetaListModule<VendorShipmentResponsePage> = VendorShipmentV1
</script>
