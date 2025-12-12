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
    :meta="metaVendorShipment"
    :payload="payload"
    :suffix-scroll="suffixScroll"
    :item-mapper="(items) => (sortDirection ? orderBy(items, (item) => item.createdDate, [sortDirection]) : items)"
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
import { VendorShipmentV1 } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import OperationalTopFilter, { TsortDirection } from 'src/components/page/operational/OperationalTopFilter.vue'
import { ComponentPublicInstance, computed, defineAsyncComponent, ref } from 'vue'
import KMetaListTable from 'src/components/ui/KMetaListTable.vue'
import { TStatus } from 'src/common/enum/operational.enum'
import { orderBy } from 'lodash'
import { TBaseSortDirection } from 'src/common/interfaces/response.interface'
import { VendorShipmentV1RequestPage, VendorShipmentV1ResponsePage } from 'src/common/model/vendor-shipment-v1.model'

interface Props {
  suffixScroll?: string
}

interface ListItem {
  item: VendorShipmentV1ResponsePage
}

defineProps<Props>()

interface Emits {
  (event: 'click:item', data: ListItem): void
}

type MetaListTableExposed = {
  loadMore: (reset?: boolean) => Promise<void>
}

const emit = defineEmits<Emits>()

const metaVendorShipment: IMetaListModule<VendorShipmentV1ResponsePage> = VendorShipmentV1

const ListContentPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import('./ListContent.vue'),
  })
})
const search = ref()

const currentStatus = ref<TStatus | undefined>()

const statuses: TStatus[] = ['QC_PASSED', 'PARTIAL_PASSED', 'RECEIVED']

const payload = ref({
  status: currentStatus.value || statuses,
} as VendorShipmentV1RequestPage)

const metaListTableRef = ref<ComponentPublicInstance<MetaListTableExposed> | null>(null)

const sortDirection = ref<TsortDirection>('desc')

const buildPayload = (extra: Partial<typeof payload.value> = {}) => ({
  page: 1,
  receiveNumber: search.value || undefined,
  status: currentStatus.value || statuses,
  sortColumn: 'CREATED_DATE',
  sortDirection: 'DESC' as TBaseSortDirection,
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

payload.value = buildPayload()
</script>
