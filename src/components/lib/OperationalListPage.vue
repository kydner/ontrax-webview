<template>
  <meta-list-page v-bind="{ ...props }" class="bg-body-base">
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="(data as any)" />
    </template>
    <!-- end-prettier-ignore -->

    <slot>
      <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-12">
          <k-select-module
            v-model="request.itemId"
            :filled="false"
            outlined
            t-label="product"
            option-label="itemName"
            option-value="itemId"
            :meta="metaProduct"
            :placeholder="t('all')"
            multiple
          />
        </div>

        <div class="tw-col-span-12">
          <k-select-module
            v-model="request.locationWarehouseId"
            :filled="false"
            outlined
            t-label="warehouse"
            option-label="warehouseName"
            option-value="locationWarehouseId"
            :meta="metaLocationWarehouse"
            :placeholder="t('all')"
            multiple
          />
        </div>

        <div class="tw-col-span-12 tw-my-2">
          <k-btn color="secondary" :label="t('search')" class="fit" @click="handleFilter" />
        </div>

        <div class="target-section-operational__list tw-col-span-12">
          <all-filtering />

          <product-warehouse-filtering />
        </div>
      </div>
    </slot>
  </meta-list-page>
</template>
<script setup lang="ts" generic="T">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import MetaListPage from './MetaListPage.vue'
import { ref, VNode } from 'vue'
import { LocationWarehouseResponsePage } from 'src/common/model/location-warehouse.model'
import { LocationWarehouse, Product } from 'src/common/constants/meta.constant'
import { useI18n } from 'vue-i18n'
import AllFiltering from '../page/inventory-stock/AllFiltering.vue'
import ProductWarehouseFiltering from '../page/inventory-stock/ProductWarehouseFiltering.vue'
import { scrollToClass } from 'src/common/utils/plugin.utils'
import { InventoryStockRequest } from 'src/common/model/inventory-stock.model'
import { ProductResponsePage } from 'src/common/model/product.model'

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

const metaProduct: IMetaListModule<ProductResponsePage> = Product

const request = ref({
  itemId: undefined,
  locationWarehouseId: undefined,
} as Partial<InventoryStockRequest>)

defineSlots<Slots<T>>()

const handleFilter = () => {
  scrollToClass('.target-section-operational__list')
}
</script>
