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
        <q-field
          v-bind="{ ...props, ...field, rules: undefined }"
          v-model="currentValue"
          :for="props.for || props.label"
          :label="undefined"
          :error="!!errorMessage"
          :error-message="errorMessage"
          :clearable="isRequired ? false : props.clearable"
          :class="`${!!errorMessage ? 'tw-animate-shake-invalid' : ''}`"
          :placeholder="currentPlaceholder"
          :outlined="borderless ? false : props.outlined"
        >
          <template #label>
            <span>{{ tLabel }} &nbsp;</span>
            <span v-if="required" class="tw-text-red-600">* &nbsp;</span>
          </template>

          <template #control="{ id, modelValue, emitValue }">
            <k-money
              v-show="true"
              v-bind="{ ...props }"
              :model-value="modelValue"
              :id="id"
              :focus-on-right="true"
              class="q-field__input tw-text-left"
              @update:model-value="emitValue"
            />
          </template>
        </q-field>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { QInputProps } from 'quasar'
import { computed } from 'vue'
import { Field, RuleExpression } from 'vee-validate'
import { Money3Component as kMoney } from 'v-money3'
import { isRequiredField, validationCurrencyRules, validationRules } from 'src/common/utils/validation.utils'
import { KLabelProps } from './KLabel.vue'
import { useI18n } from 'vue-i18n'
import { CURRENCY_OPTION } from 'src/common/constants/currency.constant'
import { snakeCase } from 'lodash'

export interface KCurrencyProps extends Omit<QInputProps, 'rules' | 'masked'>, KLabelProps {
  labelInput?: boolean
  rules?: RuleExpression<unknown>
  precision?: number
  placeholder?: string
  disableNegative?: boolean
  zeroValidation?: boolean
}

export type Emits = (e: 'update:model-value', value: KCurrencyProps['modelValue']) => void

const props = withDefaults(defineProps<KCurrencyProps>(), {
  outlined: true,
  dense: true,
  showLabel: true,
  horizontalLabel: false,
  required: false,
  clearable: false,
  ...CURRENCY_OPTION,
  thousands: undefined,
  decimal: undefined,
  precision: 0,
  clearIcon: 'highlight_off',
  zeroValidation: undefined,
})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', Number(value)),
})

const isRequired = computed(() => {
  return isRequiredField(currentRules.value)
})

const currentRules = computed(() => {
  const isRequired = props.disable ? false : props.required

  return props.zeroValidation
    ? validationCurrencyRules(props.rules, isRequired)
    : validationRules(props.rules, isRequired)
})

const currentPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  const label = props.tLabel ? t(props.tLabel) : props.label
  return `${t('input')} ${label}`
})

const currentFor = computed(() => props.for || props.label)
</script>
