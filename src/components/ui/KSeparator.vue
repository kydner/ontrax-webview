<template>
  <div v-if="title" class="tw-w-full tw-font-semibold tw-text-lg tw-text-gray-700 tw-my-2 tw-mt-6" :class="headerClass">
    <span v-if="title" :class="titleClass">{{ title }}</span>
    <div v-if="subTitle" class="tw-text-sm tw-font-normal">{{ subTitle }}</div>
  </div>
  <q-separator
    v-bind="{ ...props }"
    :color="props.color"
    :class="`${marginBottom ? 'tw-mb-6' : 'tw-mb-[1px]'}`"
  ></q-separator>

  <slot />
</template>
<script setup lang="ts">
import { QSeparatorProps } from 'quasar'
export interface KSeparatorProps extends QSeparatorProps {
  title?: string
  headerClass?: string
  titleClass?: string
  subTitle?: string
  marginBottom?: boolean
}

const props = withDefaults(defineProps<KSeparatorProps>(), {
  color: 'primary',
  size: '3px',
  marginBottom: true,
})
</script>
