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

    <template #default="{ tLabel, screen }">
      <Field
        :name="props.name || tLabel"
        :label="tLabel"
        v-slot="{ errorMessage, field }"
        :rules="currentRules"
        :model-value="props.modelValue"
      >
        <q-file
          v-bind="{ ...props, name: field.name }"
          v-model="currentValue"
          :for="props.for || props.label"
          :label="
            screen?.lt?.md
              ? tLabel
              : props.labelInput
                ? tLabel
                : props.modelValue
                  ? undefined
                  : currentPlaceholder || ''
          "
          :error="!!errorMessage"
          :rules="undefined"
          :error-message="errorMessage"
          :clearable="isRequired ? false : props.clearable"
          :class="`${!!errorMessage ? 'tw-animate-shake-invalid' : ''}`"
          :placeholder="currentPlaceholder"
          :outlined="borderless ? false : props.outlined"
        >
          <!-- prettier-ignore -->
          <template v-for="(_, slotName) in ($slots as unknown)" #[slotName] :key="slotName">
            <slot :name="slotName" />
          </template>
          <!-- end-prettier-ignore -->
          <template #prepend>
            <q-icon name="cloud_upload" />
          </template>

          <template #append>
            <slot name="append">
              <k-btn v-if="fileId && !isMenu" icon="download" padding="none" flat @click="emit('download')" />
              <k-menu
                v-if="fileId && isMenu"
                :item-options="itemOptions"
                @downloadOriginal="emit('downloadOriginal', $event)"
              />
            </slot>
          </template>
        </q-file>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { QFileProps, QFileSlots } from 'quasar'
import { KLabelProps, KLabelSlots } from 'src/components/ui/KLabel.vue'
import { computed, onMounted } from 'vue'
import { Field, RuleExpression } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { validationFileRules, isRequiredField } from 'src/common/utils/validation.utils'
import { id } from 'src/common/interfaces/response.interface'
import { snakeCase } from 'lodash'

export interface KInputProps extends Omit<QFileProps, 'rules'>, KLabelProps {
  labelInput?: boolean
  placeholder?: string
  rules?: RuleExpression<unknown>
  defaultValue?: QFileProps['modelValue']
  fileId?: id
  fileName?: string
  isMenu?: boolean
  itemOptions?: { label: string; value: boolean }[]
}

export interface KInputEmits {
  (e: 'update:model-value', value: KInputProps['modelValue']): void
  (e: 'download', event?: Event): void
  (e: 'downloadOriginal', value: boolean): void
}

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
})

const emit = defineEmits<KInputEmits>()

defineSlots<QFileSlots & KLabelSlots>()

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
  return `${t('upload')} ${label}`
})

const isRequired = computed(() => {
  return isRequiredField(currentRules.value)
})

const currentRules = computed(() => {
  return validationFileRules(props.rules, props.disable ? false : props.required)
})

onMounted(() => {
  if (!props.modelValue) {
    if (props.defaultValue !== null) emit('update:model-value', props.defaultValue)
  }
})
</script>
