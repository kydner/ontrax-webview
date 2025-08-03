<template>
  <div class="shadow-2 row">
    <q-btn
      flat
      label="-"
      :repeat-timeout="1000"
      @click="
        () => {
          currentValue -= 1
        }
      "
    />
    <q-input type="number" class="col" align="right" hide-underline v-model="currentValue" />
    <q-btn
      flat
      label="+"
      :repeat-timeout="1000"
      @click="
        () => {
          currentValue += 1
        }
      "
    />
  </div>
</template>
<script setup lang="ts">
import { QInputProps } from 'quasar'
import { computed } from 'vue'

interface Props extends Omit<QInputProps, 'modelValue'> {
  modelValue: number
}

interface Emits {
  (event: 'update:modelValue', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
})

const emit = defineEmits<Emits>()

const currentValue = computed({
  get: () => props.modelValue || 0,
  set: (value) => emit('update:modelValue', value),
})
</script>
