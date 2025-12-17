<template>
  <k-card v-for="(product, index) in details" :key="index" class="gradient-card tw-my-2">
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
          <plus-minus-field
            v-model="product.qtyOrder"
            :allow-increase="false"
            :allow-decrease="true"
            zero-confirm
            @increase="handleIncrease(index)"
            @zero:confirm="handleZeroConfirm(index)"
            @click.stop
          />
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
                  v-model="details[dialogIndex].qtyOrder"
                  allow-decrease
                  allow-increase
                  @click.stop
                  @zero:confirm="handleZeroConfirm(dialogIndex)"
                />
              </div>
            </div>
          </q-card-section>
        </k-card>
        <k-text-area v-model="details[dialogIndex].notes" t-label="note" :show-label="false" :placeholder="t('note')" />
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
import { computed, ref } from 'vue'
import ProductImage from 'src/components/images/Product.vue'
import KCard from 'src/components/ui/KCard.vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { useI18n } from 'vue-i18n'
import { format } from 'src/common/utils/converter.utils'
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

const dialogIndex = ref<number | null>(null)

const isDialogOpen = computed({
  get: () => dialogIndex.value !== null,
  set: (val: boolean) => {
    if (!val) dialogIndex.value = null
  },
})

const handleIncrease = (index: number) => {
  dialogIndex.value = index
}

const handleZeroConfirm = (index: number) => {
  details.value?.splice(index, 1)
  dialogIndex.value = null
}
</script>
