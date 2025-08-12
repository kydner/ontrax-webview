<template>
  <div class="tw-flex tw-items-start tw-justify-between tw-cursor-pointer" v-ripple @click.stop="handleClick">
    <div class="tw-basis-6/12">
      <div class="tw-flex tw-flex-col tw-space-y-2">
        <div class="tw-font-semibold">{{ item?.receiveNumber }}</div>
        <div class="tw-flex tw-flex-col tw-space-y-2">
          <div class="tw-flex tw-flex-col tw-space-y-1 tw-basis-auto">
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="img:/icons/upload-box-primary.svg" color="primary" />
              <span class="tw-text-xs tw-text-secondary-text">{{ item?.fromLocationWarehouseName }}</span>
            </div>
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="img:/icons/download-primary.svg" color="primary" />
              <span class="tw-text-xs tw-text-secondary-text">{{ item?.toLocationWarehouseName }}</span>
            </div>
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="calendar_today" color="primary" />
              <span class="tw-text-xs tw-text-secondary-text">{{ formatDate(item?.transferDate) }}</span>
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
import { TransferItemResponsePage } from 'src/common/model/transfer-item.model'
import { format, formatDate } from 'src/common/utils/converter.utils'
import { Colors } from 'src/components/ui/KStatusBadge.vue'

interface Props {
  item: TransferItemResponsePage
  loading?: boolean
}

interface Emits {
  (e: 'click', data: { item: TransferItemResponsePage }): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {})

const getColor = (status: TStatus): Colors => {
  switch (status) {
    case 'RECEIVED':
      return 'positive'
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
  if (props.loading) return
  emit('click', { item: props.item })
}
</script>
