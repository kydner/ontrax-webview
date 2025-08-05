<template>
  <div class="">
    <h3 class="tw-text-lg tw-font-medium tw-mb-2">PR-9901234</h3>
    <k-date
      v-model="currentValue.code"
      t-label="shippingDate"
      horizontal-align="base"
      horizontal-label
      borderless
      required
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

    <k-input
      v-model="currentValue.code"
      t-label="targetReceiveDate"
      horizontal-align="base"
      horizontal-label
      required
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
    </k-input>

    <k-select
      v-model="currentValue.code"
      t-label="vendor"
      borderless
      :outline="false"
      horizontal-align="base"
      horizontal-label
      required
      :placeholder="t('empty')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/user.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-select>

    <k-select
      v-model="currentValue.code"
      t-label="warehouse"
      borderless
      horizontal-align="base"
      horizontal-label
      required
      :placeholder="t('empty')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/home.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-select>
    <k-select
      v-model="currentValue.code"
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
    </k-select>

    <k-select
      v-model="currentValue.code"
      t-label="attachFile"
      borderless
      horizontal-align="base"
      horizontal-label
      required
      :placeholder="t('empty')"
      input-class="inventory__field"
    >
      <template #additional:prefix-label>
        <q-icon name="img:/icons/upload.svg" size="0.85rem" class="tw-pb-1 tw-pr-2" />
      </template>

      <template #label="{ label }">
        <span class="tw-text-secondary-text tw-text-xs">{{ label }}</span>
      </template>
    </k-select>

    <product-data-list />
  </div>
</template>
<script setup lang="ts" generic="T extends InventoryDataRequest">
import { InventoryDataRequest } from 'src/common/model/inventory.model'
import { computed } from 'vue'
import ProductDataList from './ProductDataList.vue'
import { useI18n } from 'vue-i18n'

interface Props {
  modelValue: T
}

interface Emits {
  (e: 'update:modelValue', value: T): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value: T) => emit('update:modelValue', value),
})
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
