<template>
  <div class="error-screen tw-text-primary tw-text-center tw-p-4 tw-flex tw-items-center tw-justify-center">
    <div>
      <k-lottie animation-link="/lotties/error_404.json" auto-play loop renderer="svg" />

      <q-btn class="q-mt-xl" color="secondary" text-color="white" unelevated to="/" label="Go Home" no-caps />
    </div>
  </div>
</template>

<script setup lang="ts">
import KLottie from 'src/components/ui/KLottie.vue'
</script>

<style scoped lang="scss">
.error-screen {
  height: calc(90vh - $toolbar-min-height);
}
</style>
