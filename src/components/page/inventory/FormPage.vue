<template>
  <div class=""></div>
</template>
<script setup lang="ts" generic="T extends InventoryDataRequest">
import { InventoryDataRequest } from 'src/common/model/inventory.model'
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
