<template>
  <div class="tw-flex tw-flex-col tw-space-y-4 tw-my-4 tw-min-h-screen">
    <!-- Loading State -->
    <template v-if="state.isLoading">
      <div v-for="n in 3" :key="n" class="tw-basis-full">
        <div class="tw-grid tw-grid-cols-12 tw-gap-2">
          <div class="tw-col-span-12">
            <div class="tw-flex tw-items-center tw-justify-between tw-px-2">
              <q-skeleton type="text" width="40%" height="20px" />
              <q-skeleton type="text" width="10%" height="20px" />
            </div>
            <q-separator spaced="0.25rem" dark></q-separator>
          </div>

          <div class="tw-col-span-12">
            <div v-for="m in 2" :key="m" class="tw-my-2">
              <q-card flat bordered>
                <q-card-section class="tw-px-2">
                  <div class="tw-flex tw-items-center tw-justify-between">
                    <div class="tw-basis-auto">
                      <q-skeleton type="text" width="120px" height="16px" />
                    </div>
                    <div class="tw-basis-auto tw-flex tw-items-center tw-space-x-4">
                      <q-skeleton type="text" width="30px" height="16px" />
                      <q-skeleton type="QAvatar" size="20px" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- NO DATA -->
    <template v-else-if="!state.isLoading && state.items.length === 0">
      <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-64 tw-text-center tw-space-y-2">
        <div class="tw-text-secondary-text">{{ t('noData') }}</div>
      </div>
    </template>

    <!-- Data State -->
    <template v-else>
      <div v-for="(stock, index) in state.items" :key="index" class="tw-basis-full">
        <div class="tw-grid tw-grid-cols-12 tw-gap-2">
          <div class="tw-col-span-12">
            <div class="tw-flex tw-items-center tw-justify-between tw-px-2">
              <div class="tw-text-lg">{{ stock?.skuCode }} - {{ stock?.itemName }}</div>
              <div class="tw-text-lg">{{ format(stock?.totalCurrentQty, { precision: 0 }) }}</div>
            </div>
            <q-separator spaced="0.25rem" dark></q-separator>
          </div>

          <div class="tw-col-span-12">
            <k-card
              v-for="(warehouse, index) in stock?.warehouseDetails"
              :key="index"
              class="tw-my-2 tw-cursor-pointer"
              v-ripple
              @click="handleDetailPage(warehouse.locationWarehouseId, stock.itemId)"
            >
              <q-card-section class="tw-px-2">
                <div class="tw-flex tw-items-center tw-justify-between">
                  <div class="tw-basis-auto">
                    <span class="tw-text-secondary-text">{{ warehouse.warehouseName }}</span>
                  </div>
                  <div class="tw-basis-auto">
                    <div class="tw-flex tw-items-center tw-justify-end tw-space-x-4">
                      <div class="tw-basis-auto">
                        <div class="tw-flex tw-items-center tw-justify-between tw-space-x-2">
                          <span>{{ format(warehouse.currentQty, { precision: 0 }) }}</span>
                          <span class="tw-text-secondary-text">{{ stock?.unit?.toLowerCase() }}</span>
                        </div>
                      </div>

                      <div class="tw-basis-auto">
                        <q-icon name="img:/icons/chevron-right.svg" size="1.35rem" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </k-card>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { InventoryStock } from 'src/common/constants/meta.constant'
import { bus } from 'src/common/event-bus'
import { id } from 'src/common/interfaces/response.interface'
import {
  StockCardAggregationRequest,
  StockCardAggregationResponsePage,
} from 'src/common/model/stock-card-aggregation.model'
import { useStockCardRepository } from 'src/common/repository/stock-card.repository'
import { format } from 'src/common/utils/converter.utils'
import { Notify } from 'src/common/utils/plugin.utils'
import KCard from 'src/components/ui/KCard.vue'
import { onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

interface Props {
  payload: StockCardAggregationRequest
}

const props = withDefaults(defineProps<Props>(), {})

const router = useRouter()

const { t } = useI18n()

const stockRepository = useStockCardRepository()

const state = reactive({
  items: [] as StockCardAggregationResponsePage[],
  isLoading: false,
  hasMore: true,
  errorMessage: null as string | null,
  size: 10,
  page: 1,
  totalPages: 1,
})

const handleDetailPage = (locationWarehouseId: id, itemId: id) => {
  router.push(`${InventoryStock.name}/movement/${locationWarehouseId}/${itemId}`)
}

const loadMore = async <T extends StockCardAggregationResponsePage[]>(reset = false) => {
  if (reset) resetLoad()
  try {
    if (state.isLoading || !state.hasMore) return
    state.isLoading = true
    state.errorMessage = null
    console.log('lll')
    const data = await stockRepository.aggregation({
      ...props.payload,
      page: state.page,
      size: 10,
      itemIds: props.payload.itemIds || undefined,
      warehouseIds: props.payload.warehouseIds || undefined,
    })
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
  bus.on('scroll:bottom-reached', () => {
    loadMore()
  })
})
</script>
