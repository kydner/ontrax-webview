<template>
  <meta-form-page :meta="metaVendorShipment"></meta-form-page>
</template>
<script setup lang="ts">
import { VendorShipment } from 'src/common/constants/meta.constant'
import { IMetaModule } from 'src/common/interfaces/meta.interface'
import MetaFormPage from 'src/components/lib/MetaFormPage.vue'
import { computed } from 'vue'

const metaVendorShipment = computed(() => VendorShipment as IMetaModule)
</script>
