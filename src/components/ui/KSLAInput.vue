<template>
  <k-label v-bind="{ ...props }" :for="currentFor">
    <template #additional:prefix-label>
      <slot name="additional:prefix-label" />
    </template>

    <template #additional:suffix-label>
      <slot name="additional:suffix-label" />
    </template>

    <template #default="{ tLabel }">
      <Field :name="props.name || tLabel" :label="tLabel" :rules="currentRules" :model-value="props.modelValue">
        <div
          class="tw-flex tw-items-center tw-rounded-base tw-px-4 tw-h-[40px]"
          :class="{ borderless: !props.borderless }"
        >
          <q-input
            v-model="time.days"
            dense
            borderless
            mask="##"
            type="number"
            input-class="text-right"
            :label="t('days')"
            :disable="props.disable"
            @update:model-value="onInputDays"
            @blur="onBlurDays"
          />
          <q-input
            v-model="time.hours"
            dense
            borderless
            mask="##"
            type="number"
            input-class="text-right"
            :label="t('hours')"
            :disable="props.disable"
            @update:model-value="onInputHours"
            @blur="onBlurHours"
          />
          <q-input
            v-model="time.minutes"
            dense
            borderless
            mask="##"
            type="number"
            input-class="text-right"
            :label="t('minutes')"
            :disable="props.disable"
            @update:model-value="onInputMinutes"
            @blur="onBlurMinutes"
          />
        </div>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { QInputProps, QInputSlots } from 'quasar'
import { KLabelProps, KLabelSlots } from 'src/components/ui/KLabel.vue'
import { computed, watch, ref, onMounted } from 'vue'
import { Field, RuleExpression } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { validationRules } from 'src/common/utils/validation.utils'

const MAX_MINUTES = 60
const MIN_MINUTES = 0
const MAX_HOURS = 24
const MIN_HOURS = 0
const MAX_DAYS = 360
const MIN_DAYS = 0

interface SLATime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface KInputProps extends Omit<QInputProps, 'rules' | 'modelValue'>, KLabelProps {
  modelValue: number
  labelInput?: boolean
  placeholder?: string
  rules?: RuleExpression<unknown>
  defaultValue?: KInputProps['modelValue']
}

export type KInputEmits = (e: 'update:model-value', value: KInputProps['modelValue']) => void

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
  labelWeight: 'normal',
  clearable: true,
  unmaskedValue: true,
  clearIcon: 'highlight_off',
  modelValue: 0,
})

const emit = defineEmits<KInputEmits>()

defineSlots<QInputSlots & KLabelSlots>()

const { t } = useI18n()

const time = ref<SLATime>({
  days: MIN_DAYS,
  hours: MIN_HOURS,
  minutes: MIN_MINUTES,
  seconds: 0,
})

const currentFor = computed(() => props.for || props.label)

const currentRules = computed(() => {
  return validationRules(props.rules, props.required)
})

const onInputDays = () => {
  totalMinutes()
}

const onInputHours = () => {
  totalMinutes()
}

const onInputMinutes = () => {
  totalMinutes()
}

const onBlurMinutes = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value) || 0
  if (value >= MAX_MINUTES) time.value.minutes = MAX_MINUTES
  if (value <= MIN_MINUTES) time.value.minutes = MIN_MINUTES
}

const onBlurHours = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value) || 0
  if (value >= MAX_HOURS) time.value.hours = MAX_HOURS
  if (value <= MIN_HOURS) time.value.hours = MIN_HOURS
}

const onBlurDays = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value) || 0
  if (value >= MAX_DAYS) time.value.days = MAX_DAYS
  if (value <= MIN_DAYS) time.value.days = MIN_DAYS
}

const minutesToSeconds = (time: number) => {
  return time * 60
}

const hoursToMinutes = (time: number) => {
  return time * 60
}

const daysToMinutes = (time: number) => {
  const hours = time * 24
  return hoursToMinutes(hours)
}

const totalMinutes = () => {
  const { days, hours, minutes, seconds } = time.value
  emit(
    'update:model-value',
    total(
      minutesToSeconds(daysToMinutes(days || 0)),
      minutesToSeconds(hoursToMinutes(hours || 0)),
      minutesToSeconds(minutes || 0),
      seconds || 0,
    ),
  )
}

const toTime = () => {
  const seconds = props.modelValue
  const minutes = Math.floor(seconds / 60)
  const remainingMinutes = minutes % 60
  const hours = Math.floor((minutes % 1440) / 60)
  const days = Math.floor(minutes / 1440)

  time.value.minutes = remainingMinutes
  time.value.hours = hours
  time.value.days = days
}

const total = (...args: number[]) => {
  let sum = 0
  for (const arg of args) sum += arg
  return sum
}

watch(
  () => props.modelValue,
  () => {
    toTime()
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
</script>

<style scoped lang="scss">
.borderless {
  @apply tw-border tw-border-gray-500/50;
}
</style>
