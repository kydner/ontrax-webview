<template>
  <scrollable-container :suffix-event="suffixEvent">
    <k-page :allow-access="props.allowAccess" class="filter-page bg-body-base">
      <k-toolbar :header-title="metaInventoryStock?.title" @back="router.push('/')" />

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
            <component
              :is="component"
              :key="componentKey"
              :payload="{ ...request }"
              @action:detail="handleActionDetail"
            />
          </div>
        </div>
      </slot>
    </k-page>
  </scrollable-container>
</template>
<script setup lang="ts">
import ScrollableContainer from 'src/components/ui/ScrollableContainer.vue'
import KPage from 'src/components/lib/KPage.vue'
import { useI18n } from 'vue-i18n'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { LocationWarehouseResponsePage } from 'src/common/model/location-warehouse.model'
import { InventoryStock, LocationWarehouse, Product } from 'src/common/constants/meta.constant'
import { ProductResponsePage } from 'src/common/model/product.model'
import { defineAsyncComponent, nextTick, ref, type Component } from 'vue'
import { StockCardAggregationRequest } from 'src/common/model/stock-card-aggregation.model'
import { scrollToClass } from 'src/common/utils/plugin.utils'
import { InventoryStockResponsePage } from 'src/common/model/inventory-stock.model'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { useRouter } from 'vue-router'
import { MovementPayload } from './MovementPage.vue'
import AllFilteringSkeleton from './AllFilteringSkeleton.vue'
import ProductWarehouseFilteringSkeleton from './ProductWarehouseFilteringSkeleton.vue'

interface Props {
  allowAccess?: boolean
}

interface Emits {
  (event: 'action:detail', payload: MovementPayload): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const router = useRouter()

const metaLocationWarehouse: IMetaListModule<LocationWarehouseResponsePage> = LocationWarehouse

const metaProduct: IMetaListModule<ProductResponsePage> = Product

const metaInventoryStock: IMetaListModule<InventoryStockResponsePage> = InventoryStock

const component = ref<Component | null>(null)

const componentKey = ref(0)

const suffixEvent = ref<string | null>(null)

const request = ref({} as StockCardAggregationRequest)

const handleFilter = async () => {
  component.value = null
  if (!request.value.itemIds && !request.value.warehouseIds) {
    suffixEvent.value = 'all-filtering'
    component.value = defineAsyncComponent({
      loader: () => import('./AllFiltering.vue'),
      loadingComponent: AllFilteringSkeleton,
    })
  } else {
    suffixEvent.value = 'product-warehouse-filtering'
    component.value = defineAsyncComponent({
      loader: () => import('./ProductWarehouseFiltering.vue'),
      loadingComponent: ProductWarehouseFilteringSkeleton,
    })
  }

  componentKey.value++
  await nextTick()
  setTimeout(() => {
    scrollToClass('.target-section-operational__list')
  }, 200)
}

const handleActionDetail = (detail: MovementPayload) => {
  scrollToClass('.filter-page')
  emit('action:detail', detail)
}
</script>
