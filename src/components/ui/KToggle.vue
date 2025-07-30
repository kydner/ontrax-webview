<template>
  <k-label v-bind="{ ...props }" :for="currentFor" :class="`target-section-${props.name || snakeCase(props.tLabel)}`">
    <q-toggle v-bind="{ ...props }" v-model="currentValue" :label="undefined" class="k-toggle" />
  </k-label>
</template>
<script setup lang="ts">
import { QToggleProps } from 'quasar'
import { computed, onMounted } from 'vue'
import { RuleExpression } from 'vee-validate'
import { KLabelProps } from './KLabel.vue'
import { snakeCase } from 'lodash'

interface Props extends Omit<QToggleProps, 'rules' | 'label'>, KLabelProps {
  rules?: RuleExpression<unknown>
  defaultValue?: QToggleProps['modelValue']
}

type Emits = (event: 'update:model-value', value: Props['modelValue']) => void

const props = withDefaults(defineProps<Props>(), {
  leftLabel: false,
  showLabel: true,
  horizontalLabel: false,
  modelValue: false,
  color: 'primary',
})

const emit = defineEmits<Emits>()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value)
  },
})

const currentFor = computed(() => props.for || props.tLabel)

onMounted(() => {
  if (!props.modelValue) {
    if (props.defaultValue !== null) emit('update:model-value', props.defaultValue)
  }
})
</script>
<style lang="scss">
.k-toggle {
  @apply tw-my-2;
  .q-toggle__inner {
    @apply tw-px-0 tw-py-0;
    .q-toggle__track {
      @apply tw-h-[31.5px] tw-rounded-full tw-w-[53.175px];
    }
    .q-toggle__thumb {
      @apply tw-top-[3px] tw-w-[26px] tw-h-[26px] tw-left-0;
      &::after {
        @apply tw-shadow-base;
      }
    }
    &.q-toggle__inner--truthy .q-toggle__thumb {
      @apply tw-left-6;
    }
    &.q-toggle__inner--falsy .q-toggle__thumb {
      @apply tw-left-[2px];
    }
  }
}
</style>
