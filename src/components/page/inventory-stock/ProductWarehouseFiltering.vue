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

    <!-- Data State -->
    <template v-else>
      <div v-for="(stock, index) in state.data" :key="index" class="tw-basis-full">
        <div class="tw-grid tw-grid-cols-12 tw-gap-2">
          <div class="tw-col-span-12">
            <div class="tw-flex tw-items-center tw-justify-between tw-px-2">
              <div class="tw-text-lg">{{ stock?.skuCode }} - {{ stock?.itemName }}</div>
              <div class="tw-text-lg">{{ Math.floor(Math.random() * 100) + 1 }}</div>
            </div>
            <q-separator spaced="0.25rem" dark></q-separator>
          </div>

          <div class="tw-col-span-12">
            <k-card
              v-for="(warehouse, index) in stock?.warehouseDetails"
              :key="index"
              class="tw-my-2 tw-cursor-pointer"
              v-ripple
              @click="handleDetailPage"
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
                          <span>{{ warehouse.currentQty }}</span>
                          <span class="tw-text-secondary-text">pcs</span>
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
import { ResponseState } from 'src/common/interfaces/response.interface'
import {
  StockCardAggregationRequest,
  StockCardAggregationResponsePage,
} from 'src/common/model/stock-card-aggregation.model'
import { useStockCardRepository } from 'src/common/repository/stock-card.repository'
import { Notify } from 'src/common/utils/plugin.utils'
import KCard from 'src/components/ui/KCard.vue'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  payload: StockCardAggregationRequest
}

const props = withDefaults(defineProps<Props>(), {})

const router = useRouter()

const stockRepository = useStockCardRepository()

const state = reactive<ResponseState<StockCardAggregationResponsePage[]>>({
  isLoading: false,
  data: null,
  errorMessage: null,
})

const handleDetailPage = () => {
  router.push({
    name: `${InventoryStock.name}-filter-detail`,
  })
}

const fetchData = async () => {
  try {
    state.isLoading = true
    const response = await stockRepository.aggregation({ ...props.payload })
    state.data = response
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  } finally {
    state.isLoading = false
  }
}

onMounted(() => {
  fetchData()
})
</script>
