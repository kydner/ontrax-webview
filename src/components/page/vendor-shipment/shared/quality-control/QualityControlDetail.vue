<template>
  <swipe-wrapper :swipe-down="handleBack">
    <!-- Header -->
    <k-toolbar :header-title="productFromChannel?.srtPartNumber ?? '-'" @back="emit('back')" />

    <!-- Body (slot) -->
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">
      <div class="tw-border tw-border-line tw-p-4 tw-rounded-base tw-col-span-12">
        <div class="tw-flex tw-flex-col tw-space-y-1 tw-mb-1">
          <div class="tw-flex tw-items-start tw-space-x-2">
            <product-image :item-id="productFromChannel?.productId || ''" />
            <div class="tw-basis-auto">
              <div class="tw-flex tw-flex-col">
                <span class="tw-text-base tw-text-secondary-text">{{ productFromChannel?.srtPartNumber || '-' }}</span>
                <span class="tw-text-base tw-text-white">{{ productFromChannel?.productName || '-' }}</span>
              </div>
            </div>
          </div>
        </div>

        <q-separator spaced="1rem" class="tw-bg-line"></q-separator>

        <div class="tw-grid tw-grid-cols-12 tw-gap-2">
          <div class="tw-col-span-12 tw-flex">
            <div class="tw-basis-6/12">
              <div class="tw-flex tw-justify-between">
                <span class="tw-text-secondary-text">Qty Order</span>
                <span>0</span>
              </div>
            </div>
          </div>
          <div class="tw-col-span-12 tw-flex">
            <div class="tw-basis-6/12">
              <div class="tw-flex tw-justify-between">
                <span class="tw-text-secondary-text">Qty Receive</span>
                <span>0</span>
              </div>
            </div>
          </div>
          <div class="tw-col-span-12 tw-flex">
            <div class="tw-basis-6/12">
              <div class="tw-flex tw-justify-between">
                <span class="tw-text-secondary-text">Qty Rejected</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tw-col-span-12">
        <q-input model-value="" color="secondary" dense placeholder="Search Serial Number" class="input_search_detail">
          <template #prepend>
            <q-icon name="img:/icons/search.svg" />
          </template>
        </q-input>

        <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-my-4">
          <k-card class="tw-relative tw-col-span-12 tw-p-4 gradient-card tw-cursor-pointer" v-ripple>
            <div class="tw-flex tw-justify-between">
              <span class="tw-text-base tw-text-white">BAR-BF-2606834</span>
              <div class="tw-basis-auto">
                <span class="tw-bg-negative tw-p-2 tw-px-3 tw-text-white tw-rounded-base tw-text-xs">Rejected</span>
              </div>
            </div>
            <div class="tw-text-secondary-text">Comment:</div>
            <div class="tw-text-secondary-text">-</div>
          </k-card>
        </div>
      </div>
    </div>
  </swipe-wrapper>
</template>
<script setup lang="ts">
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { useChannelStore } from 'src/stores/channel.store'
import { VendorShipmentResponse } from 'src/common/model/vendor-shipment.model'
import { VendorShipmentDetailResponse } from 'src/common/model/vendor-shipment-detail.model'
import ProductImage from 'src/components/images/Product.vue'
import KCard from 'src/components/ui/KCard.vue'

interface Props {
  modelValue: VendorShipmentResponse
}

interface Emits {
  (e: 'back'): void
  (event: 'update:modelValue', value: VendorShipmentResponse): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const channelStore = useChannelStore()

const productFromChannel = computed(() =>
  channelStore.getData<VendorShipmentDetailResponse>('/shipment/quality-control/detail'),
)

const handleBack = () => emit('back')
</script>

<style scoped lang="scss">
:deep(.q-field--dark .q-field__control:before) {
  border-bottom-color: var(--q-line);
}
</style>
