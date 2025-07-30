<template>
  <k-label
    v-bind="{ ...props }"
    :show-label="false"
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
        as=""
        :name="props.name || tLabel"
        :rules="currentRules"
        :validate-on-blur="false"
        :validate-on-mount="true"
        v-slot="{ errorMessage, field }"
        :model-value="props.modelValue"
      >
        <q-checkbox
          v-bind="{ ...props, ...field }"
          ref="qCheckboxRef"
          :label="tLabel"
          v-model="currentValue"
          :color="!!errorMessage ? 'negative' : props.color"
          :keep-color="!!errorMessage"
          class="k-checkbox"
        >
        </q-checkbox>
        <div class="tw-flex items-start justify-start tw-min-h-5">
          <span v-if="!!errorMessage" class="tw-text-negative tw-text-[0.65rem] tw-font-medium">{{
            errorMessage
          }}</span>
        </div>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { QCheckboxProps, QCheckbox, QCheckboxSlots } from 'quasar'
import { ref, computed } from 'vue'
import { KLabelProps, KLabelSlots } from './KLabel.vue'
import { isRequiredField, validationOptionRules } from 'src/common/utils/validation.utils'
import { Field, RuleExpression } from 'vee-validate'
import { snakeCase } from 'lodash'

export interface KCheckbox extends Omit<QCheckboxProps, 'val'>, Omit<KLabelProps, 'showLabel'> {
  labelInput?: string
  placeholder?: string
  rules?: RuleExpression<unknown>
  modelValue: QCheckboxProps['modelValue']
  val?: QCheckboxProps['val']
}

export type KOptionGroupEmits = (event: 'update:model-value', value: KCheckbox['modelValue']) => void

export interface KOptionGroupSlots extends QCheckboxSlots, Omit<KLabelSlots, 'default'> {}

const props = withDefaults(defineProps<KCheckbox>(), {
  inline: true,
  showLabel: true,
  horizontalLabel: false,
  required: false,
})

const emit = defineEmits<KOptionGroupEmits>()

defineSlots<KOptionGroupSlots>()

const qCheckboxRef = ref<InstanceType<typeof QCheckbox>>()

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
</script>
