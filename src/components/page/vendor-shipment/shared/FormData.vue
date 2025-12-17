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
      :disable="isDisable || (form.details && form.details?.length > 0)"
      horizontal-label
      :placeholder="t('select')"
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
      :default-value="new Date().toISOString()"
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
      :default-value="new Date().toISOString()"
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
      :meta="Warehouse"
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

    <div class="tw-my-4">
      <k-file-upload
        model-value=""
        t-label="attachFile"
        borderless
        horizontal-align="base"
        :payload="{ module: 'SHIPMENT' }"
        :horizontal-label="false"
        :disable="isDisable"
        placeholder="Upload file"
        :show-label="false"
        input-class="inventory__field"
        :filename-max-length="20"
      >
      </k-file-upload>
    </div>

    <product-data-list v-model="form" :show-create-button="showCreateButton">
      <template v-if="!form.contractId" #header>
        <q-banner inline-actions class="text-white tw-bg-negative"> Fill contract field for insert product </q-banner>
      </template>
    </product-data-list>
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
import { Contract, Project, Vendor, Warehouse } from 'src/common/constants/meta.constant'
import { formatDate } from 'src/common/utils/converter.utils'
import { DATE_VALUE } from 'src/common/constants/date.constant'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import KFileUpload from 'src/components/ui/KFileUpload.vue'
import KStatusBadge from 'src/components/ui/KStatusBadge.vue'

interface Props {
  modelValue: VendorShipmentDataRequest
}

interface Emits {
  (e: 'update:modelValue', value: VendorShipmentDataRequest): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const route = useRoute()

const formId = computed(() => route.params?.id)

const showCreateButton = computed(() => {
  const contractIdExists = !!form.value.contractId
  const statusIsAcceptable = !form.value.status || form.value.status === 'IN_TRANSIT'

  return contractIdExists && statusIsAcceptable
})

const isDisable = computed(() => {
  return (['IN_TRANSIT', 'RECEIVED', 'PARTIAL_PASSED', 'QC_PASSED'] as TStatus[]).includes(form.value.status)
})

const { t } = useI18n()

const form = computed({
  get: () => props.modelValue,
  set: (value: VendorShipmentDataRequest) => emit('update:modelValue', value),
})

const getColor = (status: TStatus): Colors => {
  const qcColorMap: Partial<Record<TStatus, Colors>> = {
    RECEIVED: 'secondary',
    PARTIAL_PASSED: 'positive',
    QC_PASSED: 'positive',
  }

  const defaultColorMap: Partial<Record<TStatus, Colors>> = {
    RECEIVED: 'positive',
    IN_TRANSIT: 'secondary',
    DRAFT: 'mute',
  }
  const isQc = route.meta?.routePath === 'quality-control'
  return (isQc ? qcColorMap[status] : defaultColorMap[status]) ?? 'disable'
}

console.log(route)
</script>
