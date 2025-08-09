<template>
  <operational-form-page v-model="form" :meta="metaTransferItem"></operational-form-page>
</template>
<script setup lang="ts">
import { TransferItem } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { InventoryDataRequest } from 'src/common/model/inventory.model'
import { TransferItemResponsePage } from 'src/common/model/transfer-item.model'
import OperationalFormPage from 'src/components/lib/OperationalFormPage.vue'
import { ref } from 'vue'

const metaTransferItem: IMetaListModule<TransferItemResponsePage> = TransferItem

const form = ref({} as InventoryDataRequest)
</script>
