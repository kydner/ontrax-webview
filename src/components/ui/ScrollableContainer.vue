<template>
  <div ref="container" class="scrollable-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { bus } from 'src/common/event-bus'
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref<HTMLElement | null>(null)
const triggered = ref(false)

const handleScroll = () => {
  const el = container.value
  if (!el) return
  const threshold = 100
  const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold

  if (isBottom && !triggered.value) {
    triggered.value = true
    bus.emit('scroll:bottom-reached')
  }

  if (!isBottom) {
    triggered.value = false
  }
}

onMounted(() => container.value?.addEventListener('scroll', handleScroll))
onUnmounted(() => container.value?.removeEventListener('scroll', handleScroll))
</script>

<style scoped lang="scss">
.scrollable-container {
  @apply tw-flex tw-flex-col tw-h-screen tw-min-h-screen tw-overflow-y-auto;
  &:hover {
    overflow: auto;
  }

  &::-webkit-scrollbar {
    @apply tw-w-1 lg:tw-w-2;
  }

  &::-webkit-scrollbar-track {
    @apply tw-bg-base;
  }

  &::-webkit-scrollbar-thumb {
    @apply tw-rounded-full tw-bg-disable-text tw-shadow-lg;
  }
}
</style>
