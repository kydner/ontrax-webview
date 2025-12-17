<template>
  <div class="tw-my-4 tw-min-h-[60vh]">
    <slot name="header"></slot>
    <k-btn v-if="showCreateButton" color="secondary" label="Add Product" @click="handleProductPick" />

    <template v-if="routePath === 'quality-control'">
      <product-data-list-received-qc v-if="form.status === 'RECEIVED'" v-model="form" />
      <product-data-list-qc-passed v-else-if="form.status === 'QC_PASSED'" v-model="form" />
    </template>
    <template v-else>
      <product-data-list-draft v-if="!form.status || form.status === 'DRAFT'" v-model="form" />
      <product-data-list-in-transit v-else-if="form.status === 'IN_TRANSIT'" v-model="form" />
      <product-data-list-received v-else-if="form.status === 'RECEIVED'" v-model="form" />
    </template>

    <div v-if="details?.length === 0" class="tw-my-8 tw-text-disable-text">
      <k-lottie
        animation-link="/lotties/no_data.json"
        auto-play
        loop
        renderer="svg"
        class="tw-w-52 tw-h-5tw-w-52 tw-overflow-hidden tw-block"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { bus } from 'src/common/event-bus'
import { computed } from 'vue'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import ProductDataListDraft from './send/ProductDataListDraft.vue'
import ProductDataListInTransit from './send/ProductDataListInTransit.vue'
import ProductDataListReceived from './send/ProductDataListReceived.vue'
import ProductDataListReceivedQc from './quality-control/ProductDataListReceived.vue'
import ProductDataListQcPassed from './quality-control/ProductDataListQcPassed.vue'
import KLottie from 'src/components/ui/KLottie.vue'
import { useRoute } from 'vue-router'

interface Props {
  modelValue: VendorShipmentDataRequest
  isDisable?: boolean
  showCreateButton?: boolean
}

interface Emits {
  (event: 'update:model-value', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  isDisable: false,
  showCreateButton: true,
})

const emit = defineEmits<Emits>()

const route = useRoute()

const routePath = computed(() => route?.meta?.routePath)

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

const handleProductPick = () => {
  bus.emit('shipment:product:pick')
}
</script>
