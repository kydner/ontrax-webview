<template>
  <operational-list-page :meta="metaTransfetItem" key-name="goodsReceiveId"> </operational-list-page>
</template>
<script setup lang="ts">
import { ReceiveItem } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { ReceiveItemResponsePage } from 'src/common/model/receive-item.model'
import OperationalListPage from 'src/components/lib/OperationalListPage.vue'

const metaTransfetItem: IMetaListModule<ReceiveItemResponsePage> = ReceiveItem
</script>
