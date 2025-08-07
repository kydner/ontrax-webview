<template>
  <div ref="scrollContainer" class="tw-grid tw-grid-cols-12 tw-gap-2 list-table__content">
    <!-- Error state -->
    <div v-if="error?.length" class="tw-col-span-12 tw-text-center tw-text-negative tw-py-2">
      <slot name="error" :message="error">
        {{ error }}
      </slot>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="items.length === 0 && !loading"
      class="tw-col-span-12 tw-text-center tw-text-sm tw-text-secondary-text tw-py-2"
    >
      <slot name="empty">
        {{ t('noListItem') }}
      </slot>
    </div>

    <!-- List items -->
    <slot v-else name="list" :items="items">
      <q-card
        v-for="(item, index) in items"
        :key="index"
        dark
        flat
        class="tw-bg-overlay tw-rounded-base tw-col-span-12"
      >
        <q-card-section>
          <slot name="list:content" :item="{ ...(item || {}) }" :loading="loading">
            <p class="tw-text-center">Item not set</p>
          </slot>
        </q-card-section>
      </q-card>
    </slot>

    <!-- Loader at bottom -->
    <div v-if="loading" class="tw-col-span-12 tw-text-center tw-text-sm tw-text-secondary tw-py-4">
      {{ t('loadMore') }}...
    </div>

    <div
      v-else-if="!hasMore && items.length > 0"
      class="tw-col-span-12 tw-text-center tw-text-sm tw-text-secondary tw-py-4"
    >
      {{ t('noMoreItems') }}.
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, VNode } from 'vue'
import { useI18n } from 'vue-i18n'

export interface KListTableSlots {
  list: (data: { items: unknown[] }) => VNode
  error: (data: { message: string }) => VNode
  empty: () => VNode
  'list:content': (data: { item: unknown; loading: boolean }) => VNode
}
const props = defineProps<{
  items: unknown[]
  loading: boolean
  hasMore: boolean
  error?: string | null
  onScrollBottom: () => void
}>()

defineSlots<KListTableSlots>()

const { t } = useI18n()

const scrollContainer = ref<HTMLElement | null>(null)

const handleScroll = () => {
  const el = scrollContainer.value
  if (!el || props.loading || !props.hasMore) return
  const threshold = 100
  const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold
  if (isBottom) {
    props.onScrollBottom()
  }
}

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll)
})

defineExpose({ scrollContainer }) // optional: expose for parent control
</script>

<style scoped lang="scss">
$list-table-content-height: calc(100vh - 120px);

.list-table__content {
  max-height: $list-table-content-height;
  @apply tw-overflow-y-auto;
  &:hover {
    overflow: auto;
  }

  &::-webkit-scrollbar {
    @apply tw-w-2;
  }

  &::-webkit-scrollbar-track {
    @apply tw-bg-base;
  }

  &::-webkit-scrollbar-thumb {
    @apply tw-rounded-full tw-bg-disable-text tw-shadow-lg;
  }
}
</style>
