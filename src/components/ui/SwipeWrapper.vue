<template>
  <div class="tw-overflow-hidden" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div
      class="tw-w-full tw-h-full tw-transition-transform"
      :class="{ 'tw-duration-300 tw-ease-out': isReleasing }"
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
  swipeLeft?: () => void
  swipeDown?: () => void
  swipeUp?: () => void
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 100, // minimal jarak biar dianggap swipe
})

const startX = ref(0)
const startY = ref(0)
const offsetX = ref(0)
const offsetY = ref(0)
const direction = ref<'horizontal' | 'vertical' | null>(null)
const isReleasing = ref(false)

const onTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientY
  offsetX.value = 0
  offsetY.value = 0
  direction.value = null
  isReleasing.value = false
}

const onTouchMove = (e: TouchEvent) => {
  const dx = e.touches[0].clientX - startX.value
  const dy = e.touches[0].clientY - startY.value

  // tentukan arah swipe sekali saja
  if (!direction.value) {
    direction.value = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
  }

  if (direction.value === 'horizontal') {
    offsetX.value = dx
    offsetY.value = 0
  } else {
    offsetX.value = 0
    offsetY.value = dy
  }
}

const onTouchEnd = () => {
  if (direction.value === 'horizontal') {
    if (offsetX.value > props.threshold && props.swipeRight) props.swipeRight()
    if (offsetX.value < -props.threshold && props.swipeLeft) props.swipeLeft()
  } else if (direction.value === 'vertical') {
    if (offsetY.value > props.threshold && props.swipeDown) props.swipeDown()
    if (offsetY.value < -props.threshold && props.swipeUp) props.swipeUp()
  }

  // reset posisi dengan animasi bounce
  isReleasing.value = true
  offsetX.value = 0
  offsetY.value = 0
}
</script>
