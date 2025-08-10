<template>
  <div class="plus-minus-field tw-flex">
    <q-btn
      flat
      label="-"
      :repeat-timeout="1000"
      dense
      class="btn left tw-text-white"
      :disable="props.disable"
      @click="decrease"
    />
    <k-money
      v-model="currentValue"
      dense
      input-class="tw-text-right tw-py-0"
      class="tw-flex input"
      borderless
      hide-underline
      :disabled="props.disableValue"
      :precision="precision"
      decimal=","
      thousands="."
      focus-on-right
      @update:model-value="handleInputChange"
    />
    <q-btn
      flat
      label="+"
      :repeat-timeout="1000"
      dense
      class="btn right tw-text-white"
      :disable="props.disable"
      @click="increase"
    />
  </div>
</template>
<script setup lang="ts">
import { QInputProps } from 'quasar'
import { $confirm } from 'src/common/utils/plugin.utils'
import { computed } from 'vue'
import { Money3Component as kMoney } from 'v-money3'

interface Props extends Omit<QInputProps, 'modelValue'> {
  modelValue: number
  allowIncrease?: boolean
  zeroConfirm?: boolean
  disableValue?: boolean
  zeroConfirmMessage?: string
  precision?: number
}

interface Emits {
  (event: 'update:modelValue', value: Props['modelValue']): void
  (event: 'increase', currentValue: Props['modelValue']): void
  (event: 'zero:confirm'): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  allowIncrease: true,
  zeroConfirm: false,
  disableValue: false,
  precision: 0,
})

const emit = defineEmits<Emits>()

const currentValue = computed({
  get: () => Number(props.modelValue) || 0,
  set: (value) => emit('update:modelValue', value),
})

const decrease = () => {
  if (currentValue.value <= 1) {
    if (props.zeroConfirm) {
      $confirm({
        message: props.zeroConfirmMessage || 'Hapus data ini?',
        callback: (confirm) => {
          if (confirm) {
            emit('zero:confirm')
            currentValue.value = 0
          }
        },
      })
    } else {
      currentValue.value = 0
    }
  } else if (currentValue.value > 1) {
    currentValue.value--
  }
}

const increase = () => {
  emit('increase', currentValue.value)
  if (!props.allowIncrease) return
  currentValue.value++
}

const handleInputChange = (value: number | string) => {
  const to = Number(value)
  const from = currentValue.value

  if (isNaN(to)) return

  if (to === 0 && props.zeroConfirm) {
    $confirm({
      message: props.zeroConfirmMessage || 'Hapus data ini?',
      callback: (confirm) => {
        if (confirm) {
          currentValue.value = 0
          emit('zero:confirm')
        } else {
          currentValue.value = from || 1 // Kembali ke nilai sebelumnya
        }
      },
    })
  } else {
    currentValue.value = to
  }
}
</script>

<style scoped lang="scss">
.plus-minus-field {
  @apply tw-border tw-border-disable-text tw-rounded tw-flex tw-items-center tw-h-8;

  .btn {
    @apply tw-h-8 tw-min-h-0 tw-px-3 tw-text-xs tw-py-0;

    :deep(button),
    :deep(.q-btn__content) {
      @apply tw-h-full tw-flex tw-items-center tw-justify-center tw-leading-none tw-p-0 tw-m-0;
    }
  }

  .input {
    @apply tw-border-l tw-border-r tw-border-disable-text tw-w-14 tw-h-8 tw-px-1 tw-bg-transparent tw-text-right;

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
