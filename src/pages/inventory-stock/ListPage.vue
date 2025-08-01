<template>
  <operational-list-page :meta="metaInventoryStock"></operational-list-page>
</template>
<script setup lang="ts">
import { InventoryStock } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { InventoryStockResponsePage } from 'src/common/model/inventory-stock.model'
import OperationalListPage from 'src/components/lib/OperationalListPage.vue'

const metaInventoryStock: IMetaListModule<InventoryStockResponsePage> = InventoryStock
</script>
