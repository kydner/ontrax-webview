<template>
  <k-option-group
    v-bind="{ ...props }"
    v-model="currentValue"
    type="radio"
    :default-value="false"
    :options="[
      {
        label: t('no'),
        value: false,
      },
      {
        label: t('yes'),
        value: true,
      },
    ]"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { KOptionGroupEmits, KOptionGroupProps } from './KOptionGroup.vue'
import { useI18n } from 'vue-i18n'

export interface KSwitchProps extends KOptionGroupProps {}

export interface KSwitchEmits extends KOptionGroupEmits {}

const { t } = useI18n()

const emit = defineEmits<KOptionGroupEmits>()

const props = withDefaults(defineProps<KOptionGroupProps>(), {
  showLabel: true,
})

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})
</script>
