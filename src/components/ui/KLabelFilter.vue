<template>
  <label :for="props.label">
    <h3 class="tw-font-semibold tw-pb-0 tw-text-gray-700">
      {{ currentLabel }}
    </h3>
    <slot />
  </label>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  label: string
  tLabel?: string
}

const props = withDefaults(defineProps<Props>(), {})

const { t } = useI18n()

const currentLabel = computed(() => {
  if (props.tLabel) return t(props.tLabel)
  return props.label
})
</script>
