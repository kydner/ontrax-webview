<template>
  <k-list-table
    v-if="!isFirstLoading"
    :items="mappedItems"
    :loading="state.isLoading"
    :error="state.errorMessage"
    :hasMore="state.hasMore"
    :on-scroll-bottom="loadMore"
  >
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="data" />
    </template>
    <!-- end-prettier-ignore -->

    <!-- Slot after untuk loadMore -->
    <template #after>
      <div v-if="state.isLoading" class="tw-col-span-12 tw-text-center tw-py-4 tw-mb-4 tw-text-secondary">
        {{ t('loadMore') }}...
      </div>
      <div
        v-else-if="!state.hasMore && mappedItems.length > 0"
        class="tw-col-span-12 tw-text-center tw-py-4 tw-mb-2 tw-text-secondary-text"
      >
        {{ t('noMoreItems') }}
      </div>
    </template>
  </k-list-table>

  <!-- Skeleton hanya saat loading pertama -->
  <div v-else-if="isFirstLoading" class="tw-p-4">
    <div
      v-for="n in state.size"
      :key="n"
      class="tw-flex tw-items-start tw-justify-between tw-cursor-pointer tw-py-3 tw-border-b tw-border-gray-200"
    >
      <div class="tw-basis-6/12">
        <div class="tw-flex tw-flex-col tw-space-y-2">
          <!-- Nomor receive -->
          <q-skeleton type="text" width="100px" height="16px" />

          <!-- Vendor + Shipping Date -->
          <div class="tw-flex tw-flex-col tw-space-y-1">
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="person" color="grey-5" />
              <q-skeleton type="text" width="80px" height="12px" />
            </div>
            <div class="tw-flex tw-items-center tw-space-x-2">
              <q-icon name="calendar_today" color="grey-5" />
              <q-skeleton type="text" width="80px" height="12px" />
            </div>
          </div>
        </div>
      </div>

      <div class="tw-basis-6/12">
        <div class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-space-y-2">
          <q-skeleton type="text" width="60px" height="14px" />
          <q-skeleton type="rect" width="90px" height="20px" class="tw-rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T, R">
import { computed, onMounted, reactive, ref, VNode } from 'vue'
import KListTable, { KListTableSlots } from './KListTable.vue'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { MetaService } from 'src/common/services/meta.service'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { useI18n } from 'vue-i18n'
import { bus } from 'src/common/event-bus'

interface KMetaListTableProps {
  meta: IMetaListModule<T>
  payload?: R
  itemMapper?: (items: T[]) => T[]
  suffixScroll?: string
}

interface Emits {
  (event: 'error', message: string): void
}

interface KMetaListTableSlots extends Omit<KListTableSlots, 'list:content' | 'list'> {
  'list:content': (props: { item: T; loading: boolean }) => VNode
  list: (data: { items: T[] }) => VNode
}

const props = withDefaults(defineProps<KMetaListTableProps>(), {})

const emit = defineEmits<Emits>()

defineSlots<KMetaListTableSlots>()

const { t } = useI18n()

const isFirstLoading = ref(true)

const metaService = new MetaService(props.meta)

const state = reactive({
  items: [] as T[],
  isLoading: false,
  hasMore: true,
  errorMessage: null as string | null,
  size: 10,
  page: 1,
  totalPages: 1,
})

const mappedItems = computed(() =>
  props.itemMapper ? props.itemMapper(state.items as unknown as T[]) : (state.items as unknown as T[]),
)

const scrollEvent = computed(() => {
  if (props.suffixScroll) return `scroll:bottom-reached-${props.suffixScroll}`
  return 'scroll:bottom-reached'
})

const loadMore = async <T extends any[]>(reset = false) => {
  if (reset) resetLoad()
  try {
    if (state.isLoading || !state.hasMore) return
    state.isLoading = true
    state.errorMessage = null
    const repository = await metaService.repository()
    if (repository.getPage) {
      const data = await repository.getPage({ ...props.payload, page: state.page })
      const content = data.content
      state.totalPages = data.totalPages
      state.items.push(...(content as T))

      state.page++

      if (state.page > state.totalPages) {
        state.hasMore = false
      }
    }
  } catch (error) {
    const currentErrorMessage = getErrorMessage(error as Error)
    state.errorMessage = currentErrorMessage
    emit('error', currentErrorMessage)
  } finally {
    state.isLoading = false
    if (isFirstLoading.value) {
      isFirstLoading.value = false
    }
  }
}

const resetLoad = () => {
  state.items = []
  state.hasMore = true
  state.page = (props.payload as { page: number })?.page || 1
}

onMounted(() => {
  // Load awal
  loadMore()

  bus.on(scrollEvent.value, () => {
    loadMore()
  })
})

defineExpose({
  loadMore,
})
</script>
