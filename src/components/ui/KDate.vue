<template>
  <k-label
    v-bind="{ ...props }"
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
        :model-value="currentValue"
        :validate-on-mount="false"
      >
        <q-input
          :model-value="previewDate"
          readonly
          :filled="props.filled"
          :stack-label="props.stackLabel"
          :dense="props.dense"
          clear-icon="highlight_off"
          :label="undefined"
          class="k-date__q-input"
          :error="!!errorMessage"
          :error-message="errorMessage"
          :class="`${!!errorMessage ? 'tw-animate-shake-invalid' : ''} ${!!errorMessage ? 'show-error' : ''} ${inputClass}`"
          :placeholder="props.stackLabel ? undefined : currentPlaceholder"
          :disable="disable"
          :outlined="borderless ? false : props.outlined"
          :borderless="props.borderless"
          :hint="hint"
          @click="onInputClick"
        >
          <template #label>
            <span>{{ tLabel }} &nbsp;</span>
            <span v-if="required" class="tw-text-red-600">* &nbsp;</span>
          </template>

          <template #prepend>
            <div class="tw-flex tw-items-center tw-pb-[0.45rem]">
              <div class="tw-flex-auto">
                <q-icon
                  v-if="!(props.disable && props.borderless)"
                  name="img:/icons/calendar.svg"
                  class="cursor-pointer"
                  color="grey-5"
                  :size="calendarIconSize"
                >
                  <q-popup-proxy ref="popupProxyRef" cover transition-show="scale" transition-hide="scale" for>
                    <q-date
                      v-model="dateValue"
                      v-bind="field"
                      landscape
                      :default-year-month="
                        props.defaultYearMonth
                          ? props.defaultYearMonth
                          : formatDate(new Date()?.toISOString(), { format: DATE_VALUE })
                      "
                      today-btn
                      :options="props.options"
                      color="secondary"
                      @update:model-value="onDateChange"
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="secondary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </div>
            </div>
          </template>

          <template #append>
            <div v-if="isClearable" class="tw-flex-auto tw-mb-1">
              <k-btn
                icon="highlight_off"
                dense
                size="0.6rem"
                flat
                rounded
                padding="none"
                class="tw-text-secondary-text/60"
                @click="emit('update:model-value', null)"
              />
            </div>
          </template>
        </q-input>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { QDateProps, QInputProps } from 'quasar'
import { KLabelProps } from 'src/components/ui/KLabel.vue'
import { computed, ref } from 'vue'
import { Field, RuleExpression } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { isIsoStringDate, isRequiredField, validationRules } from 'src/common/utils/validation.utils'
import { DATE_PREVIEW, DATE_VALUE, DATE_ISO } from 'src/common/constants/date.constant'
import { snakeCase } from 'lodash'
import { formatDate } from 'src/common/utils/converter.utils'

export interface KDateProps extends Omit<QDateProps, 'rules' | 'clearable' | 'modelValue'>, KLabelProps {
  labelInput?: boolean
  outlined?: boolean
  filled?: boolean
  modelValue?: string | null
  placeholder?: string
  stackLabel?: boolean
  dense?: boolean
  rules?: RuleExpression<unknown>
  borderless?: boolean
  hint?: QInputProps['hint']
  inputClass?: string
  calendarIconSize?: string
}

export type KDateEmits = (e: 'update:model-value', value: KDateProps['modelValue']) => void

const props = withDefaults(defineProps<KDateProps>(), {
  showLabel: true,
  horizontalLabel: false,
  horizontalAlign: 'center',
  required: false,
  outlined: true,
  dense: true,
  borderless: false,
  dark: true,
  calendarIconSize: '20px',
})

const emit = defineEmits<KDateEmits>()

const { t } = useI18n()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value ? formatDate(value, { format: DATE_ISO }) : undefined)
  },
})

const dateValue = computed(() =>
  currentValue.value ? formatDate(currentValue.value, { format: DATE_VALUE }) : undefined,
)

const previewDate = computed(() => {
  return currentValue.value && isIsoStringDate(currentValue.value)
    ? formatDate(currentValue.value, {
        format: DATE_PREVIEW,
      })
    : currentValue.value
})

const popupProxyRef = ref()

const currentPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  const label = props.tLabel ? t(props.tLabel) : props.tLabel
  return `${t('input')} ${label}`
})

const isRequired = computed(() => {
  return isRequiredField(currentRules.value)
})

const isClearable = computed(() => {
  return isRequired.value ? false : !!currentValue.value
})

const currentRules = computed(() => {
  return validationRules(props.rules, props.disable ? false : props.required)
})

const onInputClick = () => {
  if (props.disable === true) return
  popupProxyRef.value?.show()
}

const onDateChange = (date: string) => {
  popupProxyRef.value?.hide()
  emit('update:model-value', date ? formatDate(date, { format: DATE_ISO }) : undefined)
}
</script>

<style lang="scss">
.k-date__q-input .q-field__inner .q-field__control::before {
  @apply tw-border-solid;
}
</style>
