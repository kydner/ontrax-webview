<template>
  <div class="tw-flex tw-items-start tw-justify-between tw-cursor-pointer" v-ripple @click.stop="handleClick">
    <div class="tw-basis-6/12">
      <div class="tw-flex tw-flex-col tw-space-y-2">
        <div class="tw-font-semibold">{{ item?.receiveNumber }}</div>
        <div class="tw-flex tw-flex-col tw-space-y-2">
          <div class="tw-flex tw-flex-col tw-space-y-1 tw-basis-auto">
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="person" color="primary" />
              <span class="tw-text-xs tw-text-secondary-text">{{ item?.vendorName }}</span>
            </div>
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="calendar_today" color="primary" />
              <span class="tw-text-xs tw-text-secondary-text">{{ formatDate(item?.shippingDate) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tw-basis-6/12">
      <div class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-space-y-2">
        <span class="tw-font-semibold">{{ format(item?.totalItems, { precision: 0 }) || 0 }} Items</span>
        <k-status-badge :label="startCase(item?.status)" :color="getColor(item.status)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { startCase } from 'lodash'
import { TStatus } from 'src/common/enum/vendor-shipment.enum'
import { VendorShipmentResponsePage } from 'src/common/model/vendor-shipment.model'
import { format, formatDate } from 'src/common/utils/converter.utils'
import { Colors } from 'src/components/ui/KStatusBadge.vue'

interface Props {
  item: VendorShipmentResponsePage
}

interface Emits {
  (e: 'click', data: { item: VendorShipmentResponsePage }): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {})

const getColor = (status: TStatus): Colors => {
  switch (status) {
    case 'RECEIVED':
      return 'secondary'
    case 'QC_PASSED':
      return 'positive'
    case 'IN_TRANSIT':
      return 'secondary'
    case 'DRAFT':
      return 'mute'
    default:
      return 'disable'
  }
}

const handleClick = () => {
  console.log('cli')
  emit('click', { item: props.item })
}
</script>
