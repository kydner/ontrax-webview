<template>
  <inventory-top-filter
    v-model:search-value="search"
    v-model:status-value="currentStatus"
    v-model:sort-direction="sortDirection"
    :statuses="statuses"
    @search="handleSearch"
    @item:selected="(value) => handleStatus(value)"
  >
  </inventory-top-filter>
  <!-- end filtering -->

  <!-- meta list table -->
  <k-meta-list-table
    ref="metaListTableRef"
    :meta="metaVendorShipment"
    :payload="payload"
    :item-mapper="(items) => orderBy(items, (item) => item.shippingDate, [sortDirection])"
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
import { VendorShipment } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { VendorShipmentRequestPage, VendorShipmentResponsePage } from 'src/common/model/vendor-shipment.model'
import InventoryTopFilter, { TsortDirection } from 'src/components/page/inventory/InventoryTopFilter.vue'
import { ComponentPublicInstance, computed, defineAsyncComponent, ref } from 'vue'
import KMetaListTable from 'src/components/ui/KMetaListTable.vue'
import { TStatus } from 'src/common/enum/vendor-shipment.enum'
import { orderBy } from 'lodash'

interface ListItem {
  item: VendorShipmentResponsePage
}

interface Emits {
  (event: 'click:item', data: ListItem): void
}

type MetaListTableExposed = {
  loadMore: (reset?: boolean) => Promise<void>
}

const emit = defineEmits<Emits>()

const metaVendorShipment: IMetaListModule<VendorShipmentResponsePage> = VendorShipment

const ListContentPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import('./SendListContent.vue'),
  })
})

const payload = ref({} as VendorShipmentRequestPage)

const search = ref()

const metaListTableRef = ref<ComponentPublicInstance<MetaListTableExposed> | null>(null)

const statuses: TStatus[] = ['DRAFT', 'IN_TRANSIT', 'RECEIVED']

const sortDirection = ref<TsortDirection>('asc')

const currentStatus = ref<TStatus | undefined>()

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
  console.log(metaListTableRef.value)
  metaListTableRef.value?.loadMore(true)
}

payload.value = buildPayload()
</script>
