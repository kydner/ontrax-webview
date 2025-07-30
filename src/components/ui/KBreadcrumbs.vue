<template>
  <q-breadcrumbs class="k-breadcrumbs">
    <q-breadcrumbs-el
      v-for="breadcrumb in breadcrumbs"
      :key="breadcrumb.label"
      :label="breadcrumb.label"
      :to="breadcrumb.to"
      :icon="breadcrumb.icon"
    />
  </q-breadcrumbs>
</template>
<script setup lang="ts">
import { QBreadcrumbsEl } from 'quasar'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouteRecordNormalized, useRoute } from 'vue-router'
export interface IBreadcrumbsEl {
  label: string
  to: string
  icon?: string
}

const route = useRoute()

const { t } = useI18n()

const breadcrumbs = computed<IBreadcrumbsEl[]>(() => {
  const items: IBreadcrumbsEl[] = []
  const matched = route.matched
  const len = matched.length
  for (let i = 0; i < len; i++) {
    const record: RouteRecordNormalized = matched[i]
    const path = record.path === '/' ? '/' : route.path.split(record.path)[0] || record.path
    const currentT = (record.meta && (record.meta.t as string)) || (record.meta && (record.meta.title as string))
    if (currentT)
      items.push({
        to: path,
        label: t(currentT),
      })
  }
  return items
})
</script>
<style scoped lang="scss">
.k-breadcrumbs {
  @apply tw-text-gray-darker tw-font-medium;
}
</style>
