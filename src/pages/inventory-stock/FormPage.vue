<template>
  <inventory-form-page v-model="form" :meta="metaInventoryStock"></inventory-form-page>
</template>
<script setup lang="ts">
import { InventoryStock } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { InventoryStockResponsePage } from 'src/common/model/inventory-stock.model'
import { InventoryDataRequest } from 'src/common/model/inventory.model'
import InventoryFormPage from 'src/components/lib/InventoryFormPage.vue'
import { ref } from 'vue'

const metaInventoryStock: IMetaListModule<InventoryStockResponsePage> = InventoryStock

const form = ref({} as InventoryDataRequest)
</script>
