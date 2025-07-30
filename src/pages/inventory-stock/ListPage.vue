<template>
  <meta-list-page :meta="metaInventoryStock"></meta-list-page>
</template>
<script setup lang="ts">
import { InventoryStock } from 'src/common/constants/meta.constant'
import { IMetaModule } from 'src/common/interfaces/meta.interface'
import MetaListPage from 'src/components/lib/MetaListPage.vue'
import { computed } from 'vue'

const metaInventoryStock = computed(() => InventoryStock as IMetaModule)
</script>
