<template>
  <meta-list-page :meta="metaVendorShipment"></meta-list-page>
</template>
<script setup lang="ts">
import { VendorShipment } from 'src/common/constants/meta.constant'
import { IMetaModule } from 'src/common/interfaces/meta.interface'
import MetaListPage from 'src/components/lib/MetaListPage.vue'
import { computed } from 'vue'

const metaVendorShipment = computed(() => VendorShipment as IMetaModule)
</script>
