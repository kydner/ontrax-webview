<template>
  <div class="tw-flex tw-items-start tw-justify-between tw-cursor-pointer" v-ripple @click.stop="handleClick">
    <div class="tw-basis-7/12">
      <div class="tw-flex tw-flex-col tw-space-y-2">
        <div class="tw-font-semibold">{{ item?.transferNumber }}</div>
        <div class="tw-flex tw-flex-col tw-space-y-2">
          <div class="tw-flex tw-flex-col tw-space-y-1 tw-basis-auto">
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="img:/icons/upload-box__primary.svg" color="primary" />
              <span class="tw-text-xs tw-text-secondary-text"
                >{{ t('from') }} {{ item?.fromLocationWarehouseName }}</span
              >
            </div>
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="img:/icons/download__primary.svg" color="primary" />
              <span class="tw-text-xs tw-text-secondary-text">{{ t('to') }} {{ item?.toLocationWarehouseName }}</span>
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
import { ReceiveItemResponsePage } from 'src/common/model/receive-item.model'
import { format, formatDate } from 'src/common/utils/converter.utils'
import { Colors } from 'src/components/ui/KStatusBadge.vue'
import { useI18n } from 'vue-i18n'

interface Props {
  item: ReceiveItemResponsePage
  loading?: boolean
}

interface Emits {
  (e: 'click', data: { item: ReceiveItemResponsePage }): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {})

const { t } = useI18n()

const getColor = (status: TStatus): Colors => {
  switch (status) {
    case 'QC_RECEIVE':
      return 'warning'
    case 'QC_PASSED':
      return 'positive'
    case 'PARTIAL_PASSED':
      return 'positive'

    default:
      return 'disable'
  }
}

const handleClick = () => {
  if (props.loading) return
  emit('click', { item: props.item })
}
</script>
