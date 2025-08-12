<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
    <k-lottie
      animation-link="/lotties/error_internal.json"
      auto-play
      loop
      renderer="svg"
      class="tw-w-52 tw-h-5tw-w-52 tw-overflow-hidden tw-block"
    />
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import KLottie from '../ui/KLottie.vue'
</script>
