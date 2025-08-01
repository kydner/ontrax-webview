<template>
  <inventory-list-page :meta="metaTransfetItem"> </inventory-list-page>
</template>
<script setup lang="ts">
import { TransferItem } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { TransferItemResponsePage } from 'src/common/model/transfer-item.model'
import InventoryListPage from 'src/components/lib/InventoryListPage.vue'

const metaTransfetItem: IMetaListModule<TransferItemResponsePage> = TransferItem
</script>
