<template>
  <list-page :meta="metaTransfetItem"> </list-page>
</template>
<script setup lang="ts">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import ListPage from '../transfer-item/ListPage.vue'
import { ReceiveItemResponsePage } from 'src/common/model/receive-item.model'
import { ReceiveItem } from 'src/common/constants/meta.constant'

const metaTransfetItem: IMetaListModule<ReceiveItemResponsePage> = ReceiveItem
</script>
