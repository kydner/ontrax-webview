<template>
  <div class="tw-flex tw-items-center tw-space-x-4 tw-py-4">
    <k-btn icon="img:/icons/arrow-left.svg" flat rounded size="xs" padding="none" @click="emit('back')" />
    <slot name="title">
      <div class="tw-font-semibold tw-text-lg">{{ props.headerTitle }}</div>
    </slot>
  </div>
</template>
<script setup lang="ts">
interface Props {
  headerTitle?: string
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (event: 'back'): void
}>()
</script>
