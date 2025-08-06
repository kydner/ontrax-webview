<template>
  <k-label
    v-bind="{ ...props }"
    :for="currentFor"
    :required="isRequired"
    :class="`target-section-${props.name || snakeCase(props.tLabel)}`"
  >
    <template #additional:prefix-label>
      <slot name="additional:prefix-label" />
    </template>

    <template #label="{ label }">
      <slot name="label" :label="label" />
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
        <q-input
          v-bind="{ ...props, ...field }"
          v-model="currentValue"
          :for="props.for || props.label"
          :label="undefined"
          :error="!!errorMessage"
          :rules="undefined"
          :error-message="errorMessage"
          :clearable="isRequired ? false : props.clearable"
          :class="`${!!errorMessage ? 'tw-animate-shake-invalid' : ''} ${!!errorMessage ? 'show-error' : ''} ${inputClass}`"
          :placeholder="currentPlaceholder"
          :outlined="borderless ? false : props.outlined"
        >
          <!-- prettier-ignore -->
          <template v-for="(_, slotName) in ($slots as unknown)" #[slotName] :key="slotName">
            <slot :name="slotName" />
          </template>
          <!-- end-prettier-ignore -->

          <template #label>
            <span>{{ tLabel }} &nbsp;</span>
            <span v-if="required" class="tw-text-red-600">* &nbsp;</span>
          </template>
        </q-input>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { QInputProps, QInputSlots } from 'quasar'
import { KLabelProps, KLabelSlots } from 'src/components/ui/KLabel.vue'
import { computed, onMounted } from 'vue'
import { Field, RuleExpression } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { validationRules, isRequiredField } from 'src/common/utils/validation.utils'
import { snakeCase } from 'lodash'

export interface KInputProps extends Omit<QInputProps, 'rules'>, KLabelProps {
  labelInput?: boolean
  placeholder?: string
  rules?: RuleExpression<unknown>
  defaultValue?: QInputProps['modelValue']
  inputClass?: string
}

export type KInputEmits = (e: 'update:model-value', value: KInputProps['modelValue']) => void

export type KInputSlots = QInputSlots & KLabelSlots

// interface Emit extends QInputProps
/**
 * @type {import ('components/ui/KInput.vue').props}
 */
const props = withDefaults(defineProps<KInputProps>(), {
  outlined: true,
  dense: true,
  showLabel: true,
  horizontalLabel: false,
  required: false,
  clearable: true,
  unmaskedValue: true,
  clearIcon: 'highlight_off',
  color: 'secondary',
  dark: true,
})

const emit = defineEmits<KInputEmits>()

defineSlots<KInputSlots>()

const { t } = useI18n()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const currentFor = computed(() => props.for || props.label)

const currentPlaceholder = computed(() => {
  if (props.labelInput) return null
  if (props.placeholder) return props.placeholder
  const label = props.tLabel ? t(props.tLabel) : props.label
  return `${t('input')} ${label}`
})

const isRequired = computed(() => {
  return isRequiredField(currentRules.value)
})

const currentRules = computed(() => {
  return validationRules(props.rules, props.disable ? false : props.required)
})

onMounted(() => {
  if (!props.modelValue) {
    if (props.defaultValue !== null) emit('update:model-value', props.defaultValue)
  }
})
</script>
