<template>
  <q-checkbox
    v-bind="props"
    v-for="item in props.items"
    :key="item.id"
    v-model="currentValue"
    :val="item.id"
    class="k-select-card"
  >
    <div class="k-select-card__label-wrapper">
      <q-icon :name="item.icon" />
      <span class="tw-inline-flex">{{ item.label }}</span>
    </div>
  </q-checkbox>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { ProductFlowItem } from '../form/master-product/MainFlowForm.vue'

export interface KSelectCardProps {
  modelValue: any[]
  class?: string
  items: ProductFlowItem[]
  disable?: boolean
}

const props = withDefaults(defineProps<KSelectCardProps>(), {
  modelValue: () => [],
  disable: false,
})

const emit = defineEmits(['update:model-value'])

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})
</script>
<style lang="scss">
.k-select-card {
  min-height: 60px;
  @apply tw-border tw-border-line tw-rounded-base tw-px-4 tw-py-2 tw-w-full;
  &[aria-checked='true'] {
    @apply tw-border-positive
      tw-ring-2
      tw-ring-positive/20
      tw-shadow-base
      tw-shadow-positive/20;
    &:hover {
      @apply tw-bg-positive/10;
    }
  }
  &[aria-checked='false'] {
    &:hover {
      @apply tw-bg-slate-100;
    }
  }
  .q-checkbox__inner {
    @apply tw-hidden;
  }
  .q-checkbox__label {
    .k-select-card__label-wrapper {
      @apply tw-flex tw-flex-wrap tw-items-center tw-space-x-4 tw-text-gray-700 tw-font-medium;
      .q-icon {
        @apply tw-bg-positive/10 tw-text-positive tw-text-xl tw-rounded-lg tw-p-2;
      }
    }
  }
}
</style>
