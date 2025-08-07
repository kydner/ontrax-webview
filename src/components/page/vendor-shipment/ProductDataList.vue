<template>
  <div class="tw-my-4">
    <k-btn color="secondary" label="Add Product" @click="handleProductPick" />
    <k-card v-for="product in productValues" :key="product.itemId" class="tw-my-2">
      <q-card-section class="tw-p-2">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-space-x-2">
            <q-img src="~assets/images/product-example.svg" no-spinner width="40px" />
            <div class="tw-basis-auto">
              <div class="tw-flex tw-flex-col">
                <span class="tw-text-secondary-text">{{ product.itemCode }}</span>
                <span>{{ product.itemName }}</span>
              </div>
            </div>
            <div class="tw-basis-auto tw-text-right">
              <plus-minus-field v-model="product.qtyOrdered" />
            </div>
          </div>
        </div>
      </q-card-section>
    </k-card>
  </div>
</template>
<script setup lang="ts">
import { bus } from 'src/common/event-bus'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import KCard from 'src/components/ui/KCard.vue'
import { computed } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'

interface Props {
  modelValue: VendorShipmentDataRequest
}

interface Emits {
  (event: 'updte:model-value', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const vendorValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('updte:model-value', value),
})

const productValues = computed({
  get: () => vendorValue.value?.receiveItems,
  set: (value) => {
    vendorValue.value.receiveItems = value
    emit('updte:model-value', vendorValue.value)
  },
})
const handleProductPick = () => {
  bus.emit('product:pick')
}
</script>
