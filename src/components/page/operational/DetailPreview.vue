<template>
  <q-dialog v-model="isOpen" maximized transition-duration="300" position="bottom">
    <swipe-wrapper :swipe-down="close">
      <q-card flat class="preview-check-card">
        <!-- Header -->
        <q-card-section class="tw-flex tw-justify-between tw-pb-0 tw-mb-0">
          <span class="tw-text-lg tw-font-semibold">{{ title }}</span>
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

<script setup lang="ts">
import { computed } from 'vue'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'

interface Props {
  modelValue: any | null
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
