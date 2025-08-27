<template>
  <div class="tw-my-4 tw-min-h-[40vh]">
    <k-card v-for="(product, index) in qcBeforeSend.qcStockTransferItems" :key="index" class="gradient-card tw-my-2">
      <q-card-section class="tw-p-2" v-ripple @click="handlePreview(index)">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-justify-between tw-space-x-2">
            <product-image :item-id="product?.itemId" />
            <div class="tw-basis-auto">
              <div class="tw-flex tw-flex-col">
                <span class="tw-text-secondary-text">{{ product?.skuCode || '-' }}</span>
                <span>{{ product.itemName || '-' }}</span>
              </div>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-space-y-2 tw-basis-auto tw-text-right">
            <span v-if="form.status === 'QC_SEND'" class="tw-text-xs">Input Qty Reject</span>
            <plus-minus-field
              v-if="form.status === 'QC_SEND'"
              v-model="product.qtyReject"
              :zero-confirm="false"
              :allow-increase="true"
              @increase="handleIncrease(index)"
              @zero:confirm="handleZeroConfirm(index)"
              @click.stop
            />
            <plus-minus-field
              v-else
              v-model="product.qtyReject"
              :zero-confirm="false"
              :allow-increase="true"
              @increase="handleIncrease(index)"
              @zero:confirm="handleZeroConfirm(index)"
              @click.stop
            />
          </div>
        </div>
      </q-card-section>
    </k-card>

    <div v-if="qcBeforeSend.qcStockTransferItems?.length === 0" class="tw-my-4 tw-text-disable-text">
      {{ t('noData') }}
    </div>
  </div>

  <!-- Single Dialog reused for all items -->
  <q-dialog v-model="isDialogOpen" dark no-backdrop-dismiss no-esc-dismiss>
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section
        v-if="dialogIndex !== null && dialogIndex !== undefined"
        class="tw-flex tw-flex-col tw-space-y-2 tw-pt-2"
      >
        <k-card>
          <q-card-section class="tw-p-2">
            <div class="tw-flex tw-items-center tw-justify-between">
              <div class="tw-flex tw-justify-between tw-space-x-2">
                <product-image :item-id="qcBeforeSend.qcStockTransferItems[dialogIndex]?.itemId" />
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-flex-col">
                    <span class="tw-text-secondary-text">{{
                      qcBeforeSend.qcStockTransferItems[dialogIndex]?.skuCode
                    }}</span>
                    <span>{{ qcBeforeSend.qcStockTransferItems[dialogIndex]?.itemName }}</span>
                  </div>
                </div>
              </div>
              <div class="tw-basis-auto tw-text-right">
                <plus-minus-field
                  v-model="qcBeforeSend.qcStockTransferItems[dialogIndex].qtyReject"
                  :allow-increase="true"
                  :disable="isDisable"
                  @click.stop
                />
              </div>
            </div>
          </q-card-section>
        </k-card>
        <k-text-area
          v-model="qcBeforeSend.qcStockTransferItems[dialogIndex].notes"
          t-label="note"
          :show-label="false"
          :placeholder="t('note')"
        />
        <k-file-upload
          v-model="qcBeforeSend.qcStockTransferItems[dialogIndex].fileId"
          t-label="uploadPhoto"
          icon="upload"
          :payload="{ module: 'QC_TRANSFER_ITEM' }"
          :show-label="false"
          :placeholder="t('upload')"
          :attachment-info="qcBeforeSend.qcStockTransferItems[dialogIndex].attachmentInfo"
          :filename-max-length="20"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          :label="t('save')"
          color="secondary"
          :disable="globalLoading"
          dense
          v-close-popup
          @click="dialogIndex = null"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- PREVIEW DIALOG -->
  <q-dialog v-model="isDialogPreview" maximized transition-duration="300" position="bottom">
    <swipe-wrapper :swipe-down="() => (previewIndex = null)">
      <q-card flat class="preview-check-card">
        <!-- close button -->
        <q-card-section class="tw-flex tw-justify-between tw-pb-0 tw-mb-0">
          <span class="tw-text-lg tw-font-semibold">{{ t('detail') }}</span>
          <q-btn dense flat round icon="close" color="white" v-close-popup />
        </q-card-section>

        <!-- centered images -->
        <q-card-section v-if="previewIndex !== null && previewIndex !== undefined">
          <div class="tw-grid tw-grid-cols-12 tw-gap-2">
            <div class="tw-col-span-12 tw-flex tw-space-x-4">
              <product-image :item-id="qcBeforeSend.qcStockTransferItems[previewIndex].itemId || ''" size="60px" />
              <div class="tw-flex tw-flex-col">
                <span class="tw-font-semibold tw-text-lg">{{
                  qcBeforeSend.qcStockTransferItems[previewIndex].itemName || '-'
                }}</span>
                <span>{{ qcBeforeSend.qcStockTransferItems[previewIndex].skuCode || '-' }}</span>
              </div>
            </div>

            <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyReceived') }}</div>
            <div class="tw-col-span-8 tw-text-xs">
              {{
                format(stockTransferItem(qcBeforeSend.qcStockTransferItems[previewIndex].itemId)?.qtyReceived, {
                  precision: 0,
                }) || '-'
              }}
            </div>

            <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyReject') }}</div>
            <div class="tw-col-span-8 tw-text-xs">
              {{ format(qcBeforeSend.qcStockTransferItems[previewIndex].qtyReject, { precision: 0 }) || '-' }}
            </div>

            <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyTransfer') }}</div>
            <div class="tw-col-span-8 tw-text-xs">
              {{
                format(stockTransferItem(qcBeforeSend.qcStockTransferItems[previewIndex].itemId)?.qtyTransfer, {
                  precision: 0,
                }) || '-'
              }}
            </div>

            <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('attachFile') }}</div>
            <div class="tw-col-span-8 tw-text-xs">
              <attachment-file-preview
                :attachment-info="qcBeforeSend.qcStockTransferItems[previewIndex]?.attachmentInfo"
              />
            </div>

            <div class="tw-col-span-12 tw-py-2">
              <div class="tw-text-secondary-text tw-text-xs">
                {{ t('remarkTransferItem') }}
              </div>
              <div>
                {{ stockTransferItem(qcBeforeSend.qcStockTransferItems[previewIndex].itemId)?.notes || '-' }}
              </div>
            </div>

            <div class="tw-col-span-12 tw-py-2">
              <div class="tw-text-secondary-text tw-text-xs">
                {{ t('remarkQcItem') }}
              </div>
              <div>
                {{ qcBeforeSend.qcStockTransferItems[previewIndex].notes || '-' }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </swipe-wrapper>
  </q-dialog>
</template>
<script setup lang="ts">
import { TransferItemDataRequest } from 'src/common/model/transfer-item.model'
import KCard from 'src/components/ui/KCard.vue'
import { computed, ref } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import KFileUpload from 'src/components/ui/KFileUpload.vue'
import { useAppStore } from '../../../stores/app.store'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'
import AttachmentFilePreview from 'src/components/ui/AttachmentFilePreview.vue'
import { format } from 'src/common/utils/converter.utils'
import { id } from 'src/common/interfaces/response.interface'

interface Props {
  modelValue: TransferItemDataRequest
  isDisable?: boolean
}

interface Emits {
  (event: 'updte:model-value', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  isDisable: false,
})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const appStore = useAppStore()

const globalLoading = computed(() => appStore.$state?.loading)

const dialogIndex = ref<number | null>(null)

const previewIndex = ref<number | null>(null)

const stockTransferItem = (itemId: id | null) => {
  return form.value.stockTransferItems?.find((item) => item.itemId === itemId)
}

const isDialogOpen = computed({
  get: () => dialogIndex.value !== null,
  set: (val: boolean) => {
    if (!val) dialogIndex.value = null
  },
})

const isDialogPreview = computed({
  get: () => previewIndex.value !== null,
  set: (val: boolean) => {
    if (!val) previewIndex.value = null
  },
})

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('updte:model-value', value),
})

const qcBeforeSend = computed({
  get: () => form.value.qcBeforeSend,
  set: (value) => {
    form.value.qcBeforeSend = value
    emit('updte:model-value', form.value)
  },
})
const handleIncrease = (index: number) => {
  dialogIndex.value = index
}

const handleZeroConfirm = (index: number) => {
  qcBeforeSend.value.qcStockTransferItems?.splice(index, 1)
  dialogIndex.value = null
}

const handlePreview = (index: number) => {
  previewIndex.value = index
}
</script>
