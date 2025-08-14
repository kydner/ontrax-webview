<template>
  <operational-form-page v-model="form" :meta="metaVendorShipment"> </operational-form-page>
</template>
<script setup lang="ts">
import { VendorShipment } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import { VendorShipmentResponsePage } from 'src/common/model/vendor-shipment.model'
import OperationalFormPage from 'src/components/lib/OperationalFormPage.vue'
import { ref } from 'vue'

const metaVendorShipment: IMetaListModule<VendorShipmentResponsePage> = VendorShipment

const form = ref({} as VendorShipmentDataRequest)
</script>
