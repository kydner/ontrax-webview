<template>
  <q-option-group v-bind="{ ...props }" v-model="currentValue" class="k-radio-chip" :inline="props.inline" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { QOptionGroupProps } from 'quasar'

interface Props extends QOptionGroupProps {}

export type Emits = (e: 'update:model-value', value: Props['modelValue']) => void

const props = withDefaults(defineProps<Props>(), {
  inline: true,
})

const emit = defineEmits<Emits>()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})
</script>

<style lang="scss">
.k-radio-chip {
  div {
    .q-radio {
      @apply tw-p-1 tw-px-4 tw-font-semibold tw-text-gray-600;
      &[aria-checked='true'] {
        @apply tw-border tw-border-primary tw-rounded-full tw-text-primary;
      }
      .q-radio__inner {
        @apply tw-hidden;
      }
    }
  }
}
</style>
