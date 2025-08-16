<template>
  <div class="tw-flex tw-flex-col tw-space-y-4 tw-my-4 tw-min-h-screen">
    <div class="tw-basis-full">
      <h3>{{ t('allWarehouse') }}</h3>
      <q-separator></q-separator>
    </div>

    <div class="tw-basis-full">
      <!-- SKELETON LOADING -->
      <template v-if="state.isLoading && state.items.length === 0">
        <k-card v-for="n in state.size" :key="'skeleton-' + n" class="tw-my-2">
          <q-card-section class="tw-p-2 tw-py-3">
            <div class="tw-flex tw-items-center tw-justify-between">
              <!-- Gambar & Text -->
              <div class="tw-flex tw-space-x-2">
                <q-skeleton type="QAvatar" size="40px" />
                <div class="tw-flex tw-flex-col tw-space-y-1">
                  <q-skeleton type="text" width="80px" />
                  <q-skeleton type="text" width="120px" />
                </div>
              </div>
              <!-- Qty -->
              <div class="tw-flex tw-items-center tw-space-x-2">
                <q-skeleton type="text" width="20px" />
                <q-skeleton type="QAvatar" size="20px" />
              </div>
            </div>
          </q-card-section>
        </k-card>
      </template>

      <!-- NO DATA -->
      <template v-else-if="!state.isLoading && state.items.length === 0">
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-64 tw-text-center tw-space-y-2">
          <div class="tw-text-secondary-text">{{ t('noData') }}</div>
        </div>
      </template>

      <!-- DATA LIST -->
      <template v-else>
        <k-card
          v-for="(stock, index) in state.items"
          :key="index"
          v-ripple
          class="tw-cursor-pointer"
          @click="handleDetailPage(stock.locationWarehouseId, stock.itemId)"
        >
          <q-card-section class="tw-p-2 tw-py-3">
            <div class="tw-flex tw-items-center tw-justify-between">
              <div class="tw-flex tw-space-x-2">
                <product-image />
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-flex-col">
                    <span class="tw-text-secondary-text">{{ stock?.item?.skuCode }}</span>
                    <span>{{ stock?.item?.itemName }}</span>
                  </div>
                </div>
              </div>

              <div class="tw-basis-auto">
                <div class="tw-flex tw-items-center tw-justify-end tw-space-x-2">
                  <div class="tw-basis-auto">
                    <div class="tw-flex tw-items-center tw-justify-end tw-space-x-2">
                      <span>{{ format(stock?.availableQty, { precision: 0 }) }}</span>
                      <span class="tw-text-secondary-text">{{ 'unit'?.toLowerCase() }}</span>
                    </div>
                  </div>
                  <div>
                    <q-icon name="img:/icons/chevron-right.svg" size="1.35rem" />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </k-card>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import KCard from 'src/components/ui/KCard.vue'
import { useRouter } from 'vue-router'
import { InventoryStock } from 'src/common/constants/meta.constant'
import { useStockCardRepository } from 'src/common/repository/stock-card.repository'
import { nextTick, onMounted, reactive } from 'vue'
import { Notify } from 'src/common/utils/plugin.utils'
import { bus } from 'src/common/event-bus'
import { id } from 'src/common/interfaces/response.interface'
import { StockCardResponsePage } from 'src/common/model/stock-card.model'
import { format } from 'src/common/utils/converter.utils'
import ProductImage from 'src/components/images/Product.vue'
import { Loading } from 'quasar'

const { t } = useI18n()

const router = useRouter()

const stockRepository = useStockCardRepository()

const state = reactive({
  items: [] as StockCardResponsePage[],
  isLoading: false,
  hasMore: true,
  errorMessage: null as string | null,
  size: 10,
  page: 1,
  totalPages: 1,
})

const handleDetailPage = async (locationWarehouseId: id, itemId: id) => {
  try {
    Loading.show()
    await router.push(`${InventoryStock.name}/movement/${locationWarehouseId}/${itemId}`)
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  } finally {
    await nextTick()
    Loading.hide()
  }
}

const loadMore = async <T extends StockCardResponsePage[]>(reset = false) => {
  if (reset) resetLoad()
  try {
    if (state.isLoading || !state.hasMore) return
    state.isLoading = true
    state.errorMessage = null
    const data = await stockRepository.getPage({ page: state.page, size: 10 })
    const content = data.content
    state.totalPages = data.totalPages
    state.items.push(...(content as T))

    state.page++

    if (state.page > state.totalPages) {
      state.hasMore = false
    }
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  } finally {
    state.isLoading = false
  }
}

const resetLoad = () => {
  state.items = []
  state.hasMore = true
  state.page = 1
}

onMounted(() => {
  loadMore()
  bus.on('scroll:bottom-reached-inv-filter', () => {
    loadMore()
  })
})
</script>
