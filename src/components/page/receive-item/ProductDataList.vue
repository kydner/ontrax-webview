<template>
  <div class="tw-my-4 tw-min-h-[60vh]">
    <k-btn v-if="showAddButton" color="secondary" label="Add Product" @click="handleProductPick" />

    <k-card v-for="(product, index) in transferItems" :key="product.itemId" class="gradient-card tw-my-2">
      <q-card-section class="tw-p-2" v-ripple @click="handlePreview(index)">
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
          <div class="tw-flex tw-flex-col tw-space-y-2 tw-basis-auto tw-text-right">
            <div v-if="form.status === 'IN_TRANSIT'" class="tw-flex tw-flex-col tw-space-y-2">
              <div class="tw-text-xs">Input Qty Receive</div>
              <plus-minus-field
                v-model="product.qtyReceived"
                :allow-increase="true"
                @increase="handleIncrease(index)"
                @zero:confirm="handleZeroConfirm(index)"
                @click.stop
              />
            </div>

            <div v-else>
              <plus-minus-field
                v-model="product.qty"
                :allow-increase="false"
                :disable="['RECEIVED'].includes(form.status)"
                @increase="handleIncrease(index)"
                @zero:confirm="handleZeroConfirm(index)"
                @click.stop
              />
            </div>
          </div>
        </div>

        <div
          v-if="['IN_TRANSIT'].includes(form.status)"
          class="tw-flex tw-items-center tw-space-x-6 tw-text-xs tw-mt-2"
        >
          <div class="tw-basis-auto tw-flex tw-items-center tw-space-x-2">
            <q-icon name="img:/icons/qty-order__secondary-text.svg" />
            <div class="tw-text-secondary-text">Qty Send</div>
          </div>
          <div>
            {{ format(product.qtyTransfer, { precision: 0 }) }}
          </div>
        </div>
      </q-card-section>
    </k-card>

    <div v-if="transferItems?.length === 0" class="tw-my-4 tw-text-disable-text">{{ t('noData') }}</div>
  </div>

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
                <product-image :item-id="transferItems[dialogIndex]?.itemId" />
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-flex-col">
                    <span class="tw-text-secondary-text">{{ transferItems[dialogIndex]?.skuCode }}</span>
                    <span>{{ transferItems[dialogIndex]?.itemName }}</span>
                  </div>
                </div>
              </div>
              <div class="tw-basis-auto tw-text-right">
                <plus-minus-field
                  v-if="form.status === 'IN_TRANSIT'"
                  v-model="transferItems[dialogIndex].qtyReceived"
                  :allow-increase="true"
                  @click.stop
                />
                <plus-minus-field v-else v-model="transferItems[dialogIndex].qtyReject" :allow-increase="true" />
              </div>
            </div>
          </q-card-section>
        </k-card>
        <k-text-area
          v-model="transferItems[dialogIndex].notes"
          t-label="note"
          :show-label="false"
          :placeholder="t('note')"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="t('save')" color="secondary" dense v-close-popup @click="dialogIndex = null" />
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
              <product-image :item-id="transferItems[previewIndex].itemId || ''" size="60px" />
              <div class="tw-flex tw-flex-col">
                <span class="tw-font-semibold tw-text-lg">{{ transferItems[previewIndex].itemName || '-' }}</span>
                <span>{{ transferItems[previewIndex].skuCode || '-' }}</span>
              </div>
            </div>

            <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyAvailable') }}</div>
            <div class="tw-col-span-8 tw-text-xs">
              {{ format(transferItems[previewIndex].qtyAvailable, { precision: 0 }) || '-' }}
            </div>

            <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtySend') }}</div>
            <div class="tw-col-span-8 tw-text-xs">
              {{ format(transferItems[previewIndex].qtyTransfer, { precision: 0 }) || '-' }}
            </div>

            <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyReject') }}</div>
            <div class="tw-col-span-8 tw-text-xs">
              {{ format(transferItems[previewIndex].qtyReject, { precision: 0 }) || '-' }}
            </div>

            <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('attachFile') }}</div>
            <div class="tw-col-span-8 tw-text-xs">
              <attachment-file-preview :attachment-info="transferItems[previewIndex]?.attachmentInfo" />
            </div>

            <div class="tw-col-span-12 tw-py-2">
              <div class="tw-text-secondary-text tw-text-xs">
                {{ t('remark') }}
              </div>
              <div>
                {{ transferItems[previewIndex].notes || '-' }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </swipe-wrapper>
  </q-dialog>
</template>
<script setup lang="ts">
import { bus } from 'src/common/event-bus'
import { ReceiveItemDataRequest } from 'src/common/model/receive-item.model'
import KCard from 'src/components/ui/KCard.vue'
import { computed, ref } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import { format } from 'src/common/utils/converter.utils'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'
import AttachmentFilePreview from 'src/components/ui/AttachmentFilePreview.vue'

interface Props {
  modelValue: ReceiveItemDataRequest
  isDisable?: boolean
}

interface Emits {
  (event: 'update:model-value', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  isDisable: false,
})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const dialogIndex = ref<number | null>(null)

const previewIndex = ref<number | null>(null)

const showAddButton = computed(() => {
  if (!form.value.status) return true
  if (['DRAFT'].includes(form.value.status)) return true
  return !props.isDisable
})

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
  set: (value) => emit('update:model-value', value),
})

const transferItems = computed({
  get: () => form.value?.transferItems || [],
  set: (value) => {
    form.value.transferItems = value
    emit('update:model-value', form.value)
  },
})

const handleProductPick = () => {
  bus.emit('product:pick')
}

const handleIncrease = (index: number) => {
  dialogIndex.value = index
}

const handleZeroConfirm = (index: number) => {
  transferItems.value?.splice(index, 1)
  dialogIndex.value = null
}

const handlePreview = (index: number) => {
  previewIndex.value = index
}
</script>
