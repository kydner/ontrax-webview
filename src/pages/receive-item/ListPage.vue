<template>
  <inventory-list-page :meta="metaTransfetItem"> </inventory-list-page>
</template>
<script setup lang="ts">
import { ReceiveItem } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { ReceiveItemResponsePage } from 'src/common/model/receive-item.model'
import InventoryListPage from 'src/components/lib/InventoryListPage.vue'

const metaTransfetItem: IMetaListModule<ReceiveItemResponsePage> = ReceiveItem
</script>
