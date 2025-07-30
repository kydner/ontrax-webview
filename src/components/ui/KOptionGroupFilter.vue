<template>
  <div v-if="loading" class="tw-grid tw-grid-cols-2 tw-gap-2">
    <q-skeleton type="rect" v-for="i in 6" :key="i" height="35px" />
  </div>
  <div v-else class="tw-flex tw-flex-col tw-space-y-2">
    <div v-if="props.type === 'checkbox'" class="tw-flex tw-flex-col">
      <slot name="header:top">
        <div class="tw-basis-full">
          <div class="tw-flex w-items-center tw-justify-between">
            <span v-if="currentTitle" class="k-meta-option__title">{{ currentTitle }}</span>
            <q-space></q-space>
            <q-checkbox v-model="isCheckedAll" :label="t('selectAll')" dense @update:model-value="onCheckedAll" />
          </div>
        </div>
      </slot>
      <slot name="header:bottom"></slot>
    </div>
    <div v-else>
      <span v-if="currentTitle" class="k-meta-option__title">{{ currentTitle }}</span>
      <slot name="header:bottom"></slot>
    </div>
    <q-option-group
      ref="optionGroupRef"
      v-if="props.options && props.options.length > 0"
      v-bind="{ ...props }"
      v-model="currentValue"
      class="k-meta-option-group-filter"
      :options="currentOptions"
    >
      <template #label="data">
        <slot name="label" v-bind="{ ...data }">
          <span>
            {{ shortString(data?.label || '', 27) }}
            <q-tooltip>{{ data?.label }}</q-tooltip>
          </span>
        </slot>
      </template>
    </q-option-group>
    <span v-else class="tw-text-gray-600 tw-text-xs">{{ t('noFilterData') }}</span>
    <div v-if="props.options && props.options?.length > MAX_OPTION" class="tw-basis-full tw-text-center">
      <k-btn label="See More" :t-label="expandTLabel" flat dense :icon-right="icon" @click="onSeeMore" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { QOptionGroup, QOptionGroupProps } from 'quasar'
import { MessageSchema } from 'src/boot/i18n'
import { shortString } from 'src/common/utils/converter.utils'
import { onMounted, computed, ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

export interface KOptionGroupFilterProps extends QOptionGroupProps {
  loading?: boolean
  label?: string
  tLabel?: keyof MessageSchema
}

export type Emits = (e: 'update:model-value', value: KOptionGroupFilterProps['modelValue']) => void

const MAX_OPTION = 6

const props = withDefaults(defineProps<KOptionGroupFilterProps>(), {
  type: 'checkbox',
  name: 'k_meta_option_group_filter',
  modelValue: () => [],
})

const { t } = useI18n()

const seeMore = ref(false)

const isCheckedAll = ref(false)

const expandTLabel = computed(() => (seeMore.value ? 'seeLess' : 'seeMore'))

const icon = computed(() => (seeMore.value ? 'expand_less' : 'expand_more'))

const emit = defineEmits<Emits>()

const optionGroupRef = ref<InstanceType<typeof QOptionGroup>>()

const currentOptions = computed(() => {
  return [...(props.options || [])] /// ?.slice(0, MAX_OPTION)
})

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const currentTitle = computed(() => {
  if (props.tLabel) return t(props.tLabel)
  return props.label
})

const setElement = () => {
  if (optionGroupRef.value) {
    const innerDivs = optionGroupRef.value?.$el?.querySelectorAll('.k-meta-option-group-filter > div')
    if (innerDivs) {
      innerDivs?.forEach((div: HTMLElement, index: number) => {
        div?.classList?.add('k-option-group__inner')
        if (index >= MAX_OPTION) div?.classList?.add('tw-hidden')
      })
    }
  }
}

const hideMoreElement = () => {
  if (!optionGroupRef.value) return

  const innerDivs = optionGroupRef.value?.$el?.querySelectorAll('.k-meta-option-group-filter > .k-option-group__inner')
  if (!innerDivs) return

  innerDivs.forEach((div: HTMLElement, index: number) => {
    const shouldHide = index >= MAX_OPTION
    if (shouldHide) {
      seeMore.value ? div.classList.remove('tw-hidden') : div.classList.add('tw-hidden')
    }
  })
}

const onSeeMore = () => {
  seeMore.value = !seeMore.value
  hideMoreElement()
}

const onCheckedAll = () => {
  emit('update:model-value', isCheckedAll.value ? props.options?.map((item) => item.value) : [])
}

watch(
  () => props.loading,
  (value) => {
    if (value === false) {
      nextTick(() => {
        setElement()
      })
    }
  },
)

watch(
  () => props.options,
  () => {
    nextTick(() => setElement())
  },
)

onMounted(() => {
  nextTick(() => setElement())
})
</script>

<style lang="scss">
.k-meta-option__title {
  @apply tw-block tw-font-semibold tw-pb-1 tw-text-gray-700;
}
.k-meta-option-group-filter {
  @apply tw-grid tw-grid-cols-2 tw-gap-y-2;
  .k-option-group__inner {
    .q-checkbox {
      .q-checkbox__inner {
        @apply tw-hidden;
      }
    }
    .q-radio,
    .q-checkbox {
      @apply tw-p-0 tw-text-center tw-text-gray-600 tw-overflow-hidden tw-w-fit;
      &:hover {
        @apply tw-bg-primary/5;
      }
      &[aria-checked='true'] {
        @apply tw-bg-white tw-text-primary tw-border tw-border-primary/80 tw-ring-2 tw-ring-primary/30 tw-bg-primary/5 tw-rounded-[3px]  tw-w-full tw-p-2;
        &:hover {
          @apply tw-bg-primary/10;
        }
      }
      &[aria-checked='false'] {
        @apply tw-border tw-border-slate-300 tw-ring-2 tw-ring-slate-800/5 tw-rounded-[3px] tw-w-full tw-p-2;
      }
      &[aria-checked='mixed'] {
        @apply tw-border tw-border-slate-300 tw-ring-2 tw-ring-slate-800/5 tw-rounded-[3px] tw-w-full tw-p-2;
      }
      .q-radio__inner {
        @apply tw-hidden;
      }
    }
  }
}
</style>
