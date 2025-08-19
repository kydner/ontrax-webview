<template>
  <div class="tw-overflow-hidden" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div
      class="tw-w-full tw-h-full tw-transition-transform"
      :style="{ transform: `translate(${offsetX}px, ${offsetY}px)` }"
    >
      <slot />
    </div>
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
  threshold: 100, // px minimal biar swipe dianggap valid
})

const startX = ref(0)
const startY = ref(0)
const offsetX = ref(0)
const offsetY = ref(0)

const onTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientY
}

const onTouchMove = (e: TouchEvent) => {
  offsetX.value = e.touches[0].clientX - startX.value
  offsetY.value = e.touches[0].clientY - startY.value
}

const onTouchEnd = () => {
  // swipe horizontal dominan
  if (Math.abs(offsetX.value) > Math.abs(offsetY.value)) {
    if (offsetX.value > props.threshold && props.swipeRight) {
      props.swipeRight()
    }
  } else {
    if (offsetY.value > props.threshold && props.swipeDown) {
      props.swipeDown()
    }
  }

  // reset posisi (bounce back)
  offsetX.value = 0
  offsetY.value = 0
}
</script>
