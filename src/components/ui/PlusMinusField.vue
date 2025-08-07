<template>
  <div class="plus-minus-field tw-flex">
    <q-btn flat label="-" :repeat-timeout="1000" dense class="btn left tw-text-white" @click="decrease" />
    <q-input
      v-model="currentValue"
      type="number"
      dense
      input-class="tw-text-right tw-py-0"
      class="tw-flex input"
      borderless
      hide-underline
      disable
      @update:model-value="handleInputChange"
    />
    <q-btn flat label="+" :repeat-timeout="1000" dense class="btn right tw-text-white" @click="increase" />
  </div>
</template>
<script setup lang="ts">
import { QInputProps } from 'quasar'
import { $confirm } from 'src/common/utils/plugin.utils'
import { computed } from 'vue'

interface Props extends Omit<QInputProps, 'modelValue'> {
  modelValue: number
  allowIncrease?: boolean
}

interface Emits {
  (event: 'update:modelValue', value: Props['modelValue']): void
  (event: 'increase', currentValue: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  allowIncrease: true,
})

const emit = defineEmits<Emits>()

const currentValue = computed({
  get: () => Number(props.modelValue) || 0,
  set: (value) => emit('update:modelValue', value),
})

const decrease = () => {
  if (currentValue.value === 1) {
    $confirm({
      message: 'Yakin ingin mengubah nilai menjadi 0?',
      callback: (confirm) => {
        if (confirm) {
          currentValue.value = 0
        }
      },
    })
  } else if (currentValue.value > 1) {
    currentValue.value--
  }
}

const increase = () => {
  emit('increase', currentValue.value)
  if (!props.allowIncrease) return
  currentValue.value++
}

const handleInputChange = (value: string | number | null) => {
  const parsed = Number(value)

  // Kalau hasil parsing bukan angka valid (NaN), jangan update
  if (isNaN(parsed)) return

  if (currentValue.value === 1 && parsed === 0) {
    $confirm({
      message: 'Yakin ingin mengubah nilai menjadi 0?',
      callback: (confirm) => {
        if (confirm) {
          currentValue.value = 0
        } else {
          // Kembalikan ke 1 kalau dibatalkan
          currentValue.value = 1
        }
      },
    })
  } else {
    currentValue.value = parsed
  }
}
</script>

<style scoped lang="scss">
.plus-minus-field {
  @apply tw-border-2 tw-border-disable-text tw-rounded tw-flex tw-items-center tw-h-8;

  .btn {
    @apply tw-h-8 tw-min-h-0 tw-px-3 tw-text-xs tw-py-0;

    :deep(button),
    :deep(.q-btn__content) {
      @apply tw-h-full tw-flex tw-items-center tw-justify-center tw-leading-none tw-p-0 tw-m-0;
    }
  }

  .input {
    @apply tw-border-l-2 tw-border-r-2 tw-border-disable-text tw-w-14 tw-px-1;

    :deep(.q-field__control),
    :deep(.q-field__native),
    :deep(input) {
      @apply tw-h-8 tw-min-h-0 tw-p-0;
    }

    :deep(input[type='number']) {
      appearance: textfield;
      -moz-appearance: textfield;
    }

    :deep(input[type='number']::-webkit-outer-spin-button),
    :deep(input[type='number']::-webkit-inner-spin-button) {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
