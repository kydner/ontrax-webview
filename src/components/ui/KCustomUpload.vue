<template>
  <div class="tw-flex tw-flex-col tw-gap-2">
    <label class="tw-text-gray-300 tw-text-sm">{{ label }}</label>

    <q-file
      v-model="internalValue"
      :accept="accept"
      borderless
      class="tw-w-full tw-bg-transparent tw-border tw-border-dashed tw-border-gray-600 tw-rounded-lg tw-py-4 tw-flex tw-justify-center tw-items-center hover:tw-border-gray-400"
      @update:model-value="emit('update:modelValue', internalValue)"
    >
      <div class="tw-flex tw-flex-col tw-items-center tw-text-gray-400">
        <q-icon name="attach_file" size="24px" class="tw-mb-1" />
        <span class="tw-text-sm">{{ placeholder }}</span>
      </div>
    </q-file>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: File,
  label: { type: String, default: 'Attach File' },
  placeholder: { type: String, default: 'Upload file' },
  accept: { type: String, default: '*' },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)
</script>
