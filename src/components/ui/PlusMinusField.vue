<template>
  <div class="plus-minus-field tw-flex">
    <q-btn
      flat
      label="-"
      :repeat-timeout="1000"
      dense
      class="btn left tw-text-white"
      @click="
        () => {
          currentValue -= 1
        }
      "
    />
    <q-input
      v-model="currentValue"
      type="number"
      dense
      input-class="tw-text-right tw-py-0"
      class="tw-flex input"
      borderless
      hide-underline
    />
    <q-btn
      flat
      label="+"
      :repeat-timeout="1000"
      dense
      class="btn right tw-text-white"
      @click="
        () => {
          currentValue += 1
        }
      "
    />
  </div>
</template>
<script setup lang="ts">
import { QInputProps } from 'quasar'
import { computed } from 'vue'

interface Props extends Omit<QInputProps, 'modelValue'> {
  modelValue: number
}

interface Emits {
  (event: 'update:modelValue', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
})

const emit = defineEmits<Emits>()

const currentValue = computed({
  get: () => props.modelValue || 0,
  set: (value) => emit('update:modelValue', value),
})
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
