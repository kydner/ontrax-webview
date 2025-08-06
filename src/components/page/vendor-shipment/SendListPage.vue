<template>
  <inventory-top-filter v-model="search" @search="handleSearch">
    <template #other-left>
      <k-btn icon="list" outline :label="t('status')" size="sm" class="tw-p-1 tw-py-0" />
    </template>
    <template #right>
      <div class="tw-flex tw-items-center tw-justify-end tw-space-x-2">
        <span class="tw-text-xs tw-text-secondary-text">{{ t('sortBy') }}</span>
        <q-icon name="img:/icons/sort-by.svg"></q-icon>
      </div>
    </template>
  </inventory-top-filter>
  <!-- end filtering -->

  <!-- meta list table -->
  <k-meta-list-table ref="metaListTableRef" :meta="metaVendorShipment" :payload="payload">
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="(data as Record<string, unknown>)" />
    </template>
    <!-- end-prettier-ignore -->

    <template #list:content="{ item }">
      <component :is="ListContentPage" :item="item" @click="(data: ListItem) => emit('click:item', data)" />
    </template>
  </k-meta-list-table>
  <!-- end meta list table -->
</template>
<script setup lang="ts">
import { VendorShipment } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { VendorShipmentRequestPage, VendorShipmentResponsePage } from 'src/common/model/vendor-shipment.model'
import InventoryTopFilter from 'src/components/page/inventory/InventoryTopFilter.vue'
import { ComponentPublicInstance, computed, defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import KMetaListTable from 'src/components/ui/KMetaListTable.vue'
import { Notify } from 'src/common/utils/plugin.utils'

interface ListItem {
  item: VendorShipmentResponsePage
}

interface Emits {
  (event: 'click:item', data: ListItem): void
}

type MetaListTableExposed = {
  loadMore: () => Promise<void>
}

const emit = defineEmits<Emits>()

const { t } = useI18n()

const metaVendorShipment: IMetaListModule<VendorShipmentResponsePage> = VendorShipment

const ListContentPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import('./ListContent.vue'),
  })
})

const payload = computed(() => {
  return { receiveNumber: search.value, page: 1, size: 10 } as VendorShipmentRequestPage
})

const search = ref()

const metaListTableRef = ref<ComponentPublicInstance<MetaListTableExposed> | null>(null)

const handleSearch = () => {
  console.log(metaListTableRef.value)
  metaListTableRef.value?.loadMore()
}
</script>
