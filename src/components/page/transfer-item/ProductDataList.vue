<template>
  <div class="tw-my-4 tw-min-h-[60vh]">
    <k-btn
      v-if="showAddButton"
      :disable="!form?.fromWarehouseId"
      color="secondary"
      label="Add Product"
      @click="handleProductPick"
    />

    <k-card v-for="(product, index) in transferItems" :key="product.itemId" class="gradient-card tw-my-2">
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
            <plus-minus-field
              v-if="form.status === undefined || form.status === 'DRAFT'"
              v-model="product.qty"
              :allow-increase="true"
              :max="product.availableQty"
              :is-disable="isDisable"
              @increase="handleIncrease(index)"
              @zero:confirm="handleZeroConfirm(index)"
            />
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
                <product-image />
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-flex-col">
                    <span class="tw-text-secondary-text">{{ transferItems[dialogIndex]?.itemCode }}</span>
                    <span>{{ transferItems[dialogIndex]?.itemName }}</span>
                  </div>
                </div>
              </div>
              <div class="tw-basis-auto tw-text-right">
                <plus-minus-field
                  v-model="transferItems[dialogIndex].qty"
                  :allow-increase="true"
                  :max="transferItems[dialogIndex].availableQty"
                />
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
</template>
<script setup lang="ts">
import { bus } from 'src/common/event-bus'
import { TransferItemDataRequest } from 'src/common/model/transfer-item.model'
import KCard from 'src/components/ui/KCard.vue'
import { computed, ref } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import { Notify } from 'src/common/utils/plugin.utils'

interface Props {
  modelValue: TransferItemDataRequest
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

const showAddButton = computed(() => {
  if (!form.value.status) return true
  if (!['DRAFT'].includes(form.value.status)) return false
  return !props.isDisable
})

const isDialogOpen = computed({
  get: () => dialogIndex.value !== null,
  set: (val: boolean) => {
    if (!val) dialogIndex.value = null
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
  if (!form.value?.fromWarehouseId)
    return Notify.create({
      message: 'Please select a warehouse first.',
      type: 'negative',
    })
  bus.emit('product:pick')
}

const handleIncrease = (index: number) => {
  dialogIndex.value = index
}

const handleZeroConfirm = (index: number) => {
  transferItems.value?.splice(index, 1)
  dialogIndex.value = null
}
</script>
