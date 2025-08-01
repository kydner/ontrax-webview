<template>
  <k-page padding="normal" class="tw-bg-transparent">
    <div class="tw-flex tw-flex-col tw-space-y-4">
      <slot name="toolbar">
        <div class="tw-flex tw-items-center tw-space-x-4 tw-py-4">
          <k-btn icon="img:/icons/arrow-left.svg" flat rounded size="xs" padding="none" @click="handleBack" />
          <div class="tw-font-semibold">{{ props.meta?.title }}</div>
        </div>
      </slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  </k-page>
  <slot name="page:sticky"></slot>
</template>
<script setup lang="ts" generic="T">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { useRouter } from 'vue-router'
import KPage from './KPage.vue'
import { VNode } from 'vue'

interface Props<T> {
  meta: IMetaListModule<T>
}

interface Slots<T> {
  default: () => VNode
  toolbar: () => VNode
  filter: () => VNode
  footer: () => VNode
  'filter:left': () => VNode
  'page:sticky': () => VNode
  'filter:right': () => VNode
  'list:content': (props: { item: T }) => VNode
  list: (props: { items: T[] }) => VNode
}

const props = withDefaults(defineProps<Props<T>>(), {})

defineSlots<Slots<T>>()

const router = useRouter()

const handleBack = () => {
  router.push('/')
}
</script>
