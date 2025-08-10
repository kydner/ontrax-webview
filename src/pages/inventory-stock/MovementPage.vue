<template>
  <k-page padding="normal" class="bg-body-base tw-min-h-screen">
    <k-toolbar header-title="Inventory Stock Movement" @back="handleBack" />

    <!-- HEADER -->
    <div class="tw-flex tw-flex-col tw-space-y-2 tw-my-2">
      <!-- Loading Skeleton -->
      <template v-if="stateHeader.isLoading">
        <div class="tw-grid tw-grid-cols-12 tw-gap-2" v-for="n in 3" :key="n">
          <div class="tw-col-span-4"><q-skeleton type="text" width="80%" /></div>
          <div class="tw-col-span-8"><q-skeleton type="text" width="100%" /></div>
        </div>
      </template>

      <!-- Data -->
      <template v-else>
        <div class="tw-grid tw-grid-cols-12 tw-gap-2">
          <div class="tw-col-span-4">{{ t('product') }}</div>
          <div class="tw-col-span-8">: {{ stateHeader.data?.item?.itemName }}</div>
        </div>
        <div class="tw-grid tw-grid-cols-12 tw-gap-2">
          <div class="tw-col-span-4">{{ t('warehouse') }}</div>
          <div class="tw-col-span-8">: {{ stateHeader.data?.locationWarehouse?.warehouseName }}</div>
        </div>
        <div class="tw-grid tw-grid-cols-12 tw-gap-2">
          <div class="tw-col-span-4">{{ t('stock') }}</div>
          <div class="tw-col-span-8">: {{ format(stateHeader.data?.currentQty, { precision: 0 }) }} pcs</div>
        </div>
      </template>
    </div>

    <!-- MOVEMENT LIST -->
    <div class="tw-flex tw-flex-col tw-my-2 tw-space-y-2">
      <!-- Skeleton Loading -->
      <template v-if="state.isLoading && !state.items.length">
        <k-card v-for="n in 3" :key="n">
          <!-- HEADER -->
          <q-card-section>
            <div class="tw-flex tw-items-center tw-justify-between">
              <q-skeleton type="text" width="60%" height="16px" />
              <q-skeleton type="text" width="30%" height="14px" />
            </div>
          </q-card-section>

          <q-separator dark />

          <!-- BODY -->
          <q-card-section>
            <div class="tw-flex tw-flex-col tw-space-y-4">
              <div class="tw-basis-full">
                <div class="tw-grid tw-grid-cols-12 tw-gap-2">
                  <div v-for="i in 4" :key="i" class="tw-col-span-3">
                    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-4">
                      <q-skeleton type="text" width="70%" height="10px" />
                      <q-skeleton type="text" width="40%" height="14px" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="tw-basis-full">
                <div class="tw-flex tw-flex-col tw-space-y-4">
                  <q-skeleton type="text" width="50%" height="10px" />
                  <q-skeleton type="text" width="70%" height="12px" />
                </div>
              </div>
            </div>
          </q-card-section>
        </k-card>
      </template>

      <!-- No Data -->
      <template v-else-if="!state.isLoading && !state.items.length">
        <div class="tw-text-center tw-text-secondary-text tw-my-4">
          {{ t('noData') }}
        </div>
      </template>

      <!-- Data -->
      <template v-else>
        <k-card v-for="(stock, index) in state.items" :key="index">
          <q-card-section>
            <div class="tw-flex tw-items-center tw-justify-between">
              <span class="tw-text-secondary tw-text-lg">
                {{ stock?.movementNumber }}
              </span>
              <span class="tw-text-disable-text">{{ formatDate(stock?.movementDate) }}</span>
            </div>
          </q-card-section>

          <q-separator dark />

          <q-card-section>
            <div class="tw-flex tw-flex-col tw-space-y-4">
              <div class="tw-basis-full">
                <div class="tw-grid tw-grid-cols-12 tw-gap-2">
                  <div class="tw-col-span-3">
                    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-4">
                      <span class="tw-text-secondary-text tw-text-xs">Adjustment</span>
                      <span>{{ stock?.movementType?.toUpperCase() }}</span>
                    </div>
                  </div>

                  <div class="tw-col-span-3">
                    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-4">
                      <span class="tw-text-secondary-text tw-text-xs">Last Balance</span>
                      <span>{{ format(stock?.qtyBefore, { precision: 0 }) }}</span>
                    </div>
                  </div>

                  <div class="tw-col-span-3">
                    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-4">
                      <span class="tw-text-secondary-text tw-text-xs">Qty Change</span>
                      <span>{{ format(stock?.qtyAfter, { precision: 0 }) }}</span>
                    </div>
                  </div>

                  <div class="tw-col-span-3">
                    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-4">
                      <span class="tw-text-secondary-text tw-text-xs">New Balance</span>
                      <span>-</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tw-basis-full">
                <div class="tw-flex tw-flex-col tw-space-y-4">
                  <span class="tw-text-secondary-text tw-text-xs">Remark</span>
                  <span>{{ stock?.notes || '-' }}</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </k-card>
      </template>
    </div>
  </k-page>
</template>

<script setup lang="ts">
import KPage from 'src/components/lib/KPage.vue'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { useRoute, useRouter } from 'vue-router'
import KCard from 'src/components/ui/KCard.vue'
import { useStockCardRepository } from 'src/common/repository/stock-card.repository'
import { useStockMovementRepository } from 'src/common/repository/stock-movement.repository'
import { computed, onMounted, reactive } from 'vue'
import { StockCardLocationWarehouseResponse } from 'src/common/model/stock-card-location-warehouse.model'
import { StockMovementResponse } from 'src/common/model/stock-movement.model'
import { id, ResponseState } from 'src/common/interfaces/response.interface'
import { Notify } from 'src/common/utils/plugin.utils'
import { bus } from 'src/common/event-bus'
import { useI18n } from 'vue-i18n'
import { format, formatDate } from 'src/common/utils/converter.utils'

const router = useRouter()

const route = useRoute()

const { t } = useI18n()

const stockCardRepository = useStockCardRepository()

const movementRepository = useStockMovementRepository()

const params = computed(() => route.params)

const locationWarehouseParams = computed(() => params.value?.locationWarehouseId)

const itemParams = computed(() => params.value?.itemId)

const stateHeader = reactive<ResponseState<StockCardLocationWarehouseResponse>>({
  isLoading: false,
  data: null,
  errorMessage: null,
})

const state = reactive({
  items: [] as StockMovementResponse[],
  isLoading: false,
  hasMore: true,
  errorMessage: null as string | null,
  size: 10,
  page: 1,
  totalPages: 1,
})

const loadMore = async <T extends StockMovementResponse[]>(reset = false) => {
  if (reset) resetLoad()
  try {
    if (state.isLoading || !state.hasMore) return
    const warehouseId = locationWarehouseParams.value as id
    const itemId = itemParams.value as id
    state.isLoading = true
    state.errorMessage = null
    console.log('lll')
    const data = await movementRepository.getPage({ itemId, warehouseId })
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
}
const handleBack = () => {
  router.back()
}

const fetchData = async () => {
  try {
    const locationWarehouseId = locationWarehouseParams.value as id
    const itemId = itemParams.value as id
    stateHeader.isLoading = true
    state.isLoading = true
    stateHeader.errorMessage = null
    if (!locationWarehouseId && !itemId) throw new Error('Invalid Params')

    const response = await stockCardRepository.locationWarehouseItem({ itemId, locationWarehouseId })

    stateHeader.data = response

    loadMore(true)
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  }
  {
    stateHeader.isLoading = false
  }
}

onMounted(() => {
  fetchData()

  bus.on('scroll:bottom-reached', () => {
    loadMore()
  })
})
</script>
