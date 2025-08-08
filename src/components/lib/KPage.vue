<template>
  <scrollable-container>
    <div v-if="allowAccess" :class="`k-page ${props.padding}`">
      <slot name="header" />

      <slot />

      <slot name="footer" />
      <q-inner-loading :showing="loading" color="primary" :class="`tw-bg-gray-50/10`">
        <q-spinner-oval size="0px" color="primary" />
      </q-inner-loading>
    </div>
    <div v-else class="tw-h-[70vh] tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-base tw-m-4">
      <div class="tw-basis-full">
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
          <q-icon name="warning" color="negative" size="4rem" />
          <h3 class="tw-text-2xl tw-font-semibold">Access Denied</h3>
          <p class="">Sorry, you are not allowed to access this page</p>
        </div>
      </div>
    </div>
  </scrollable-container>
</template>
<script setup lang="ts">
import { VNode } from 'vue'
import ScrollableContainer from '../ui/ScrollableContainer.vue'

interface Props {
  padding?: 'none' | 'normal' | 'medium' | 'large'
  loading?: boolean
  allowAccess?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'normal',
  loading: false,
  allowAccess: true,
})

export interface KPageSlots {
  header: () => VNode
  default: () => VNode
  footer: () => VNode
}

defineSlots<KPageSlots>()
</script>

<style scoped lang="scss">
.k-page {
  &.none {
    @apply tw-p-0;
  }
  &.normal {
    @apply tw-p-4;
  }
  &.medium {
    @apply tw-p-6
    tw-px-10;
  }
  &.large {
    @apply tw-p-8
    tw-px-12;
  }
}
</style>
