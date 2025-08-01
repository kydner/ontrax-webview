<template>
  <inventory-form-page v-model="form" :meta="metaVendorShipment"></inventory-form-page>
</template>
<script setup lang="ts">
import { VendorShipment } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { InventoryDataRequest } from 'src/common/model/inventory.model'
import { VendorShipmentResponsePage } from 'src/common/model/vendor-shipment.model'
import InventoryFormPage from 'src/components/lib/InventoryFormPage.vue'
import { ref } from 'vue'

const metaVendorShipment: IMetaListModule<VendorShipmentResponsePage> = VendorShipment

const form = ref({} as InventoryDataRequest)
</script>
