<template>
  <label :for="currentFor" class="">
    <div
      :class="`label-wrapper padding-${labelPadding} ${horizontalLabel ? 'horizontal' : ''} ${
        dark ? 'tw-text-white' : ''
      }`"
    >
      <div
        v-if="showLabel"
        :class="`basis-auto ${horizontalLabel ? 'horizontal-align' : ''} ${currentHorizontalAlign}`"
        :style="`width: ${horizontalLabel ? labelWidth : 'auto'};`"
      >
        <div :class="`title-wrapper label-size ${labelWeight} size-${labelSize}`">
          <span :class="`tw-text-[0.85rem] ${dark ? 'tw-text-white' : ''}`">
            <slot name="additional:prefix-label" />
            {{ currentLabel }}
            <slot name="additional:suffix-label" />
            <span v-if="required" class="tw-text-red-600"><sup>* </sup>&nbsp;</span>
          </span>
        </div>
      </div>
      <div class="tw-flex-1 tw-min-w-16">
        <!-- prettier-ignore -->
        <slot :required="required" :t-label="(currentLabel as KLabelProps['tLabel'])" :screen="screen" />
        <!-- end-prettier-ignore -->
      </div>
    </div>
  </label>
</template>
<script setup lang="ts">
import { MessageSchema } from 'src/boot/i18n'
import { VNode, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { QVueGlobals, useQuasar } from 'quasar'

export type KLabelHorizontalAlign = 'base' | 'center'
export type KLabelWeight = 'normal' | 'semibold' | 'medium' | 'bold'
export type KPadding = 'none' | 'small' | 'medium' | 'normal' | 'large'
export type KLabelSize = 'small' | 'normal' | 'large'

interface Slots {
  tLabel: KLabelProps['tLabel']
  required: KLabelProps['required']
  screen?: QVueGlobals['screen']
}

export interface KLabelSlots {
  'additional:suffix-label': () => VNode
  'additional:prefix-label': () => VNode
  default: (data: Slots) => VNode
}

export type KeyPaths<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends Record<string, any>
    ? `${Prefix}${K}` | KeyPaths<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`
}[keyof T & string]

export interface KLabelProps {
  /** Translate label
   * It will be auto translate if value available on i18n translate json
   */
  tLabel: KeyPaths<MessageSchema>
  /** Custom Label
   * it will be replace translate label if fill this props
   */
  cLabel?: string
  showLabel?: boolean
  forceShowLabel?: boolean
  horizontalLabel?: boolean
  horizontalAlign?: KLabelHorizontalAlign
  labelWeight?: KLabelWeight
  labelSize?: KLabelSize
  required?: boolean
  labelPadding?: KPadding
  for?: string
  /** Fill with string number and dimension. ex 20px or 5rem, etc */
  labelWidth?: string
  dark?: boolean | null | undefined
}

const props = withDefaults(defineProps<KLabelProps>(), {
  showLabel: true,
  horizontal: false,
  horizontalAlign: 'center',
  labelPadding: 'none',
  labelWeight: 'medium',
  labelSize: 'normal',
  required: false,
  forceShowLabel: false,
  labelWidth: '250px',
  dark: true,
})

defineSlots<KLabelSlots>()

const $q = useQuasar()

const { t } = useI18n()

const currentFor = computed(() => {
  if (props.for) return props.for
  return props.tLabel
})

const screen = computed(() => $q.screen)

const currentLabel = computed(() => {
  if (props.cLabel) return props.cLabel
  if (!props.tLabel) return props.tLabel
  return t(props.tLabel)
})

const currentHorizontalAlign = computed<KLabelHorizontalAlign>(() => {
  if (props.horizontalLabel === false) return 'base'
  return props.horizontalAlign
})
</script>
<style scoped lang="scss">
.label-wrapper.padding-none {
  @apply tw-p-0;
}
.label-wrapper.padding-small {
  @apply tw-p-1;
}
.label-wrapper.padding-medium {
  @apply tw-p-2;
}
.label-wrapper.padding-normal {
  @apply tw-p-4;
}
.label-wrapper.padding-large {
  @apply tw-p-8;
}
.label-size.size-normal {
  @apply tw-text-base;
}
.label-size.size-small {
  @apply tw-text-sm;
}
.label-size.size-large {
  @apply tw-text-lg;
}
.horizontal {
  @apply tw-flex tw-flex-col md:tw-flex-row md:tw-items-start;
}
.horizontal-align {
  @apply tw-w-auto md:tw-w-[200px];
}
.horizontal-align.base {
  @apply tw-mt-0;
}
.horizontal-align.center {
  @apply tw-mt-[0.65rem];
}
.title-wrapper {
  @apply tw-flex tw-space-x-1;
}
.title-wrapper.normal {
  @apply tw-font-normal;
}
.title-wrapper.medium {
  @apply tw-font-medium;
}
.title-wrapper.semibold {
  @apply tw-font-semibold;
}
.title-wrapper.bold {
  @apply tw-font-bold;
}
</style>
