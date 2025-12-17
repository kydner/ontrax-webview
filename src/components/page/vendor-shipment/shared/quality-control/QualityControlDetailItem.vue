<template>
  <swipe-wrapper :swipe-down="handleBack">
    <!-- Header -->
    <k-toolbar :header-title="productFromChannel?.srtPartNumber ?? '-'" @back="emit('back')" />

    <!-- Body (slot) -->
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">aaaa</div>
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
