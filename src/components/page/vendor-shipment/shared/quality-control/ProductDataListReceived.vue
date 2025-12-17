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
            <div class="tw-flex tw-flex-col tw-space-y-2">
              <span class="tw-text-xs tw-text-secondary-text">Qty Reject</span>
              <plus-minus-field
                v-model="product.qtyRejected"
                :allow-increase="false"
                :allow-decrease="true"
                @increase="handleIncrease(index)"
                @click.stop
              />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </k-card>

  <!-- Single Dialog reused for all items -->
  <q-dialog v-model="isDialogOpen" dark no-backdrop-dismiss no-esc-dismiss>
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section
        v-if="dialogIndex !== null && dialogIndex !== undefined"
        class="tw-flex tw-flex-col tw-space-y-2 tw-pt-4"
      >
        <k-card flat borderless>
          <q-card-section class="tw-p-2">
            <div class="tw-flex tw-items-center tw-justify-between">
              <div class="tw-flex tw-justify-between tw-space-x-2">
                <product-image :item-id="details[dialogIndex]?.productId || ''" />
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-flex-col">
                    <span class="tw-text-secondary-text">{{ details[dialogIndex]?.srtPartNumber }}</span>
                    <span>{{ details[dialogIndex]?.productName }}</span>
                  </div>
                </div>
              </div>
              <div class="tw-basis-auto tw-text-right">
                <plus-minus-field
                  v-model="details[dialogIndex].qtyRejected"
                  allow-decrease
                  allow-increase
                  @click.stop
                />
              </div>
            </div>
          </q-card-section>
        </k-card>
        <k-text-area v-model="details[dialogIndex].notes" t-label="note" :show-label="false" :placeholder="t('note')" />

        <upload-multiple
          v-model="details[dialogIndex].attachmentIds"
          t-label="upload"
          :attachments="details[dialogIndex].attachments"
          @uploaded:lcoal-files="
            (file: VendorShipmentUploadResponse) => {
              details[dialogIndex ?? 0].attachments.push(file)
            }
          "
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="t('save')" color="secondary" dense v-close-popup @click="dialogIndex = null" />
      </q-card-actions>
    </q-card>
  </q-dialog>

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

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtySend') }}</div>
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
import UploadMultiple from '../UploadMultiple.vue'
import DetailPreview from 'src/components/page/operational/DetailPreview.vue'
import { VendorShipmentUploadResponse } from 'src/common/model/vendor-shipment-upload.model'

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

const previewItem = ref<VendorShipmentDetailResponse | null>(null)

const handlePreview = (item: VendorShipmentDetailResponse) => {
  previewItem.value = item
}

const filteredDetails = computed(() => {
  const keyword = searchPartNumber.value.trim().toLowerCase()

  if (!keyword) return details.value

  return details.value.filter((item) => item.srtPartNumber?.toLowerCase().includes(keyword))
})

const dialogIndex = ref<number | null>(null)

const isDialogOpen = computed({
  get: () => dialogIndex.value !== null,
  set: (val: boolean) => {
    if (!val) dialogIndex.value = null
  },
})

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

const handleIncrease = (index: number) => {
  dialogIndex.value = index
}
</script>

<style scoped lang="scss">
:deep(.q-field--dark .q-field__control:before) {
  border-bottom-color: var(--q-line);
}
</style>
