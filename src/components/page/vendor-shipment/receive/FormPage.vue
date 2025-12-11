<template>
  <div class="">
    <div class="tw-my-4">
      <k-label v-if="!!formId" t-label="status" horizontal-label horizontal-align="base">
        <template #label>
          <k-status-badge :label="startCase(form?.status)" :color="getColor(form.status)" />
        </template>
        <k-popup-edit
          v-model="form.notes"
          t-label="remark"
          :show-label="false"
          horizontal-label
          :placeholder="t('inputRemark')"
          input-class="inventory__field"
        >
          <template #default="scope">
            <k-text-area
              v-model="scope.value"
              t-label="note"
              :disable="!['DRAFT', 'IN_TRANSIT'].includes(form.status) || form.status === undefined"
              :show-label="false"
            />
          </template>
          <template #preview:prefix>
            <q-icon name="img:/icons/edit__secondary-text.svg" size="1rem" class="tw-pb-1 tw-pr-2" />
          </template>
        </k-popup-edit>
      </k-label>
      <k-popup-edit
        v-else
        v-model="form.notes"
        t-label="remark"
        horizontal-label
        :placeholder="t('inputRemark')"
        input-class="inventory__field"
      >
        <template #default="scope">
          <k-text-area v-model="scope.value" t-label="note" :show-label="false" />
        </template>
        <template #preview:prefix>
          <q-icon name="img:/icons/edit__secondary-text.svg" size="1rem" class="tw-pb-1 tw-pr-2" />
        </template>
      </k-popup-edit>
    </div>

    <k-select-module
      v-model="form.warehouseId"
      t-label="Project"
      :meta="metaLocationWarehouse"
      borderless
      horizontal-align="base"
      horizontal-label
      required
      behavior="menu"
      :disable="isDisable"
      :outlined="false"
      option-label="warehouseName"
      option-value="locationWarehouseId"
      :placeholder="t('empty')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/home.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-select-module>

    <k-select-module
      v-model="form.vendorId"
      t-label="vendor"
      :meta="metaVendor"
      borderless
      :outline="false"
      horizontal-align="base"
      option-label="vendorName"
      behavior="menu"
      required
      :disable="isDisable"
      option-value="vendorId"
      horizontal-label
      :placeholder="t('empty')"
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
      v-model="form.vendorId"
      t-label="Contract"
      :meta="metaVendor"
      borderless
      :outline="false"
      horizontal-align="base"
      option-label="vendorName"
      behavior="menu"
      required
      :disable="isDisable"
      option-value="vendorId"
      horizontal-label
      :placeholder="t('empty')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/user.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
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
      :placeholder="t('empty')"
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
      v-model="form.targetReceiveDate"
      t-label="targetReceiveDate"
      horizontal-align="base"
      :options="(date: string) => date >= formatDate(new Date().toISOString(), { format: DATE_VALUE })"
      horizontal-label
      borderless
      required
      :disable="isDisable"
      :placeholder="t('empty')"
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
      v-if="['IN_TRANSIT', 'RECEIVED', 'PARTIAL_PASSED', 'QC_PASSED'].includes(form.status)"
      v-model="form.receiveDate"
      t-label="receiveDate"
      horizontal-align="base"
      horizontal-label
      borderless
      :disable="['RECEIVED'].includes(form.status)"
      :default-value="new Date().toISOString()"
      required
      :placeholder="t('empty')"
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
      :meta="metaLocationWarehouse"
      borderless
      horizontal-align="base"
      horizontal-label
      required
      behavior="menu"
      :disable="isDisable"
      :outlined="false"
      option-label="warehouseName"
      option-value="locationWarehouseId"
      :placeholder="t('empty')"
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

    <k-file-upload
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
    </k-file-upload>

    <product-data-list v-model="form" />
  </div>
</template>
<script setup lang="ts" generic="T extends VendorShipmentDataRequest">
import { computed } from 'vue'
import ProductDataList from '../ProductDataList.vue'
import { useI18n } from 'vue-i18n'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import { useRoute } from 'vue-router'
import { startCase } from 'lodash'
import { TStatus } from 'src/common/enum/operational.enum'
import { Colors } from 'src/components/ui/KStatusBadge.vue'
import { VendorResponsePage } from 'src/common/model/vendor.model'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { LocationWarehouse, Vendor } from 'src/common/constants/meta.constant'
import { LocationWarehouseResponsePage } from 'src/common/model/location-warehouse.model'
import { formatDate } from 'src/common/utils/converter.utils'
import { DATE_VALUE } from 'src/common/constants/date.constant'
import KFileUpload from 'src/components/ui/KFileUpload.vue'
import KPopupEdit from 'src/components/ui/KPopupEdit.vue'
interface Props {
  modelValue: T
}

interface Emits {
  (e: 'update:modelValue', value: T): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const route = useRoute()

const metaVendor: IMetaListModule<VendorResponsePage> = Vendor

const metaLocationWarehouse: IMetaListModule<LocationWarehouseResponsePage> = LocationWarehouse

const formId = computed(() => route.params?.id)

const isDisable = computed(() => {
  return (['IN_TRANSIT', 'RECEIVED', 'PARTIAL_PASSED', 'QC_PASSED'] as TStatus[]).includes(form.value.status)
})

const { t } = useI18n()

const form = computed({
  get: () => props.modelValue,
  set: (value: T) => emit('update:modelValue', value),
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
