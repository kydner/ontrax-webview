<template>
  <operational-list-page :meta="metaTransfetItem" key-name="stockTransferId"> </operational-list-page>
</template>
<script setup lang="ts">
import { TransferItem } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { TransferItemResponsePage } from 'src/common/model/transfer-item.model'
import OperationalListPage from 'src/components/lib/OperationalListPage.vue'

const metaTransfetItem: IMetaListModule<TransferItemResponsePage> = TransferItem
</script>
