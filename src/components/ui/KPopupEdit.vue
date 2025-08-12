<template>
  <k-label
    v-bind="{ ...props }"
    :for="currentFor"
    :required="isRequired"
    :class="`target-section-${props.name || snakeCase(props.tLabel)} tw-relative`"
  >
    <template #additional:prefix-label>
      <slot name="additional:prefix-label" />
    </template>

    <template #label="{ label }">
      <slot name="label" :label="label">
        <span class="tw-text-secondary-text">{{ label }}</span>
      </slot>
    </template>

    <template #additional:suffix-label>
      <slot name="additional:suffix-label" />
    </template>

    <template #default="{ tLabel }">
      <Field
        :name="tLabel"
        :label="tLabel"
        v-slot="{ errorMessage, field }"
        :rules="currentRules"
        :model-value="props.modelValue"
      >
        <slot name="prefix:value"></slot>
        <div v-if="!currentValue" class="preview-label tw-text-disable-text">
          <slot name="preview:prefix"></slot>
          <span class="tw-text-disable-text">{{ currentPlaceholder }}</span>
        </div>

        <div v-else class="preview-label tw-text-white">
          <slot name="preview:prefix"></slot>
          <span>{{ previewValue || currentValue }}</span>
          <k-btn
            v-if="isRequired ? false : props.clearable"
            flat
            icon="img:/icons/x-square.svg"
            padding="none"
            size="sm"
            @click.stop="currentValue = null"
          />
        </div>
        <q-popup-edit
          v-bind="{ ...props, ...field }"
          v-model="currentValue"
          :title="tLabel"
          buttons
          v-slot="scope"
          cover
          fit
          flat
          bordered
          dark
          style="width: 100%"
        >
          <slot v-bind="scope" />
        </q-popup-edit>
        <div v-if="!!errorMessage" class="tw-text-negative tw-text-[11px] tw-font-thin">{{ errorMessage }}</div>
      </Field>
    </template>
  </k-label>
</template>

<script setup lang="ts">
import { computed, onMounted, VNode } from 'vue'
import { useI18n } from 'vue-i18n'
import { Field, RuleExpression } from 'vee-validate'
import { snakeCase } from 'lodash'
import { validationRules, isRequiredField } from 'src/common/utils/validation.utils'
import { QPopupEditProps, QPopupEditSlots } from 'quasar'
import { KLabelProps, KLabelSlots } from 'src/components/ui/KLabel.vue'

export interface KPopupEditProps extends Omit<QPopupEditProps, 'rules'>, KLabelProps {
  labelInput?: boolean
  placeholder?: string
  rules?: RuleExpression<unknown>
  defaultValue?: QPopupEditProps['modelValue']
  name?: string
  label?: string
  clearable?: boolean
  previewValue?: string | number | boolean | null | undefined
}

const props = withDefaults(defineProps<KPopupEditProps>(), {
  outlined: true,
  dense: true,
  showLabel: true,
  horizontalLabel: false,
  required: false,
  clearable: true,
  horizontalAlign: 'base',
  unmaskedValue: true,
  clearIcon: 'highlight_off',
  color: 'secondary',
  dark: true,
})

const emit = defineEmits<(e: 'update:model-value', value: unknown) => void>()

defineSlots<KLabelSlots & QPopupEditSlots & { 'preview:prefix': () => VNode; 'prefix:value': () => VNode }>()

const { t } = useI18n()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const currentFor = computed(() => props.for || props.label)

const currentPlaceholder = computed(() => {
  if (props.labelInput) return null
  if (props.placeholder) return props.placeholder
  return t('empty')
})

const isRequired = computed(() => isRequiredField(currentRules.value))

const currentRules = computed(() => validationRules(props.rules, !props.disable && props.required))

onMounted(() => {
  if (!props.modelValue && props.defaultValue != null) {
    emit('update:model-value', props.defaultValue)
  }
})
</script>

<style scoped lang="scss">
.preview-label {
  @apply tw-flex tw-items-center tw-space-x-2 tw-cursor-pointer tw-my-[0.115rem];
}
</style>
