<template>
  <div v-if="visible" :class="`k-btn-action ${color}`">
    <q-btn v-bind="{ ...props }" padding="none" flat :icon="props.icon" size="0.75rem">
      <slot />
    </q-btn>
  </div>
</template>
<script setup lang="ts">
import { QBtnProps } from 'quasar'
import { IQTableEvent } from 'src/common/interfaces/lib.interface'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends QBtnProps {
  icon: string
  visible?: boolean | ((data: IQTableEvent) => boolean)
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  visible: true,
})
</script>
<style scoped lang="scss">
.k-btn-action {
  @apply tw-flex
  tw-items-center
  tw-justify-center
  tw-p-1
  tw-rounded-full;
  &.primary {
    @apply tw-bg-primary/10;
  }
  &.negative {
    @apply tw-bg-negative/10;
  }
  &.info {
    @apply tw-bg-info/10;
  }
  &.warning {
    @apply tw-bg-warning/10;
  }
}
</style>
