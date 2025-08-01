<template>
  <meta-list-page v-bind="{ ...props }">
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="(data as any)" />
    </template>
    <!-- end-prettier-ignore -->
  </meta-list-page>
</template>
<script setup lang="ts" generic="T">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import MetaListPage from './MetaListPage.vue'
import { VNode } from 'vue'

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

defineSlots<Slots<T>>()
</script>
