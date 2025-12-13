<template>
  <k-page padding="normal" :allow-access="allowAccess" class="bg-body-base">
    <!-- Bagian Header -->
    <div class="tw-flex tw-flex-col">
      <slot name="toolbar">
        <k-toolbar v-if="showToolbar" :header-title="`${t('create')} ${props.meta?.title}`" @back="handleBack" />
      </slot>

      <!-- Bagian Form -->
      <slot />
    </div>

    <!-- Bagian Footer -->
    <slot name="footer" />
  </k-page>
</template>

<script setup lang="ts" generic="T">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import KPage from './KPage.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { VNode } from 'vue'
import KToolbar from '../ui/KToolbar.vue'

interface Props<T> {
  meta: IMetaListModule<T>
  showToolbar?: boolean
  allowAccess?: boolean
}

interface Emits {
  (event: 'form:submit'): void
}

interface Slots {
  default: () => VNode
  toolbar: () => VNode
  filter: () => VNode
  footer: () => VNode
  'filter:left': () => VNode
  'page:sticky': () => VNode
  'filter:right': () => VNode
}

const props = withDefaults(defineProps<Props<T>>(), {
  showToolbar: true,
  allowAccess: false,
})

defineEmits<Emits>()

defineSlots<Slots>()

const router = useRouter()

const { t } = useI18n()

const handleBack = () => {
  router.push({
    name: `${props.meta.name}-list`,
  })
}

defineExpose({})
</script>
