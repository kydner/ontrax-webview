<template>
  <div class="tw-my-4 tw-min-h-[40vh]">
    <k-card v-for="(product, index) in qcAfterReceived.qcStockTransferItems" :key="index" class="gradient-card tw-my-2">
      <q-card-section class="tw-p-2" v-ripple @click="handlePreview(product)">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-justify-between tw-space-x-2">
            <product-image :item-id="product?.itemId" />
            <div class="tw-basis-auto">
              <div class="tw-flex tw-flex-col">
                <span class="tw-text-secondary-text">{{ product?.skuCode }}</span>
                <span>{{ product.itemName }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="['QC_PASSED', 'PARTIAL_PASSED'].includes(form.status)"
            class="tw-flex tw-flex-col tw-space-y-2 tw-basis-auto tw-text-right"
          >
            <div class="tw-flex tw-flex-col tw-space-y-1">
              <div class="tw-basis-full tw-flex tw-justify-between tw-space-x-4">
                <div class="tw-basis-auto tw-space-x-4">
                  <q-icon name="img:/icons/qty-order__secondary-text.svg" />
                  <span class="tw-text-secondary-text tw-text-xs">Qty Send</span>
                </div>
                <div>
                  <span class="tw-text-white tw-text-xs">{{
                    format(stockTransferItem(product.itemId)?.qtyTransfer, { precision: 0 })
                  }}</span>
                </div>
              </div>
              <div class="tw-basis-full tw-flex tw-justify-between tw-space-x-4">
                <div class="tw-basis-auto tw-space-x-4">
                  <q-icon name="img:/icons/qty-receive__secondary-text.svg" />
                  <span class="tw-text-secondary-text tw-text-xs">Qty Receive</span>
                </div>
                <div>
                  <span class="tw-text-white tw-text-xs">{{
                    format(stockTransferItem(product.itemId)?.qtyReceived, { precision: 0 })
                  }}</span>
                </div>
              </div>
              <div class="tw-basis-full tw-flex tw-justify-between tw-space-x-4">
                <div class="tw-basis-auto tw-space-x-4">
                  <q-icon name="img:/icons/qty-reject__secondary-text.svg" />
                  <span class="tw-text-secondary-text tw-text-xs">Qty Reject</span>
                </div>
                <div>
                  <span class="tw-text-negative tw-text-xs">{{ format(product.qtyReject, { precision: 0 }) }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="tw-flex tw-flex-col tw-space-y-2 tw-basis-auto tw-text-right">
            <div v-if="['QC_RECEIVE', 'QC_SEND'].includes(form.status)" class="tw-flex tw-flex-col tw-space-y-2">
              <div class="tw-text-xs">Input Qty Reject</div>
              <plus-minus-field
                v-model="product.qtyReject"
                :zero-confirm="false"
                @increase="handleIncrease(index)"
                @zero:confirm="handleZeroConfirm(index)"
                @click.stop
              />
            </div>
            <div v-else>
              <plus-minus-field
                v-model="product.qtyReject"
                :zero-confirm="false"
                @increase="handleIncrease(index)"
                @zero:confirm="handleZeroConfirm(index)"
                @click.stop
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </k-card>

    <div v-if="qcAfterReceived.qcStockTransferItems?.length === 0" class="tw-my-4 tw-text-disable-text">
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
                <product-image :item-id="qcAfterReceived.qcStockTransferItems[dialogIndex]?.itemId" />
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-flex-col">
                    <span class="tw-text-secondary-text">{{
                      qcAfterReceived.qcStockTransferItems[dialogIndex]?.skuCode
                    }}</span>
                    <span>{{ qcAfterReceived.qcStockTransferItems[dialogIndex]?.itemName }}</span>
                  </div>
                </div>
              </div>
              <div class="tw-basis-auto tw-text-right">
                <plus-minus-field
                  v-model="qcAfterReceived.qcStockTransferItems[dialogIndex].qtyReject"
                  :allow-increase="true"
                  :disable="isDisable"
                  @click.stop
                />
              </div>
            </div>
          </q-card-section>
        </k-card>
        <k-text-area
          v-model="qcAfterReceived.qcStockTransferItems[dialogIndex].notes"
          t-label="note"
          :show-label="false"
          :placeholder="t('note')"
        />
        <k-file-upload
          v-model="qcAfterReceived.qcStockTransferItems[dialogIndex].fileId"
          t-label="uploadPhoto"
          :payload="{ module: 'QC_TRANSFER_ITEM' }"
          :show-label="false"
          :placeholder="t('uploadPhoto')"
          :attachment-info="qcAfterReceived.qcStockTransferItems[dialogIndex].attachmentInfo"
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
  <detail-preview v-model="previewItem">
    <template #default="{ item }">
      <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-12 tw-flex tw-space-x-4">
          <product-image :item-id="item?.itemId || ''" size="60px" />
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-semibold tw-text-lg">{{ item?.itemName || '-' }}</span>
            <span>{{ item?.skuCode || '-' }}</span>
          </div>
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtySend') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          {{
            format(stockTransferItem(item?.itemId)?.qtyTransfer, {
              precision: 0,
            }) || '-'
          }}
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyReceived') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          {{
            format(stockTransferItem(item?.itemId)?.qtyReceived, {
              precision: 0,
            }) || '-'
          }}
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyReject') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          {{ format(item?.qtyReject, { precision: 0 }) || '-' }}
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('attachFile') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          <attachment-file-preview :attachment-info="item?.attachmentInfo" />
        </div>

        <div class="tw-col-span-12 tw-py-2">
          <div class="tw-text-secondary-text tw-text-xs">Remark Transfer Item</div>
          <div>
            {{ stockTransferItem(item?.itemId)?.notes || '-' }}
          </div>
        </div>

        <div class="tw-col-span-12 tw-py-2">
          <div class="tw-text-secondary-text tw-text-xs">Remark QC Before Send</div>
          <div>
            {{ transferItemBeforeQc(item?.itemId)?.notes || '-' }}
          </div>
        </div>

        <div class="tw-col-span-12 tw-py-2">
          <div class="tw-text-secondary-text tw-text-xs">Remark Receive</div>
          <div>
            {{ receiveItem(item.itemId)?.notes || '-' }}
          </div>
        </div>

        <div class="tw-col-span-12 tw-py-2">
          <div class="tw-text-secondary-text tw-text-xs">Remark Receive Item After QC</div>
          <div>
            {{ receiveItemAfterQc(item?.itemId)?.notes || '-' }}
          </div>
        </div>
      </div>
    </template>
  </detail-preview>
</template>
<script setup lang="ts">
import { ReceiveItemDataRequest } from 'src/common/model/receive-item.model'
import KCard from 'src/components/ui/KCard.vue'
import { computed, ref } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import KFileUpload from 'src/components/ui/KFileUpload.vue'
import { format } from 'src/common/utils/converter.utils'
import { id } from 'src/common/interfaces/response.interface'
import { useAppStore } from 'src/stores/app.store'
import AttachmentFilePreview from 'src/components/ui/AttachmentFilePreview.vue'
import DetailPreview from '../operational/DetailPreview.vue'
import { TransferItem } from 'src/common/model/operational.model'

interface Props {
  modelValue: ReceiveItemDataRequest
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

const previewItem = ref<TransferItem | null>(null)

const isDialogOpen = computed({
  get: () => dialogIndex.value !== null,
  set: (val: boolean) => {
    if (!val) dialogIndex.value = null
  },
})

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('updte:model-value', value),
})

const qcAfterReceived = computed({
  get: () => form.value.qcAfterReceived,
  set: (value) => {
    form.value.qcAfterReceived = value
    emit('updte:model-value', form.value)
  },
})

const stockTransferItems = computed(() => form.value?.stockTransferItems || [])

const stockTransferItem = (itemId: id) => {
  return stockTransferItems.value?.find((product) => product.itemId === itemId)
}

const receiveItem = (itemId: id) => {
  return form.value.receiveItems?.find((product) => product.itemId === itemId)
}

const transferItemBeforeQc = (itemId: id) => {
  return form.value.qcBeforeSend.qcStockTransferItems?.find((product) => product.itemId === itemId)
}

const receiveItemAfterQc = (itemId: id) => {
  return form.value.qcAfterReceived.qcStockTransferItems?.find((product) => product.itemId === itemId)
}

const handleIncrease = (index: number) => {
  dialogIndex.value = index
}

const handleZeroConfirm = (index: number) => {
  qcAfterReceived.value.qcStockTransferItems?.splice(index, 1)
  dialogIndex.value = null
}

const handlePreview = (item: TransferItem) => {
  previewItem.value = item
}
</script>
