<template>
  <operational-top-filter
    v-model:search-value="search"
    v-model:status-value="currentStatus"
    v-model:sort-direction="sortDirection"
    :statuses="statuses"
    @search="handleSearch"
    @item:selected="(value) => handleStatus(value)"
  >
    <template #other-left:suffix>
      <k-meta-top-filter
        v-model="fromWarehouseId"
        :label="t('warehouseFrom')"
        icon="img:/icons/upload-box__secondary-text.svg"
        :meta="metaLocationWarehouse"
        option-label="warehouseName"
        option-value="locationWarehouseId"
        @item:selected="(value) => handleWarehouse(value)"
      />
    </template>
  </operational-top-filter>
  <!-- end filtering -->

  <!-- meta list table -->
  <k-meta-list-table
    ref="metaListTableRef"
    :meta="metaTransferItem"
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
import { TransferItem, LocationWarehouse } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { TransferItemRequestPage, TransferItemResponsePage } from 'src/common/model/transfer-item.model'
import OperationalTopFilter, { TsortDirection } from 'src/components/page/operational/OperationalTopFilter.vue'
import { ComponentPublicInstance, computed, defineAsyncComponent, ref } from 'vue'
import KMetaListTable from 'src/components/ui/KMetaListTable.vue'
import { TStatus } from 'src/common/enum/operational.enum'
import { orderBy } from 'lodash'
import { id, TBaseSortDirection } from 'src/common/interfaces/response.interface'
import KMetaTopFilter from 'src/components/ui/KMetaTopFilter.vue'
import { LocationWarehouseResponsePage } from 'src/common/model/location-warehouse.model'
import { useI18n } from 'vue-i18n'

interface Props {
  suffixScroll?: string
}

interface ListItem {
  item: TransferItemResponsePage
}

defineProps<Props>()

interface Emits {
  (event: 'click:item', data: ListItem): void
}

type MetaListTableExposed = {
  loadMore: (reset?: boolean) => Promise<void>
}

const emit = defineEmits<Emits>()

const { t } = useI18n()

const metaTransferItem: IMetaListModule<TransferItemResponsePage> = TransferItem

const metaLocationWarehouse: IMetaListModule<LocationWarehouseResponsePage> = LocationWarehouse

const ListContentPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import('./ListContent.vue'),
  })
})
const search = ref()

const currentStatus = ref<TStatus | undefined>()

const statuses: TStatus[] = ['QC_SEND']

const fromWarehouseId = ref<id | undefined>()

const payload = ref({
  status: currentStatus.value || statuses,
} as TransferItemRequestPage)

const metaListTableRef = ref<ComponentPublicInstance<MetaListTableExposed> | null>(null)

const sortDirection = ref<TsortDirection>('desc')

const buildPayload = (extra: Partial<typeof payload.value> = {}) => ({
  page: 1,
  receiveNumber: search.value || undefined,
  status: currentStatus.value || statuses,
  fromWarehouseId: fromWarehouseId.value,
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

const handleWarehouse = (value?: id) => {
  fromWarehouseId.value = value
  payload.value = buildPayload()
  metaListTableRef.value?.loadMore(true)
}

payload.value = buildPayload()
</script>
