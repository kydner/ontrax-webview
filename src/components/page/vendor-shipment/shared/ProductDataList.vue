<template>
  <div class="tw-my-4 tw-min-h-[60vh]">
    <slot name="header"></slot>
    <k-btn v-if="showCreateButton" color="secondary" label="Add Product" @click="handleProductPick" />

    <template v-if="routePath === 'quality-control'">
      <template v-if="form.status === 'RECEIVED'">
        <product-data-list-received-qc v-model="form" @preview="handlePreview" />
      </template>
      <template v-else-if="form.status === 'QC_PASSED'">
        <product-data-list-qc-passed v-model="form" @preview="handlePreview" />
      </template>
    </template>
    <template v-else>
      <template v-if="!form.status || form.status === 'DRAFT'">
        <product-data-list-draft v-model="form" @preview="handlePreview" />
      </template>
      <template v-else-if="form.status === 'IN_TRANSIT'">
        <product-data-list-in-transit v-model="form" @preview="handlePreview" />
      </template>
      <template v-else-if="form.status === 'RECEIVED'">
        <product-data-list-received v-model="form" @preview="handlePreview" />
      </template>
    </template>

    <div v-if="details?.length === 0" class="tw-my-4 tw-text-disable-text">
      <k-lottie
        animation-link="/lotties/no_data.json"
        auto-play
        loop
        renderer="svg"
        class="tw-w-52 tw-h-5tw-w-52 tw-overflow-hidden tw-block"
      />
    </div>
  </div>

  <!-- PREVIEW DIALOG -->
  <detail-preview v-model="previewItem">
    <template #default="{ item }">
      <!-- DETAIL DEFAULT -->
      <div>
        <div class="tw-col-span-12 tw-flex tw-space-x-4">
          <product-image :item-id="item.productId || ''" size="60px" />
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-semibold tw-text-lg">{{ item.productName || '-' }}</span>
            <span>{{ item.srtPartNumber || '-' }}</span>
          </div>
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyOrdered') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          <!-- {{ format(item.qtyOrdered, { precision: 0 }) || '-' }} -->
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyReceive') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          <!-- {{ format(item.qtyReceived, { precision: 0 }) || '-' }} -->
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('attachFile') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          <!-- <attachment-file-preview :attachment-info="item?.attachmentInfo" /> -->
        </div>

        <div class="tw-col-span-12 tw-py-2">
          <div class="tw-text-secondary-text tw-text-xs">Remark Good Receive</div>
          <div>
            {{ item.notes || '-' }}
          </div>
        </div>
      </div>
    </template>
  </detail-preview>
</template>
<script setup lang="ts">
import { bus } from 'src/common/event-bus'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import DetailPreview from 'src/components/page/operational/DetailPreview.vue'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import { VendorShipmentDetailResponse } from 'src/common/model/vendor-shipment-detail.model'
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

const { t } = useI18n()

const route = useRoute()

const routePath = computed(() => route?.meta?.routePath)

const previewItem = ref<VendorShipmentDetailResponse | null>(null)

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

const handlePreview = (item: VendorShipmentDetailResponse) => {
  previewItem.value = item
}
</script>
