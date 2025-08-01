<template>
  <span class="tw-inline-flex tw-p-1 tw-px-3 tw-rounded-base tw-text-sm" :class="`${currentColor}`">{{
    props.label
  }}</span>
</template>
<script setup lang="ts">
import { computed } from 'vue'

export type Colors = 'secondary' | 'primary' | 'positive' | 'warning' | 'negative' | 'info' | 'disable' | 'mute'

interface KStatusBadgeProps {
  label: string | number
  color?: Colors
}

const props = withDefaults(defineProps<KStatusBadgeProps>(), {})

const currentColor = computed(() => {
  const colors = {
    secondary: 'tw-bg-secondary tw-text-white',
    primary: 'tw-bg-primary tw-text-white',
    positive: 'tw-bg-positive tw-text-white',
    warning: 'tw-bg-warning tw-text-white',
    negative: 'tw-bg-negative tw-text-white',
    info: 'tw-bg-info tw-text-white',
    disable: 'tw-bg-disable-text',
    mute: 'tw-bg-secondary-text',
  }

  return colors[props.color || 'positive']
})
</script>
