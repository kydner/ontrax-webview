<template>
  <FormPage v-model="form"> </FormPage>
</template>
<script setup lang="ts">
import { VendorShipmentV1DataRequest } from 'src/common/model/vendor-shipment-v1.model'
import FormPage from 'src/components/page/v1/vendor-shipment/FormPage.vue'
import { ref } from 'vue'

const form = ref({} as VendorShipmentV1DataRequest)
</script>
