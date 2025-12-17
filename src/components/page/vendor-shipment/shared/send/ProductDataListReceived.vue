<template>
  <q-card flat class="tw-my-4">
    <q-input
      v-if="details.length > 0"
      v-model="searchPartNumber"
      color="secondary"
      dense
      placeholder="Search Part Number"
    >
      <template #prepend>
        <q-icon name="img:/icons/search.svg" />
      </template>
    </q-input>
  </q-card>

  <k-card v-for="(product, index) in filteredDetails" :key="index" class="gradient-card tw-my-2">
    <q-card-section class="tw-p-2" v-ripple @click="handlePreview(product)">
      <div class="tw-flex tw-items-center tw-justify-between">
        <div class="tw-flex tw-flex-col tw-space-y-1 tw-mb-1">
          <div class="tw-flex tw-justify-between tw-space-x-2">
            <product-image :item-id="product?.productId || ''" />
            <div class="tw-basis-auto">
              <div class="tw-flex tw-flex-col">
                <span class="tw-text-secondary-text">{{ product?.srtPartNumber || '-' }}</span>
                <span>{{ product.productName || '-' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-space-y-2 tw-basis-auto tw-text-right">
          <div class="tw-basis-auto">
            <div class="tw-flex tw-justify-between tw-space-x-2 md:tw-space-x-4">
              <div class="tw-flex tw-items-center tw-space-x-2">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.16667 10.5C0.845833 10.5 0.56875 10.3882 0.335417 10.1646C0.111806 9.93125 0 9.65417 0 9.33333V1.16667C0 0.845834 0.111806 0.573612 0.335417 0.35C0.56875 0.116667 0.845833 0 1.16667 0H9.33333C9.65417 0 9.92639 0.116667 10.15 0.35C10.3833 0.573612 10.5 0.845834 10.5 1.16667V9.33333C10.5 9.65417 10.3833 9.93125 10.15 10.1646C9.92639 10.3882 9.65417 10.5 9.33333 10.5H1.16667ZM1.16667 9.33333H9.33333V7.58333H7.58333C7.29167 7.95278 6.94167 8.23958 6.53333 8.44375C6.13472 8.64792 5.70694 8.75 5.25 8.75C4.79306 8.75 4.36042 8.64792 3.95208 8.44375C3.55347 8.23958 3.20833 7.95278 2.91667 7.58333H1.16667V9.33333ZM5.25 7.58333C5.61944 7.58333 5.95486 7.47639 6.25625 7.2625C6.55764 7.04861 6.76667 6.76667 6.88333 6.41667H9.33333V1.16667H1.16667V6.41667H3.61667C3.73333 6.76667 3.94236 7.04861 4.24375 7.2625C4.54514 7.47639 4.88056 7.58333 5.25 7.58333ZM1.16667 9.33333H2.91667C3.20833 9.33333 3.55347 9.33333 3.95208 9.33333C4.36042 9.33333 4.79306 9.33333 5.25 9.33333C5.70694 9.33333 6.13472 9.33333 6.53333 9.33333C6.94167 9.33333 7.29167 9.33333 7.58333 9.33333H9.33333H1.16667Z"
                    fill="#7A7A80"
                  />
                </svg>

                <span class="tw-text-xs tw-text-secondary-text">Qty Order</span>
              </div>
              <span>{{ format(product.qtyOrdered, { precision: 0 }) }}</span>
            </div>
          </div>
          <div class="tw-basis-auto">
            <!-- UNIQUE PRODUCT -->
            <template v-if="product.isUniqueSerialNumber">
              <div class="tw-flex tw-justify-between tw-space-x-2 md:tw-space-x-4">
                <div class="tw-flex tw-items-center tw-space-x-2">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.25 8.75L7.58333 6.41667L6.76667 5.6L5.83333 6.53333V4.08333H4.66667V6.53333L3.73333 5.6L2.91667 6.41667L5.25 8.75ZM1.16667 2.91667V9.33333H9.33333V2.91667H1.16667ZM1.16667 10.5C0.845833 10.5 0.56875 10.3882 0.335417 10.1646C0.111806 9.93125 0 9.65417 0 9.33333V2.05625C0 1.92014 0.0194446 1.78889 0.0583336 1.6625C0.106945 1.53611 0.175 1.41944 0.2625 1.3125L0.991667 0.422917C1.09861 0.286806 1.22986 0.184722 1.38542 0.116667C1.55069 0.0388889 1.72083 0 1.89583 0H8.60417C8.77917 0 8.94444 0.0388889 9.1 0.116667C9.26528 0.184722 9.40139 0.286806 9.50833 0.422917L10.2375 1.3125C10.325 1.41944 10.3882 1.53611 10.4271 1.6625C10.4757 1.78889 10.5 1.92014 10.5 2.05625V9.33333C10.5 9.65417 10.3833 9.93125 10.15 10.1646C9.92639 10.3882 9.65417 10.5 9.33333 10.5H1.16667ZM1.4 1.75H9.1L8.60417 1.16667H1.89583L1.4 1.75Z"
                      fill="#7A7A80"
                    />
                  </svg>

                  <span class="tw-text-xs tw-text-secondary-text">Qty Received</span>
                </div>
                <span>{{ format(product.qtyReceived, { precision: 0 }) }}</span>
              </div>
            </template>
            <!-- NOT UNIQUE -->
            <template v-else>
              <plus-minus-field
                v-model="product.qtyReceived"
                :disable="loadingMap[product.id ?? '']"
                :max="product.qtyOrdered"
                allow-increase
                allow-decrease
                @click.stop
                @update:model-value="debounceDetailQty(product.id ?? '', product.qtyReceived)"
              />
            </template>
          </div>
        </div>
      </div>
    </q-card-section>
  </k-card>

  <!-- scan -->

  <detail-preview v-model="previewItem">
    <template #default="{ item }">
      <!-- DETAIL DEFAULT -->
      <div>
        <div class="tw-col-span-12 tw-flex tw-space-x-4">
          <product-image :item-id="item.productId || ''" size="60px" />
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-semibold tw-text-lg">{{ item.productName || '-' }}</span>
            <span>{{ item.srtPartNumber || '-' }}</span>
          </div>
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyOrder') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          {{ format(item.qtyOrdered, { precision: 0 }) || '-' }}
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyReceived') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          {{ format(item.qtyReceived, { precision: 0 }) || '-' }}
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('attachFile') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          <attachment-file-preview :attachment-info="{ fileId: item.filename, fileUrl: item.fileUrl }" />
        </div>

        <div class="tw-col-span-12 tw-py-2">
          <div class="tw-text-secondary-text tw-text-xs">Notes</div>
          <div>
            {{ item.notes || '-' }}
          </div>
        </div>
      </div>
    </template>
  </detail-preview>
</template>
<script setup lang="ts">
import { VendorShipmentDetailResponse } from 'src/common/model/vendor-shipment-detail.model'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import { computed, reactive, ref } from 'vue'
import ProductImage from 'src/components/images/Product.vue'
import KCard from 'src/components/ui/KCard.vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { useI18n } from 'vue-i18n'
import { format } from 'src/common/utils/converter.utils'
import { id, ResponseState } from 'src/common/interfaces/response.interface'
import { VendorShipmentAdjustmentQuantityDetailResponse } from 'src/common/model/vendor-shipment-adjustment-quantity-detail.model'
import { useVendorShipmentRepository } from 'src/common/repository/vendor-shipment.repository'
import { Notify } from 'src/common/utils/plugin.utils'
import { debounce } from 'lodash'
import DetailPreview from 'src/components/page/operational/DetailPreview.vue'

interface Props {
  modelValue: VendorShipmentDataRequest
}

interface Emits {
  (event: 'update:model-value', value: Props['modelValue']): void
  (event: 'preview', product: VendorShipmentDetailResponse): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const shipmentRepository = useVendorShipmentRepository()

const loadingMap = reactive<Record<id, boolean>>({})

const searchPartNumber = ref('')

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const details = computed({
  get: () => form.value?.details || [],
  set: (value) => {
    form.value.details = value
    emit('update:model-value', form.value)
  },
})

const filteredDetails = computed(() => {
  const keyword = searchPartNumber.value.trim().toLowerCase()

  if (!keyword) return details.value

  return details.value.filter((item) => item.srtPartNumber?.toLowerCase().includes(keyword))
})

const previewItem = ref<VendorShipmentDetailResponse | null>(null)

const handlePreview = (item: VendorShipmentDetailResponse) => {
  previewItem.value = item
}

reactive<ResponseState<VendorShipmentAdjustmentQuantityDetailResponse>>({
  isLoading: false,
  data: null,
  errorMessage: null,
})

const handleAdjustment = async (detailId: id, quantity: number) => {
  try {
    if (!detailId) throw new Error('Invalid detail ID')
    loadingMap[detailId] = true

    await shipmentRepository.adjustmentDetail(detailId, {
      quantity,
    })
  } catch (error) {
    Notify.error({ message: error as Error })
  } finally {
    loadingMap[detailId] = false
  }
}

const debounceDetailQty = debounce(async (detailId: id, quantity: number) => {
  await handleAdjustment(detailId, quantity)
}, 500)
</script>

<style scoped lang="scss">
:deep(.q-field--dark .q-field__control:before) {
  border-bottom-color: var(--q-line);
}
</style>
