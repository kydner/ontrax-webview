<template>
  <q-dialog v-model="isOpen" maximized transition-duration="300" position="bottom">
    <swipe-wrapper :swipe-down="close">
      <q-card flat class="preview-check-card tw-overflow-y-auto">
        <!-- Header -->
        <q-card-section class="tw-relative tw-flex tw-justify-between tw-pb-0 tw-mb-0">
          <div
            class="tw-absolute tw-top-3 tw-left-1/2 -tw-translate-x-1/2 tw-w-[40px] tw-h-[3px] tw-bg-gray-300 tw-rounded-sm"
          ></div>
          <span></span>
          <q-btn dense flat round icon="close" color="white" v-close-popup @click="close" />
        </q-card-section>

        <!-- Body (slot) -->
        <q-card-section v-if="modelValue">
          <slot :item="modelValue"></slot>
        </q-card-section>
      </q-card>
    </swipe-wrapper>
  </q-dialog>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'

interface Props {
  modelValue: T | null
  title?: string
}

interface Emits {
  (e: 'update:modelValue', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Detail',
})

const emit = defineEmits<Emits>()

const isOpen = computed({
  get: () => props.modelValue !== null,
  set: (val: boolean) => {
    if (!val) emit('update:modelValue', null)
  },
})

const close = () => emit('update:modelValue', null)
</script>

<style scoped lang="scss">
.preview-check-card {
  @apply tw-overflow-y-auto;
  overflow: hidden;

  &:hover {
    overflow: auto;
  }

  &::-webkit-scrollbar {
    @apply tw-w-2;
  }

  &::-webkit-scrollbar-track {
    @apply tw-bg-transparent;
  }

  &::-webkit-scrollbar-thumb {
    @apply tw-rounded-full tw-bg-disable-text tw-shadow-lg;
  }
}
</style>
