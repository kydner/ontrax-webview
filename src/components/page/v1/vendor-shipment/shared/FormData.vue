<template>
  <div class="">
    <div class="tw-my-4">
      <k-label v-if="!!formId" t-label="status" horizontal-label horizontal-align="base">
        <template #label>
          <k-status-badge :label="startCase(form?.status)" :color="getColor(form.status)" />
        </template>
      </k-label>
    </div>

    <k-select-module
      v-model="form.projectId"
      t-label="project"
      :meta="Project"
      borderless
      horizontal-align="base"
      horizontal-label
      required
      behavior="menu"
      :disable="isDisable"
      :outlined="false"
      option-label="projectName"
      option-value="id"
      :placeholder="t('select')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/briefcase__grey.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-select-module>

    <k-select-module
      v-model="form.vendorId"
      t-label="vendor"
      :meta="Vendor"
      borderless
      :outline="false"
      horizontal-align="base"
      option-label="vendorClientName"
      option-value="id"
      behavior="menu"
      required
      :disable="isDisable"
      horizontal-label
      :placeholder="t('select')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/user.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-select-module>
    <k-select-module
      v-model="form.contractId"
      t-label="contract"
      :meta="Contract"
      borderless
      :outline="false"
      horizontal-align="base"
      option-label="contractNumber"
      option-value="id"
      behavior="menu"
      required
      :disable="isDisable"
      horizontal-label
      :placeholder="t('empty')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/file-text__grey.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-select-module>

    <k-date
      v-model="form.shippingDate"
      t-label="shippingDate"
      horizontal-align="base"
      horizontal-label
      required
      borderless
      :disable="isDisable"
      :placeholder="t('select')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/calendar__secondary-text.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-date>

    <k-date
      v-model="form.targetShipmentDate"
      t-label="targetShipmentDate"
      horizontal-align="base"
      :options="(date: string) => date >= formatDate(new Date().toISOString(), { format: DATE_VALUE })"
      horizontal-label
      borderless
      required
      :disable="isDisable"
      :placeholder="t('select')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/calendar__secondary-text.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-date>

    <k-select-module
      v-model="form.warehouseId"
      t-label="warehouse"
      :meta="WarehouseSite"
      borderless
      :outline="false"
      horizontal-align="base"
      option-label="locationName"
      option-value="id"
      behavior="menu"
      required
      :disable="isDisable"
      horizontal-label
      :placeholder="t('select')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/home.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-select-module>

    <k-input
      v-model="form.referenceNumber"
      t-label="refNumber"
      borderless
      horizontal-align="base"
      horizontal-label
      :disable="isDisable"
      :placeholder="t('empty')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/hash.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-input>

    <!-- <k-file-upload
      v-model="form.attachmentId"
      t-label="attachFile"
      borderless
      horizontal-align="base"
      :payload="{ module: 'SHIPMENT' }"
      :horizontal-label="false"
      :disable="isDisable"
      placeholder="Upload file"
      input-class="inventory__field"
      :attachment-info="form.attachmentInfo"
      :filename-max-length="20"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/upload.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-file-upload> -->

    <product-data-list v-model="form" :show-create-button="!!form.contractId" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import ProductDataList from './ProductDataList.vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { startCase } from 'lodash'
import { TStatus } from 'src/common/enum/operational.enum'
import { Colors } from 'src/components/ui/KStatusBadge.vue'
import { Contract, Project, Vendor, WarehouseSite } from 'src/common/constants/meta.constant'
import { formatDate } from 'src/common/utils/converter.utils'
import { DATE_VALUE } from 'src/common/constants/date.constant'
import { VendorShipmentV1DataRequest } from 'src/common/model/vendor-shipment-v1.model'
interface Props {
  modelValue: VendorShipmentV1DataRequest
}

interface Emits {
  (e: 'update:modelValue', value: VendorShipmentV1DataRequest): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const route = useRoute()

const formId = computed(() => route.params?.id)

const isDisable = computed(() => {
  return (['IN_TRANSIT', 'RECEIVED', 'PARTIAL_PASSED', 'QC_PASSED'] as TStatus[]).includes(form.value.status)
})

const { t } = useI18n()

const form = computed({
  get: () => props.modelValue,
  set: (value: VendorShipmentV1DataRequest) => emit('update:modelValue', value),
})

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
</script>
