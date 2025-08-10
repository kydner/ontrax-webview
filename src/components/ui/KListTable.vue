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
        class="gradient-card tw-bg-overlay tw-rounded-base tw-col-span-12"
      >
        <q-card-section>
          <slot name="list:content" :item="{ ...(item || {}) }" :loading="loading">
            <p class="tw-text-center">Item not set</p>
          </slot>
        </q-card-section>
      </q-card>
    </slot>

    <!-- Footer slot -->
    <slot name="after" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { VNode } from 'vue'

export interface KListTableProps {
  items: unknown[]
  loading: boolean
  hasMore: boolean
  error?: string | null
  listMapper?: (items: unknown[]) => unknown[]
}

export interface KListTableSlots {
  list: (data: { items: unknown[] }) => VNode
  error: (data: { message: string }) => VNode
  empty: () => VNode
  'list:content': (data: { item: unknown; loading: boolean }) => VNode
  after: () => VNode
}

defineProps<KListTableProps>()

defineSlots<KListTableSlots>()

const { t } = useI18n()

const scrollContainer = ref<HTMLElement | null>(null)
defineExpose({ scrollContainer })
</script>

<style scoped lang="scss"></style>
