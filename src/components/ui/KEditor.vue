<template>
  <k-label v-bind="{ ...props }" :for="props.for">
    <template #additional:prefix-label>
      <slot name="additional:prefix-label" />
    </template>

    <template #additional:suffix-label>
      <slot name="additional:suffix-label" />
    </template>

    <template #default="{ tLabel }">
      <Field
        :name="props.name || tLabel"
        :label="tLabel"
        v-slot="{ errorMessage, field }"
        :rules="currentRules"
        :model-value="props.modelValue"
      >
        <q-editor
          v-bind="{ ...props, ...field }"
          v-model="currentValue"
          :for="props.for || props.label"
          :label="props.labelInput ? tLabel : undefined"
          :error="!!errorMessage"
          :rules="undefined"
          :error-message="errorMessage"
          :clearable="isRequired ? false : props.clearable"
          :class="`${!!errorMessage ? 'tw-animate-shake-invalid' : ''}`"
        >
          <!-- prettier-ignore -->
          <template v-for="(_, slotName) in ($slots as unknown)" #[slotName] :key="slotName">
            <slot :name="slotName" />
          </template>
          <!-- end-prettier-ignore -->
        </q-editor>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { QEditorProps, QEditorSlots } from 'quasar'
import { KLabelProps, KLabelSlots } from 'src/components/ui/KLabel.vue'
import { computed } from 'vue'
import { Field, RuleExpression } from 'vee-validate'
import { validationRules, isRequiredField } from 'src/common/utils/validation.utils'

export interface KEditorProps extends Omit<QEditorProps, 'rules'>, KLabelProps {
  labelInput?: boolean
  placeholder?: string
  rules?: RuleExpression<unknown>
  name?: string
  label?: string
  clearable?: boolean
}

// interface Emit extends QInputProps
/**
 * @type {import ('components/ui/KInput.vue').props}
 */
const props = withDefaults(defineProps<KEditorProps>(), {
  outlined: true,
  dense: true,
  showLabel: true,
  horizontalLabel: false,
  required: false,
  labelWeight: 'normal',
  clearable: true,
})

const emit = defineEmits(['update:model-value'])

defineSlots<QEditorSlots & KLabelSlots>()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const isRequired = computed(() => {
  return isRequiredField(currentRules.value)
})

const currentRules = computed(() => {
  return validationRules(props.rules, props.required)
})
</script>
