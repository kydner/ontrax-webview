<template>
  <q-dialog v-model="isOpen" maximized transition-duration="300" position="bottom">
    <swipe-wrapper :swipe-down="close">
      <q-card flat class="preview-check-card tw-h-[95vh] tw-overflow-y-auto">
        <!-- Header -->
        <q-card-section class="tw-relative tw-flex tw-justify-between tw-pb-0 tw-mb-0">
          <div
            class="tw-absolute tw-top-3 tw-left-1/2 -tw-translate-x-1/2 tw-w-[40px] tw-h-[3px] tw-bg-gray-300 tw-rounded-sm"
          ></div>
          <span></span>
          <q-btn dense flat round icon="close" color="white" v-close-popup @click.stop="close" />
        </q-card-section>

        <!-- Body (slot) -->
        <q-card-section>
          <barcode-scan-list />
        </q-card-section>
      </q-card>
    </swipe-wrapper>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'
import BarcodeScanList from './shared/BarcodeScanList.vue'

interface Props {
  modelValue: boolean
  title?: string
}

interface Emits {
  (e: 'update:modelValue', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Save New Item',
})

const emit = defineEmits<Emits>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const close = () => emit('update:modelValue', false)
</script>
