<template>
  <inventory-list-page :meta="metaInventoryStock"></inventory-list-page>
</template>
<script setup lang="ts">
import { InventoryStock } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { InventoryStockResponsePage } from 'src/common/model/inventory-stock.model'
import InventoryListPage from 'src/components/lib/InventoryListPage.vue'

const metaInventoryStock: IMetaListModule<InventoryStockResponsePage> = InventoryStock
</script>
