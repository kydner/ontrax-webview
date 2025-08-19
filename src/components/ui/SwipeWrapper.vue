<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  swipeRight?: () => void
  swipeDown?: () => void
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 100,
})

const startX = ref(0)
const startY = ref(0)
const deltaX = ref(0)
const deltaY = ref(0)

const onTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientY
}

const onTouchMove = (e: TouchEvent) => {
  deltaX.value = e.touches[0].clientX - startX.value
  deltaY.value = e.touches[0].clientY - startY.value
}

const onTouchEnd = () => {
  if (Math.abs(deltaX.value) > Math.abs(deltaY.value)) {
    // Horizontal swipe
    if (deltaX.value > props.threshold && props.swipeRight) {
      props.swipeRight()
    }
  } else {
    // Vertical swipe
    if (deltaY.value > props.threshold && props.swipeDown) {
      props.swipeDown()
    }
  }

  startX.value = 0
  startY.value = 0
  deltaX.value = 0
  deltaY.value = 0
}
</script>
