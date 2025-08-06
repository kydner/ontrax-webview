<template>
  <div class="">
    <div v-if="!!formId">
      <k-status-badge :label="startCase(form?.status)" :color="getColor(form.status)" />
    </div>
    <h3 class="tw-text-lg tw-font-medium tw-mb-2">PR-9901234</h3>
    <k-date
      v-model="form.shippingDate"
      t-label="shippingDate"
      horizontal-align="base"
      horizontal-label
      borderless
      calendar-icon-size="0.85rem"
      :placeholder="t('empty')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/calendar.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-date>

    <k-date
      v-model="form.targetReceiveDate"
      t-label="targetReceiveDate"
      horizontal-align="base"
      horizontal-label
      borderless
      :placeholder="t('empty')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/calendar.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-date>

    <k-select-module
      v-model="form.vendorId"
      t-label="vendor"
      :meta="metaVendor"
      borderless
      :outline="false"
      horizontal-align="base"
      option-label="vendorName"
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
      v-model="form.warehouseId"
      t-label="warehouse"
      :meta="metaLocationWarehouse"
      borderless
      horizontal-align="base"
      horizontal-label
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
      required
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

    <k-input
      v-model="form.attachmentUrl"
      t-label="attachFile"
      borderless
      horizontal-align="base"
      horizontal-label
      :placeholder="t('empty')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/upload.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-input>

    <product-data-list />
  </div>
</template>
<script setup lang="ts" generic="T extends VendorShipmentDataRequest">
import { computed } from 'vue'
import ProductDataList from 'src/components/page/inventory/ProductDataList.vue'
import { useI18n } from 'vue-i18n'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import { useRoute } from 'vue-router'
import { startCase } from 'lodash'
import { TStatus } from 'src/common/enum/vendor-shipment.enum'
import { Colors } from 'src/components/ui/KStatusBadge.vue'
import { VendorResponsePage } from 'src/common/model/vendor.model'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { LocationWarehouse, Vendor } from 'src/common/constants/meta.constant'
import { LocationWarehouseResponsePage } from 'src/common/model/location-warehouse.model'

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

<style lang="scss">
// Target q-input langsung, karena inventory__field nempel di .q-field
.q-field.inventory__field {
  min-height: auto !important;
  height: auto !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;

  // Jika ada hint/error/counter
  &.q-field--with-bottom {
    padding-bottom: 0 !important;
  }

  // Hapus section bawah (error, hint, dsb)
  .q-field__bottom {
    display: none !important;
    padding: 0 !important;
    margin: 0 !important;
    height: 0 !important;
    min-height: 0 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  // Kontrol bagian dalam q-input
  .q-field__control,
  .q-field__inner {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    min-height: auto !important;
    height: auto !important;
  }

  .q-field__control {
    padding-left: 0 !important;
    padding-right: 0 !important;
    &::before {
      border: none !important;
    }
  }

  .q-input__control {
    line-height: 1.2 !important;
  }

  // Prepend dan Append (ikon slot atau lainnya)
  .q-field__append.q-field__marginal,
  .q-field__prepend.q-field__marginal {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    min-height: auto !important;
    height: auto !important;
    font-size: 1rem;
  }

  .q-field__control-container {
    .q-field__native {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      min-height: auto !important;
      height: auto !important;
      font-size: 1rem;
      span {
        font-size: 0.9rem !important;
      }
    }
  }

  // Khusus prepend yang pakai flex (misal icon + label)
  .q-field__prepend.q-field__marginal .tw-flex {
    padding-bottom: 0 !important;
  }

  // Atur placeholder dan input
  input {
    padding: 0 !important;
    margin: 0 !important;
    height: auto !important;
    line-height: 1.2 !important;
    font-size: inherit !important;

    // Placeholder pakai Tailwind
    &::placeholder {
      @apply tw-text-disable-text tw-font-medium tw-text-sm;
      opacity: 1 !important;
    }
  }
}
</style>
