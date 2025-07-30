<template>
  <k-input v-bind="{ ...props }" v-model="currentValue" :for="currentFor" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { KInputEmits, KInputProps } from './KInput.vue'
import { QInputSlots } from 'quasar'
import { KLabelSlots } from './KLabel.vue'
import { MASK_NPWP } from 'src/common/constants/mask-input.constant'

export interface KInputTaxProps extends KInputProps {}

export interface KInputTaxEmits extends KInputEmits {}
// interface Emit extends QInputProps
const props = withDefaults(defineProps<KInputTaxProps>(), {
  outlined: true,
  dense: true,
  showLabel: true,
  horizontal: false,
  horizontalAlign: 'center',
  required: false,
  mask: MASK_NPWP,
  unmaskedValue: true,
})

const emit = defineEmits<KInputTaxEmits>()

defineSlots<QInputSlots & KLabelSlots>()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const currentFor = computed(() => props.for || props.label)
</script>
