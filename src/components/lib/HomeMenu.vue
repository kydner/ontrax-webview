<template>
  <div class="tw-grid tw-grid-cols-12 tw-gap-4 tw-p-4">
    <div
      v-for="item in props.menu"
      :key="item.name"
      v-ripple
      class="tw-relative tw-rounded-base tw-bg-overlay tw-col-span-6 md:tw-col-span-4 tw-py-4 tw-px-1 tw-cursor-pointer"
      @click="router.push(item.to)"
    >
      <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
        <q-avatar text-color="white" size="60px" class="tw-bg-surface"></q-avatar>
        <div class="tw-text-xs tw-text-center">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Menu {
  name: string
  icon: string
  to: string
}
interface Props {
  menu: Menu[]
}

const props = withDefaults(defineProps<Props>(), {})

const router = useRouter()
</script>
