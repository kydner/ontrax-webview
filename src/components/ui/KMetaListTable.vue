<template>
  <k-list-table :items="state.items" :loading="state.loading" :hasMore="state.hasMore" :on-scroll-bottom="loadMore">
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="data" />
    </template>
    <!-- end-prettier-ignore -->
  </k-list-table>
</template>

<script setup lang="ts" generic="T, R">
import { reactive, VNode } from 'vue'
import KListTable, { KListTableSlots } from './KListTable.vue'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { MetaService } from 'src/common/services/meta.service'
import { Notify } from 'src/common/utils/plugin.utils'
import { getErrorMessage } from 'src/common/utils/error.utils'

interface KMetaListTableProps {
  meta: IMetaListModule<T>
  payload?: R
}

interface KMetaListTableSlots extends Omit<KListTableSlots, 'list:content' | 'list'> {
  'list:content': (props: { item: T }) => VNode
  list: (data: { items: T[] }) => VNode
}

const props = withDefaults(defineProps<KMetaListTableProps>(), {})

defineSlots<KMetaListTableSlots>()

const metaService = new MetaService(props.meta)

const state = reactive({
  items: [] as T[],
  loading: false,
  hasMore: true,
  errorMessage: null as string | null,
  size: 10,
  page: 1,
  totalPages: 1,
})

const loadMore = async <T extends any[]>() => {
  try {
    if (state.loading || !state.hasMore) return
    state.loading = true
    state.errorMessage = null
    state.items = []
    const repository = await metaService.repository()
    if (repository.getPage) {
      const data = await repository.getPage({ page: state.page, size: state.size, ...props.payload })
      console.log(data)
      const content = data.content
      state.items.push(...(content as T))

      state.page++

      if (state.totalPages === state.page) {
        state.hasMore = false
      }

      state.loading = false
    }
  } catch (error) {
    const currentErrorMessage = getErrorMessage(error as Error)
    state.errorMessage = currentErrorMessage
    Notify.error({
      message: error as Error,
    })
  }
}

// Load awal
loadMore()

defineExpose({
  loadMore,
})
</script>
