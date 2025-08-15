<template>
  <operational-top-filter
    v-model:search-value="search"
    v-model:status-value="currentStatus"
    v-model:sort-direction="sortDirection"
    :statuses="statuses"
    @search="handleSearch"
    @item:selected="(value) => handleStatus(value)"
  >
  </operational-top-filter>
  <!-- end filtering -->

  <!-- meta list table -->
  <k-meta-list-table
    ref="metaListTableRef"
    :meta="metaTransferItem"
    :payload="payload"
    :item-mapper="(items) => (sortDirection ? orderBy(items, (item) => item.transferDate, [sortDirection]) : items)"
  >
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="(data as Record<string, unknown>)" />
    </template>
    <!-- end-prettier-ignore -->

    <template #list:content="{ item, loading }">
      <component
        :is="ListContentPage"
        :item="item"
        :loading="loading"
        @click="(data: ListItem) => emit('click:item', data)"
      />
    </template>
  </k-meta-list-table>
  <!-- end meta list table -->
</template>
<script setup lang="ts">
import { TransferItem } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { TransferItemRequestPage, TransferItemResponsePage } from 'src/common/model/transfer-item.model'
import OperationalTopFilter, { TsortDirection } from 'src/components/page/operational/OperationalTopFilter.vue'
import { ComponentPublicInstance, computed, defineAsyncComponent, ref } from 'vue'
import KMetaListTable from 'src/components/ui/KMetaListTable.vue'
import { TStatus } from 'src/common/enum/operational.enum'
import { orderBy } from 'lodash'

interface ListItem {
  item: TransferItemResponsePage
}

interface Emits {
  (event: 'click:item', data: ListItem): void
}

type MetaListTableExposed = {
  loadMore: (reset?: boolean) => Promise<void>
}

const emit = defineEmits<Emits>()

const metaTransferItem: IMetaListModule<TransferItemResponsePage> = TransferItem

const ListContentPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import('./ListContent.vue'),
  })
})
const search = ref()

const currentStatus = ref<TStatus | undefined>()

const statuses: TStatus[] = ['QC_PASSED', 'PARTIAL_PASSED', 'RECEIVED', 'QC_SEND']

const payload = ref({
  status: currentStatus.value || statuses,
} as TransferItemRequestPage)

const metaListTableRef = ref<ComponentPublicInstance<MetaListTableExposed> | null>(null)

const sortDirection = ref<TsortDirection | undefined>()

const buildPayload = (extra: Partial<typeof payload.value> = {}) => ({
  page: 1,
  receiveNumber: search.value || undefined,
  status: currentStatus.value || statuses,
  ...extra,
})

const handleSearch = () => {
  payload.value = buildPayload()
  metaListTableRef.value?.loadMore(true)
}

const handleStatus = (value?: TStatus) => {
  currentStatus.value = currentStatus.value === value ? undefined : value
  payload.value = buildPayload()
  metaListTableRef.value?.loadMore(true)
}
</script>
