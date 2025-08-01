<template>
  <k-input
    v-bind="{ ...props }"
    v-model="currentValue"
    :for="currentFor"
    :label="props.label"
    :required="props.required"
    label-padding="none"
    :type="isPwd ? 'password' : 'text'"
  >
    <template #append>
      <q-icon class="tw-cursor-pointer" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd" />
    </template>
    <template #prepend>
      <slot name="prepend" />
    </template>
  </k-input>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import KInput, { KInputEmits, KInputProps } from 'src/components/ui/KInput.vue'

interface Props extends KInputProps {}

interface Emits extends KInputEmits {}
// interface Emit extends QInputProps
const props = withDefaults(defineProps<Props>(), {
  outlined: true,
  dense: true,
  showLabel: true,
  horizontal: false,
  horizontalAlign: 'center',
  required: false,
  labelPadding: 'small',
  color: 'secondary',
  dark: true,
})

const emit = defineEmits<Emits>()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const currentFor = computed(() => props.for || props.label)

const isPwd = ref<boolean>(true)
</script>
