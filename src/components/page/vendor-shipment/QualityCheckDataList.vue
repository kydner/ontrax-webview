<template>
  <div class="tw-my-4 tw-min-h-[40vh]">
    <k-card v-for="(product, index) in qcGoodsReceiveItems" :key="index" class="gradient-card tw-my-2">
      <q-card-section class="tw-p-2">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-justify-between tw-space-x-2">
            <product-image :item-id="product?.itemId || ''" />
            <div class="tw-basis-auto">
              <div class="tw-flex tw-flex-col">
                <span class="tw-text-secondary-text">{{ product?.skuCode || '-' }}</span>
                <span>{{ product.itemName }}</span>
              </div>
            </div>
          </div>
          <div v-if="form.status === 'RECEIVED'" class="tw-flex tw-flex-col tw-space-y-2 tw-basis-auto tw-text-right">
            <span class="tw-text-xs">Input Qty Reject</span>
            <plus-minus-field
              v-model="product.qtyReject"
              :zero-confirm="false"
              :allow-increase="true"
              @increase="handleIncrease(index)"
              @zero:confirm="handleZeroConfirm(index)"
            />
          </div>
          <div v-else class="tw-flex tw-flex-col tw-space-y-2 tw-basis-auto tw-text-right">
            <div class="tw-flex tw-flex-col tw-space-y-1">
              <div class="tw-basis-full tw-flex tw-justify-between tw-space-x-4">
                <div class="tw-basis-auto tw-space-x-4">
                  <q-icon name="img:/icons/qty-order__secondary-text.svg" />
                  <span class="tw-text-secondary-text tw-text-xs">Qty Order</span>
                </div>
                <div>
                  <span class="tw-text-white tw-text-xs">{{
                    format(goodsReceiveItem(product.itemId)?.qtyOrdered, { precision: 0 })
                  }}</span>
                </div>
              </div>
              <div class="tw-basis-full tw-flex tw-justify-between tw-space-x-4">
                <div class="tw-basis-auto tw-space-x-4">
                  <q-icon name="img:/icons/qty-receive__secondary-text.svg" />
                  <span class="tw-text-secondary-text tw-text-xs">Qty Receive</span>
                </div>
                <div>
                  <span class="tw-text-white tw-text-xs">{{ format(product.qtyPass, { precision: 0 }) }}</span>
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
        </div>
      </q-card-section>
    </k-card>

    <div v-if="qcGoodsReceiveItems?.length === 0" class="tw-my-4 tw-text-disable-text">{{ t('noData') }}</div>
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
                <product-image :item-id="qcGoodsReceiveItems[dialogIndex]?.itemId || ''" />
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-flex-col">
                    <span class="tw-text-secondary-text">{{ qcGoodsReceiveItems[dialogIndex]?.skuCode }}</span>
                    <span>{{ qcGoodsReceiveItems[dialogIndex]?.itemName }}</span>
                  </div>
                </div>
              </div>
              <div class="tw-basis-auto tw-text-right">
                <plus-minus-field
                  v-model="qcGoodsReceiveItems[dialogIndex].qtyReject"
                  :allow-increase="true"
                  :disable="isDisable"
                />
              </div>
            </div>
          </q-card-section>
        </k-card>
        <k-text-area
          v-model="qcGoodsReceiveItems[dialogIndex].notes"
          t-label="note"
          :show-label="false"
          :placeholder="t('note')"
        />
        <k-file-upload
          model-value=""
          t-label="note"
          icon="upload"
          :payload="{ module: 'SHIPMENT' }"
          :show-label="false"
          :placeholder="t('upload')"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="t('save')" color="secondary" dense v-close-popup @click="dialogIndex = null" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import KCard from 'src/components/ui/KCard.vue'
import { computed, ref } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import { format } from 'src/common/utils/converter.utils'
import KFileUpload from 'src/components/ui/KFileUpload.vue'
import { id } from 'src/common/interfaces/response.interface'

interface Props {
  modelValue: VendorShipmentDataRequest
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

const dialogIndex = ref<number | null>(null)

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

const goodsReceiveItem = (itemId: id | null) => {
  return form.value.goodsReceiveItems?.find((item) => item.itemId === itemId)
}
const qcGoodsReceiveItems = computed({
  get: () => form.value.qcGoodsReceive.qcGoodsReceiveItems,
  set: (value) => {
    form.value.qcGoodsReceive.qcGoodsReceiveItems = value
    emit('updte:model-value', form.value)
  },
})
const handleIncrease = (index: number) => {
  dialogIndex.value = index
}

const handleZeroConfirm = (index: number) => {
  qcGoodsReceiveItems.value?.splice(index, 1)
  dialogIndex.value = null
}
</script>
