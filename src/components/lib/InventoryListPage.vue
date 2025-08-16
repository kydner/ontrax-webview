<template>
  <scrollable-container suffix-event="inv-filter">
    <meta-list-page v-bind="{ ...props }" class="" :allow-access="allowAccessPage">
      <!-- prettier-ignore -->
      <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="(data as any)" />
    </template>
      <!-- end-prettier-ignore -->

      <slot>
        <div class="tw-grid tw-grid-cols-12 tw-gap-2">
          <div class="tw-col-span-12">
            <k-select-module
              v-model="request.itemIds"
              :filled="false"
              outlined
              t-label="product"
              behavior="menu"
              option-label="itemName"
              option-value="itemId"
              :meta="metaProduct"
              :placeholder="t('all')"
              multiple
            />
          </div>

          <div class="tw-col-span-12">
            <k-select-module
              v-model="request.warehouseIds"
              :filled="false"
              outlined
              t-label="warehouse"
              behavior="menu"
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
            <component :is="component" :key="componentKey" :payload="{ ...request }" />
          </div>
        </div>
      </slot>
    </meta-list-page>
  </scrollable-container>
</template>
<script setup lang="ts" generic="T">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import MetaListPage from './MetaListPage.vue'
import { computed, defineAsyncComponent, ref, VNode, type Component } from 'vue'
import { LocationWarehouseResponsePage } from 'src/common/model/location-warehouse.model'
import { LocationWarehouse, Product } from 'src/common/constants/meta.constant'
import { useI18n } from 'vue-i18n'
import { scrollToClass } from 'src/common/utils/plugin.utils'
import { ProductResponsePage } from 'src/common/model/product.model'
import { nextTick } from 'vue'
import { StockCardAggregationRequest } from 'src/common/model/stock-card-aggregation.model'
import ScrollableContainer from 'src/components/ui/ScrollableContainer.vue'

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

const component = ref<Component | null>(null)

const componentKey = ref(0)

const metaLocationWarehouse: IMetaListModule<LocationWarehouseResponsePage> = LocationWarehouse

const metaProduct: IMetaListModule<ProductResponsePage> = Product

const request = ref({} as StockCardAggregationRequest)

const allowAccessPage = computed(() => true)

defineSlots<Slots<T>>()

const handleFilter = async () => {
  component.value = null
  if (!request.value.itemIds && !request.value.warehouseIds) {
    component.value = defineAsyncComponent({
      loader: () => import('../page/inventory-stock/AllFiltering.vue'),
    })
  } else {
    component.value = defineAsyncComponent({
      loader: () => import('../page/inventory-stock/ProductWarehouseFiltering.vue'),
    })
  }

  componentKey.value++
  await nextTick()
  setTimeout(() => {
    scrollToClass('.target-section-operational__list')
  }, 200)
}
</script>
