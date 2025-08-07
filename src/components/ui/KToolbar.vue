<template>
  <div class="tw-flex tw-items-center tw-space-x-4 tw-py-4">
    <k-btn icon="img:/icons/arrow-left.svg" flat rounded size="xs" padding="none" @click="emit('back')" />
    <slot name="title">
      <div v-if="props.headerTitle" class="tw-font-semibold tw-text-lg">{{ props.headerTitle }}</div>
      <q-skeleton v-else-if="loading" height="24px" width="200px" class="tw-rounded-md" />
    </slot>
  </div>
</template>
<script setup lang="ts">
interface Props {
  headerTitle?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<{
  (event: 'back'): void
}>()
</script>
