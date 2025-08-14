<template>
  <div class="tw-my-4 tw-min-h-[40vh]">
    <k-card v-for="(product, index) in qcBeforeSend.qcStockTransferItems" :key="index" class="tw-my-2">
      <q-card-section class="tw-p-2">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-justify-between tw-space-x-2">
            <product-image />
            <div class="tw-basis-auto">
              <div class="tw-flex tw-flex-col">
                <span class="tw-text-secondary-text">{{ product.itemCode }}</span>
                <span>{{ product.itemName }}</span>
              </div>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-space-y-2 tw-basis-auto tw-text-right">
            <span v-if="transferValue.status === 'QC_SEND'" class="tw-text-xs">Input Qty Reject</span>
            <plus-minus-field
              v-model="product.qtyReject"
              :zero-confirm="false"
              :allow-increase="false"
              @increase="handleIncrease(index)"
              @zero:confirm="handleZeroConfirm(index)"
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
                <product-image />
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-flex-col">
                    <span class="tw-text-secondary-text">{{
                      qcBeforeSend.qcStockTransferItems[dialogIndex]?.itemCode
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
          v-model="qcBeforeSend.qcStockTransferItems[dialogIndex].notes"
          t-label="note"
          :payload="{ module: 'TRANSFER' }"
          :show-label="false"
          :placeholder="t('note')"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="t('save')" color="secondary" dense v-close-popup @click="dialogIndex = null" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ReceiveItemDataRequest } from 'src/common/model/receive-item.model'
import KCard from 'src/components/ui/KCard.vue'
import { computed, ref } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import KFileUpload from 'src/components/ui/KFileUpload.vue'

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

const dialogIndex = ref<number | null>(null)

const isDialogOpen = computed({
  get: () => dialogIndex.value !== null,
  set: (val: boolean) => {
    if (!val) dialogIndex.value = null
  },
})

const transferValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('updte:model-value', value),
})

const qcBeforeSend = computed({
  get: () => transferValue.value.qcBeforeSend,
  set: (value) => {
    transferValue.value.qcBeforeSend = value
    emit('updte:model-value', transferValue.value)
  },
})
const handleIncrease = (index: number) => {
  dialogIndex.value = index
}

const handleZeroConfirm = (index: number) => {
  qcBeforeSend.value.qcStockTransferItems?.splice(index, 1)
  dialogIndex.value = null
}
</script>
