<template>
  <q-tab-panels v-model="panel" keep-alive animated class="tw-bg-transparent">
    <q-tab-panel :name="PANEL_FILTER" class="tw-p-0 tw-overflow-hidden">
      <filter-page @action:detail="(payload) => handleActionDetail(payload)" />
    </q-tab-panel>
    <q-tab-panel :name="PANEL_MOVEMENT" class="tw-p-0 tw-overflow-hidden">
      <movement-page @back="panel = PANEL_FILTER" :payload="movementPayload" />
    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup lang="ts" generic="T">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { ref, VNode } from 'vue'
import FilterPage from '../page/inventory-stock/FilterPage.vue'
import MovementPage, { MovementPayload } from 'src/components/page/inventory-stock/MovementPage.vue'
const PANEL_FILTER = 'panel-filter'
const PANEL_MOVEMENT = 'panel-detail'

interface Props {
  meta: IMetaListModule<T>
}

interface Slots<T> {
  default: () => VNode
  toolbar: () => VNode
  filter: () => VNode
  'filter:left': () => VNode
  'filter:right': () => VNode
  'list:content': (props: { item: T }) => VNode
  list: (props: { items: T[] }) => VNode
}

withDefaults(defineProps<Props>(), {})

const panel = ref(PANEL_FILTER)

const movementPayload = ref<MovementPayload>({} as MovementPayload)

defineSlots<Slots<T>>()

const handleActionDetail = (payload: MovementPayload) => {
  console.log(payload)
  panel.value = PANEL_MOVEMENT
  movementPayload.value = payload
}
</script>
