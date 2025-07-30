<template>
  <k-input v-bind="{ ...props }" v-model="currentValue" type="number">
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName] :key="slotName">
      <slot :name="slotName" />
    </template>
    <!-- end-prettier-ignore -->
  </k-input>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { KInputEmits, KInputProps, KInputSlots } from './KInput.vue'

const props = withDefaults(defineProps<Omit<KInputProps, 'type'>>(), {
  outlined: true,
  dense: true,
  showLabel: true,
  horizontalLabel: false,
  required: false,
  clearable: true,
  unmaskedValue: true,
  clearIcon: 'highlight_off',
})

const emit = defineEmits<KInputEmits>()

defineSlots<KInputSlots>()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})
</script>
