<template>
  <operational-list-page :meta="props.meta ?? metaTransfetItem" key-name="stockTransferId"> </operational-list-page>
</template>
<script setup lang="ts" generic="T extends TransferItemResponsePage">
import { TransferItem } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { TransferItemResponsePage } from 'src/common/model/transfer-item.model'
import OperationalListPage from 'src/components/lib/OperationalListPage.vue'
interface Props {
  meta: IMetaListModule<T>
}

const props = withDefaults(defineProps<Props>(), {})

const metaTransfetItem: IMetaListModule<TransferItemResponsePage> = TransferItem
</script>
