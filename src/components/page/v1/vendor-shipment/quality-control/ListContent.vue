<template>
  <div class="tw-flex tw-items-start tw-justify-between tw-cursor-pointer" v-ripple @click.stop="handleClick">
    <div class="tw-basis-7/12">
      <div class="tw-flex tw-flex-col tw-space-y-2">
        <div class="tw-font-semibold">{{ item?.receiveNumber }}</div>
        <div class="tw-flex tw-flex-col tw-space-y-2">
          <div class="tw-flex tw-flex-col tw-space-y-1 tw-basis-auto">
            <div class="tw-flex tw-items-center tw-space-x-2">
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.83333 11V9.83333C9.83333 9.21449 9.5875 8.621 9.14992 8.18342C8.71233 7.74583 8.11884 7.5 7.5 7.5H2.83333C2.21449 7.5 1.621 7.74583 1.18342 8.18342C0.745833 8.621 0.5 9.21449 0.5 9.83333V11M7.5 2.83333C7.5 4.122 6.45533 5.16667 5.16667 5.16667C3.878 5.16667 2.83333 4.122 2.83333 2.83333C2.83333 1.54467 3.878 0.5 5.16667 0.5C6.45533 0.5 7.5 1.54467 7.5 2.83333Z"
                  stroke="#FF6F4F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="tw-text-xs tw-text-secondary-text">{{ item?.vendorName }}</span>
            </div>
            <div class="tw-flex tw-items-center tw-space-x-2">
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.08333 0.5V2.83333M3.41667 0.5V2.83333M0.5 5.16667H11M1.66667 1.66667H9.83333C10.4777 1.66667 11 2.189 11 2.83333V11C11 11.6443 10.4777 12.1667 9.83333 12.1667H1.66667C1.02233 12.1667 0.5 11.6443 0.5 11V2.83333C0.5 2.189 1.02233 1.66667 1.66667 1.66667Z"
                  stroke="#FF6F4F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

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
import { TStatus } from 'src/common/enum/operational.enum'
import { VendorShipmentResponsePage } from 'src/common/model/vendor-shipment.model'
import { format, formatDate } from 'src/common/utils/converter.utils'
import { Colors } from 'src/components/ui/KStatusBadge.vue'

interface Props {
  item: VendorShipmentResponsePage
  loading?: boolean
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
    case 'PARTIAL_PASSED':
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
  if (props.loading) return
  emit('click', { item: props.item })
}
</script>
