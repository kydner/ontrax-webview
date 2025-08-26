<template>
  <q-tab-panels v-model="panel" keep-alive animated class="tw-bg-transparent">
    <q-tab-panel :name="PANEL_FILTER" class="tw-p-0 tw-overflow-hidden">
      <filter-page :allow-access="allowAccessPage" @action:detail="(payload) => handleActionDetail(payload)" />
    </q-tab-panel>
    <q-tab-panel :name="PANEL_MOVEMENT" class="tw-p-0 tw-overflow-hidden">
      <movement-page @back="handleBackMovement" :payload="movementPayload" />
    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup lang="ts" generic="T">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { computed, ref, VNode } from 'vue'
import FilterPage from '../page/inventory-stock/FilterPage.vue'
import MovementPage, { MovementPayload } from 'src/components/page/inventory-stock/MovementPage.vue'
import { AccessCode } from 'src/common/enum/inventory.enum'
import { findMenuByCode } from 'src/common/utils/plugin.utils'
import { useAppStore } from 'src/stores/app.store'

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

const props = withDefaults(defineProps<Props>(), {})

const appStore = useAppStore()

const profile = computed(() => appStore.$state.profile)

const menus = computed(() => profile.value?.menus || [])

const panel = ref(PANEL_FILTER)

const movementPayload = ref<MovementPayload>({} as MovementPayload)

defineSlots<Slots<T>>()

const allowAccessPage = computed(() => {
  const accessCodeMap: Record<string, string> = {
    'inventory-stock': AccessCode.InventoryStock,
  }

  const code = accessCodeMap[props.meta.name]
  return code ? !!findMenuByCode(menus.value, code) : false
})

const handleActionDetail = (payload: MovementPayload) => {
  panel.value = PANEL_MOVEMENT
  movementPayload.value = payload
}

const handleBackMovement = () => {
  panel.value = PANEL_FILTER
}
</script>
