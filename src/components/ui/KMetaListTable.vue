<template>
  <k-list-table
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

    <!-- Tambahan slot after untuk loading dan noMoreItems -->
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
</template>

<script setup lang="ts" generic="T, R">
import { computed, onMounted, reactive, VNode } from 'vue'
import KListTable, { KListTableSlots } from './KListTable.vue'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { MetaService } from 'src/common/services/meta.service'
import { Notify } from 'src/common/utils/plugin.utils'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { useI18n } from 'vue-i18n'
import { bus } from 'src/common/event-bus'

interface KMetaListTableProps {
  meta: IMetaListModule<T>
  payload?: R
  itemMapper?: (items: T[]) => T[]
}

interface KMetaListTableSlots extends Omit<KListTableSlots, 'list:content' | 'list'> {
  'list:content': (props: { item: T; loading: boolean }) => VNode
  list: (data: { items: T[] }) => VNode
}

const props = withDefaults(defineProps<KMetaListTableProps>(), {})

defineSlots<KMetaListTableSlots>()

const { t } = useI18n()

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

const loadMore = async <T extends any[]>(reset = false) => {
  if (reset) resetLoad()
  try {
    if (state.isLoading || !state.hasMore) return
    state.isLoading = true
    state.errorMessage = null
    const repository = await metaService.repository()
    if (repository.getPage) {
      const data = await repository.getPage({ page: state.page, size: state.size, ...props.payload })
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
    Notify.error({
      message: error as Error,
    })
  } finally {
    state.isLoading = false
  }
}

const resetLoad = () => {
  state.items = []
  state.hasMore = true
}

onMounted(() => {
  // Load awal
  loadMore()

  bus.on('scroll:bottom-reached', () => {
    loadMore()
  })
})

defineExpose({
  loadMore,
})
</script>
