<template>
  <k-page padding="normal" class="tw-h-screen bg-body-base" :class="props.class" :allow-access="allowAccess">
    <div class="tw-flex tw-flex-col tw-space-y-4">
      <slot name="toolbar">
        <k-toolbar :header-title="props.meta?.title" @back="handleBack" />
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
import KToolbar from '../ui/KToolbar.vue'
import { Loading } from 'quasar'
import { nextTick } from 'vue'
interface Props<T> {
  meta: IMetaListModule<T>
  class?: string
  allowAccess?: boolean
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

const props = withDefaults(defineProps<Props<T>>(), {
  allowAccess: false,
})

defineSlots<Slots<T>>()

const router = useRouter()

const handleBack = async () => {
  try {
    Loading.show()
    router.push('/')
  } finally {
    await nextTick()
    Loading.hide()
  }
}
</script>
