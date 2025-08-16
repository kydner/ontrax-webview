<template>
  <div v-if="allowAccess" :class="`k-page bg-body-base ${props.padding}`">
    <slot name="header" />

    <div class="k-page-content">
      <slot />
    </div>

    <slot name="footer" />

    <q-inner-loading :showing="loading" color="primary" class="tw-bg-gray-50/10">
      <q-spinner-oval size="0px" color="primary" />
    </q-inner-loading>
  </div>

  <div v-else class="tw-min-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
    <div>
      <k-lottie
        animation-link="/lotties/access_denied.json"
        auto-play
        loop
        renderer="svg"
        class="tw-w-52 tw-h-5tw-w-52 tw-overflow-hidden tw-block"
      />
    </div>
    <h3 class="tw-text-2xl tw-font-semibold">Access Denied</h3>
    <p>Sorry, you are not allowed to access this page</p>
    <q-btn color="secondary" :label="t('home')" to="/" unelevated class="tw-mt-4" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import KLottie from '../ui/KLottie.vue'
import { VNode } from 'vue'

interface Props {
  padding?: 'none' | 'normal' | 'medium' | 'large'
  loading?: boolean
  allowAccess?: boolean
  class?: string | object
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

const { t } = useI18n()
</script>

<style scoped lang="scss">
.k-page {
  @apply tw-flex tw-flex-col tw-h-full tw-flex-1 tw-justify-between;

  &.none {
    @apply tw-p-0;
  }
  &.normal {
    @apply tw-p-4;
  }
  &.medium {
    @apply tw-p-6 tw-px-10;
  }
  &.large {
    @apply tw-p-8 tw-px-12;
  }
}

.k-page-content {
  @apply tw-flex-1;
}
</style>
