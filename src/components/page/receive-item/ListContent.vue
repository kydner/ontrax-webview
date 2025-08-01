<template>
  <div class="tw-flex tw-items-start tw-justify-between">
    <div class="tw-basis-6/12">
      <div class="tw-flex tw-flex-col tw-space-y-2">
        <div class="tw-font-semibold">{{ item?.code }}</div>
        <div class="tw-flex tw-flex-col tw-space-y-2">
          <div class="tw-flex tw-flex-col tw-space-y-1 tw-basis-auto">
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="person" color="primary" />
              <span class="tw-text-xs tw-text-secondary-text">{{ item?.company }}</span>
            </div>
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="calendar_today" color="primary" />
              <span class="tw-text-xs tw-text-secondary-text">{{ formatDate(item?.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tw-basis-6/12">
      <div class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-space-y-2">
        <span class="tw-font-semibold">{{ item?.itemCount }} Items</span>
        <k-status-badge :label="item?.status" :color="getColor(item.status)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ReceiveItemResponsePage } from 'src/common/model/receive-item.model'
import { formatDate } from 'src/common/utils/converter.utils'
import { Colors } from 'src/components/ui/KStatusBadge.vue'

interface Props {
  item: ReceiveItemResponsePage
}

withDefaults(defineProps<Props>(), {})

const getColor = (status: string): Colors => {
  switch (status) {
    case 'Received':
      return 'positive'
    case 'QC Passed':
      return 'positive'
    case 'In Transit':
      return 'secondary'
    case 'Draft':
      return 'mute'
    default:
      return 'disable'
  }
}
</script>
