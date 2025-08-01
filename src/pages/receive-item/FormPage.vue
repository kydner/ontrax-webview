<template>
  <inventory-form-page v-model="form" :meta="metaReceiveItem"></inventory-form-page>
</template>
<script setup lang="ts">
import { ReceiveItem } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { InventoryDataRequest } from 'src/common/model/inventory.model'
import { ReceiveItemResponsePage } from 'src/common/model/receive-item.model'
import InventoryFormPage from 'src/components/lib/InventoryFormPage.vue'
import { ref } from 'vue'

const metaReceiveItem: IMetaListModule<ReceiveItemResponsePage> = ReceiveItem

const form = ref({} as InventoryDataRequest)
</script>
