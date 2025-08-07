<template>
  <div class="tw-my-4">
    <k-btn v-if="!isDisable" color="secondary" label="Add Product" @click="handleProductPick" />

    <k-card v-for="(product, index) in productValues" :key="product.itemId" class="tw-my-2">
      <q-card-section class="tw-p-2">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-justify-between tw-space-x-2">
            <q-img src="~assets/images/product-example.svg" no-spinner width="40px" />
            <div class="tw-basis-auto">
              <div class="tw-flex tw-flex-col">
                <span class="tw-text-secondary-text">{{ product.itemCode }}</span>
                <span>{{ product.itemName }}</span>
              </div>
            </div>
          </div>
          <div class="tw-basis-auto tw-text-right">
            <plus-minus-field
              v-model="product.qtyOrdered"
              disable-value
              zero-confirm
              :allow-increase="false"
              @increase="handleIncrease(index)"
              @zero:confirm="handleZeroConfirm(index)"
            />
          </div>
        </div>
      </q-card-section>
    </k-card>

    <div v-if="productValues?.length === 0" class="tw-my-4 tw-text-disable-text">{{ t('noData') }}</div>
  </div>

  <!-- Single Dialog reused for all items -->
  <q-dialog v-model="isDialogOpen" dark>
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section
        v-if="dialogIndex !== null && dialogIndex !== undefined"
        class="tw-flex tw-flex-col tw-space-y-2 tw-pt-2"
      >
        <k-card>
          <q-card-section class="tw-p-2">
            <div class="tw-flex tw-items-center tw-justify-between">
              <div class="tw-flex tw-justify-between tw-space-x-2">
                <q-img src="~assets/images/product-example.svg" no-spinner width="40px" />
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-flex-col">
                    <span class="tw-text-secondary-text">{{ productValues[dialogIndex]?.itemCode }}</span>
                    <span>{{ productValues[dialogIndex]?.itemName }}</span>
                  </div>
                </div>
              </div>
              <div class="tw-basis-auto tw-text-right">
                <plus-minus-field
                  v-model="productValues[dialogIndex].qtyOrdered"
                  :allow-increase="true"
                  :disable="isDisable"
                />
              </div>
            </div>
          </q-card-section>
        </k-card>
        <k-text-area
          v-model="productValues[dialogIndex].notes"
          t-label="note"
          :show-label="false"
          :placeholder="t('note')"
        />
      </q-card-section>

      <q-card-actions align="right" class="tw-py-0">
        <q-btn flat :label="t('close')" color="primary" v-close-popup @click="dialogIndex = null" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { bus } from 'src/common/event-bus'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import KCard from 'src/components/ui/KCard.vue'
import { computed, ref } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { useI18n } from 'vue-i18n'

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

const vendorValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('updte:model-value', value),
})

const productValues = computed({
  get: () => vendorValue.value?.receiveItems || [],
  set: (value) => {
    vendorValue.value.receiveItems = value
    emit('updte:model-value', vendorValue.value)
  },
})

const handleProductPick = () => {
  bus.emit('product:pick')
}

const handleIncrease = (index: number) => {
  dialogIndex.value = index
}

const handleZeroConfirm = (index: number) => {
  productValues.value?.splice(index, 1)
  dialogIndex.value = null
}
</script>
