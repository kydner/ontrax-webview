<template>
  <meta-list-page v-bind="{ ...props }">
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="(data as any)" />
    </template>
    <!-- end-prettier-ignore -->

    <slot>
      <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-12">
          <k-select-module model-value="" t-label="product" :meta="metaLocationWarehouse" />
        </div>

        <div class="tw-col-span-12">
          <k-select-module model-value="" t-label="warehouse" :meta="metaLocationWarehouse" />
        </div>

        <div class="tw-col-span-12 tw-my-2">
          <k-btn color="secondary" :label="t('search')" class="fit" />
        </div>

        <div class="tw-col-span-12">
          <all-filtering />
        </div>
      </div>
    </slot>
  </meta-list-page>
</template>
<script setup lang="ts" generic="T">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import MetaListPage from './MetaListPage.vue'
import { VNode } from 'vue'
import { LocationWarehouseResponsePage } from 'src/common/model/location-warehouse.model'
import { LocationWarehouse } from 'src/common/constants/meta.constant'
import { useI18n } from 'vue-i18n'
import AllFiltering from '../page/inventory-stock/AllFiltering.vue'

interface Props {
  meta: IMetaListModule<T>
}

interface Slots<T> {
  default: () => VNode
  toolbar: () => VNode
  filter: () => VNode
  'filter:left': () => VNode
  'filter:right': () => VNode
  'list:content': (props: { item: T }) => VNode
  list: (props: { items: T[] }) => VNode
}
const props = withDefaults(defineProps<Props>(), {})

const { t } = useI18n()

const metaLocationWarehouse: IMetaListModule<LocationWarehouseResponsePage> = LocationWarehouse

defineSlots<Slots<T>>()
</script>
