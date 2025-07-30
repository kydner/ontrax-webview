<template>
  <k-label
    v-bind="{ ...props }"
    :force-show-label="props.forceShowLabel"
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
        v-slot="{ errorMessage, field }"
        :rules="currentRules"
        :model-value="props.modelValue"
      >
        <div v-if="options && options?.length > 0" :class="`tw-flex ${inline ? 'tw-space-x-2' : 'tw-flex-col'}`">
          <component
            :is="component"
            v-for="option in options"
            :key="option.value"
            v-bind="{ ...props, ...field }"
            v-model="currentValue"
            :val="option.value"
            :label="option.label"
            :color="!!errorMessage ? 'negative' : props.color"
            :keep-color="!!errorMessage"
            class="k-option-group"
          >
            <template #label="data">
              <slot name="label" v-bind="{ ...data }">
                <span>{{ data?.label }}</span>
              </slot>
            </template>
          </component>
        </div>
        <div v-else class="tw-text-gray-500 tw-text-sm">{{ t('noData') }}</div>
        <div class="tw-flex items-start justify-start tw-min-h-5">
          <span
            v-if="!!errorMessage"
            class="tw-animate-shake-invalid tw-text-negative tw-text-[0.65rem] tw-font-medium"
            >{{ errorMessage }}</span
          >
        </div>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { QOptionGroupProps, QOptionGroupSlots } from 'quasar'
import { computed, onMounted } from 'vue'
import { KLabelProps, KLabelSlots } from './KLabel.vue'
import { isRequiredField, validationOptionRules } from 'src/common/utils/validation.utils'
import { Field, RuleExpression } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { snakeCase } from 'lodash'

export interface KOptionGroupProps extends QOptionGroupProps, KLabelProps {
  labelInput?: string
  placeholder?: string
  rules?: RuleExpression<unknown>
  defaultValue?: QOptionGroupProps['modelValue']
  inline?: boolean
}

export type KOptionGroupEmits = (event: 'update:model-value', value: KOptionGroupProps['modelValue']) => void

export interface KOptionGroupSlots extends QOptionGroupSlots, KLabelSlots {}

const props = withDefaults(defineProps<KOptionGroupProps>(), {
  inline: true,
  showLabel: true,
  horizontalLabel: false,
  forceShowLabel: true,
})

const emit = defineEmits<KOptionGroupEmits>()

const { t } = useI18n()

defineSlots<KOptionGroupSlots>()

const component = computed(() => {
  if (props.type === 'checkbox') return 'q-checkbox'
  else if (props.type === 'toggle') return 'q-toggle'
  return 'q-radio'
})

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const isRequired = computed(() => {
  return isRequiredField(currentRules.value)
})

const currentRules = computed(() => {
  return validationOptionRules(props.rules, props.disable ? false : props.required)
})

onMounted(() => {
  if (!props.modelValue) {
    if (props.defaultValue !== null) {
      emit('update:model-value', props.defaultValue)
    } else if (props.type === 'checkbox' && !props.defaultValue) {
      emit('update:model-value', [])
    }
  }
})
</script>

<style lang="scss">
.k-option-group {
  margin-left: -6px;
}
</style>
