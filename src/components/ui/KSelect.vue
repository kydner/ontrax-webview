<template>
  <k-label
    v-bind="{ ...props }"
    :for="currentFor"
    :label="props.label"
    :horizontal-label="props.horizontalLabel"
    :horizontal-align="props.horizontalAlign"
    :required="isRequired"
    :label-weight="props.labelWeight"
    :label-padding="props.labelPadding"
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
        <q-select
          ref="qSelectRef"
          v-bind="{
            ...props,
            name: field.name,
          }"
          :for="props.for || props.label"
          :label="undefined"
          :clearable="isRequired ? false : props.clearable"
          :use-input="props.useInput"
          :rules="undefined"
          :options="currentOptions"
          :error="props.error || !!errorMessage"
          :error-message="props.errorMessage || errorMessage"
          :placeholder="props.stackLabel ? undefined : currentPlaceholder"
          :class="`${!!errorMessage ? 'tw-animate-shake-invalid' : ''} ${!!errorMessage ? 'show-error' : ''} ${inputClass}`"
          :disable="props.loading || props.disable"
          @filter="filterFn"
          @update:model-value="onUpdateValue"
        >
          <!-- prettier-ignore -->
          <template v-for="(_, slotName) in ($slots as unknown)" #[slotName] :key="slotName">
            <slot :name="slotName" />
          </template>
          <!-- end-prettier-ignore -->

          <template #prepend>
            <q-icon name="img:/icons/chevron-down.svg" />
          </template>

          <template #before-options>
            <slot name="before-options">
              <q-item v-if="props.multiple" dark class="tw-bg-overlay">
                <q-item-section dark>
                  <q-item-label class="tw-font-medium">{{ t('selectAll') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox v-model="selectAll" @update:model-value="toggleSelectAll" dark color="secondary" dense />
                </q-item-section>
              </q-item>
              <q-separator dark></q-separator>
            </slot>
          </template>

          <template
            v-if="props.multiple"
            #option="{ itemProps, opt, selected, toggleOption, setOptionIndex, focused, label, html, index }"
          >
            <slot
              name="option"
              v-bind="{ itemProps, opt, selected, toggleOption, setOptionIndex, focused, label, html, index }"
            >
              <q-item v-bind="itemProps" dark class="tw-bg-overlay">
                <q-item-section>
                  <q-item-label>{{ opt?.[props.optionLabel] || opt }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    :model-value="selected"
                    dark
                    color="secondary"
                    dense
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </slot>
          </template>

          <template
            v-else
            #option="{ itemProps, opt, selected, toggleOption, setOptionIndex, focused, label, html, index }"
          >
            <slot
              name="option"
              v-bind="{ itemProps, opt, selected, toggleOption, setOptionIndex, focused, label, html, index }"
            >
              <q-item v-bind="itemProps" dark class="tw-bg-overlay">
                <q-item-section>
                  <q-item-label class="tw-text-white">{{ opt?.[props.optionLabel] || opt }}</q-item-label>
                </q-item-section>
              </q-item>
            </slot>
          </template>

          <template v-if="multiple" #selected-item="scope">
            <slot name="selected-item" v-bind="{ ...scope }">
              <span v-if="currentValue?.length <= 4"> {{ scope?.opt?.[props.optionLabel] }} &nbsp; </span>
              <span v-else-if="scope.index === 0"> {{ currentValue?.length }} items selected </span>
            </slot>
          </template>

          <template v-else #selected-item="scope">
            <slot name="selected-item" v-bind="{ ...scope }">
              <span>
                {{ scope?.opt?.[props.optionLabel] || scope?.opt }}
              </span>
            </slot>
          </template>

          <template #no-option="data">
            <slot name="no-option" v-bind="data">
              <q-item dark class="tw-bg-overlay">
                <q-item-section class="text-italic tw-text-white">{{ t('noOption') }} </q-item-section>
              </q-item>
            </slot>
          </template>

          <template #label>
            <slot name="additional:prefix-label"></slot>
            <span>{{ tLabel }} &nbsp;</span>
            <slot name="additional:suffix-label"></slot>
            <span v-if="required" class="tw-text-red-600">* &nbsp;</span>
          </template>
        </q-select>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { isArray, isEmpty, snakeCase } from 'lodash'
import { QSelect, QSelectProps, QSelectSlots } from 'quasar'
import { isRequiredField, validationRules } from 'src/common/utils/validation.utils'
import { KLabelProps, KLabelSlots } from 'src/components/ui/KLabel.vue'
import { Field, RuleExpression } from 'vee-validate'
import { computed, ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export interface KSelectProps extends Omit<QSelectProps, 'rules'>, KLabelProps {
  labelInput?: boolean
  optionLabel?: string
  placeholder?: string
  rules?: RuleExpression<unknown>
  defaultValue?: QSelectProps['modelValue']
  inputClass?: string
}

export interface KSelectEmits {
  (event: 'update:model-value', value: KSelectProps['modelValue']): void
  (
    event: 'filter',
    val: string,
    update: (callbackFn: () => void, afterFn?: ((ref: QSelect) => void) | undefined) => void,
    abort: () => void,
  ): void
  /**
   * event on selected item
   */
  (event: 'selected:item', value: any): void
  /**
   * event on selected on mounted data
   */
  (event: 'selected:init', value: any): void
}

export interface KSelectSlots extends KLabelSlots, Omit<QSelectSlots, 'default' | 'label'> {}

const props = withDefaults(defineProps<KSelectProps>(), {
  hideSelected: true,
  dense: true,
  showLabel: true,
  horizontalLabel: false,
  required: false,
  optionValue: 'id',
  optionLabel: 'name',
  useInput: true,
  emitValue: true,
  mapOptions: true,
  clearable: true,
  clearIcon: 'highlight_off',
  color: 'secondary',
  dark: true,
  hideDropdownIcon: true,
  borderless: false,
})

const emit = defineEmits<KSelectEmits>()

const selectAll = ref(false)

defineSlots<KSelectSlots>()

const { t } = useI18n()

const qSelectRef = ref<InstanceType<typeof QSelect>>()

const hasChange = ref(false)

// const selectAll = ref(false)

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value)
  },
})

const currentFor = computed(() => props.for || props.label)

const currentOptions = ref<KSelectProps['options']>([])

const currentPlaceholder = computed(() => {
  if (!isEmpty(props.modelValue) || props.modelValue) return ''
  if (props.placeholder) return props.placeholder
  if (props.tLabel) return `${t('select')} ${t(props.tLabel)}`
  return `${t('select')} ${props.label}`
})

const isRequired = computed(() => {
  return isRequiredField(currentRules.value)
})

const currentRules = computed(() => {
  return validationRules(props.rules, props.disable ? false : props.required)
})

const showPopup = () => {
  qSelectRef.value?.showPopup()
}

const focus = () => {
  qSelectRef.value?.focus()
}

const getOptionValue = (options: KSelectProps['options']): object | undefined => {
  const optionValues = options?.find((item: any) => item[props.optionValue as any] === currentValue.value)
  return optionValues || undefined
}

const toggleSelectAll = (value: boolean) => {
  if (value) currentValue.value = props.options?.map((item: any) => item?.[props.optionValue as any] || item)
  else currentValue.value = []
}

const filterFn = (
  val: string,
  update: (callbackFn: () => void, afterFn?: ((ref: QSelect) => void) | undefined) => void,
  abort: () => void,
): void => {
  if (val === '') {
    update(() => {
      currentOptions.value = props.options
    })
    return
  }
  update(() => {
    const needle = val?.toLowerCase()
    const options = props.options || []
    const newOptions = options.filter((item) => {
      if (typeof item === 'object' && props.optionLabel)
        return item?.[props.optionLabel]?.toLowerCase()?.indexOf(needle) > -1
      else return item?.toLowerCase()?.indexOf(needle) > -1
    })
    currentOptions.value = newOptions
  })

  emit('filter', val, update, abort)
}

const onUpdateValue = (value: any) => {
  setTimeout(() => {
    if (props.multiple) {
      emit('selected:item', value)
    } else {
      const optionValues = getOptionValue(props.options)
      emit('selected:item', optionValues)
    }
  }, 300)
}

watch(
  () => currentValue.value,
  (value) => {
    if (isArray(value) && value.length === props.options?.length) selectAll.value = true
    else selectAll.value = false
  },
  {
    immediate: true,
  },
)
watch(
  () => props.options,
  (options) => {
    if (options && options?.length > 0) {
      currentOptions.value = options
      if (!hasChange.value)
        setTimeout(() => {
          hasChange.value = true
          if (props.multiple) {
            emit('selected:init', props.modelValue)
          } else {
            emit('selected:init', getOptionValue(options))
          }
        }, 300)
    }
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  if (!props.modelValue) {
    if (props.defaultValue) emit('update:model-value', props.defaultValue)
  }
})

defineExpose({
  showPopup,
  focus,
})
</script>
